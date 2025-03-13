import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import MemberDetailsCard from "./MemberDetailsCard";
import {
  Search,
  ZoomIn,
  ZoomOut,
  Filter,
  MoreHorizontal,
  UserPlus,
  Mail,
  Phone,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  rank: string;
  teamSize: number;
  avatar?: string;
  isActive: boolean;
  children?: Member[];
  level: number;
  position: "left" | "right" | "root";
}

interface BinaryTreeVisualizationProps {
  rootMember?: Member;
  onMemberClick?: (member: Member) => void;
  onAddMember?: (parentId: string, position: "left" | "right") => void;
  onContactMember?: (memberId: string) => void;
  onViewDownline?: (memberId: string) => void;
}

const BinaryTreeVisualization: React.FC<BinaryTreeVisualizationProps> = ({
  rootMember = {
    id: "root",
    name: "You",
    email: "you@example.com",
    phone: "(555) 123-4567",
    joinDate: "2022-01-01",
    rank: "Diamond Partner",
    teamSize: 42,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=you",
    isActive: true,
    level: 0,
    position: "root",
    children: [
      {
        id: "left1",
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "(555) 234-5678",
        joinDate: "2022-03-15",
        rank: "Gold Partner",
        teamSize: 18,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
        isActive: true,
        level: 1,
        position: "left",
        children: [
          {
            id: "left1-left",
            name: "Alice Smith",
            email: "alice@example.com",
            phone: "(555) 345-6789",
            joinDate: "2022-05-20",
            rank: "Silver Partner",
            teamSize: 7,
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice",
            isActive: true,
            level: 2,
            position: "left",
            children: [],
          },
          {
            id: "left1-right",
            name: "Bob Johnson",
            email: "bob@example.com",
            phone: "(555) 456-7890",
            joinDate: "2022-06-10",
            rank: "Bronze Partner",
            teamSize: 3,
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob",
            isActive: false,
            level: 2,
            position: "right",
            children: [],
          },
        ],
      },
      {
        id: "right1",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "(555) 567-8901",
        joinDate: "2022-04-05",
        rank: "Platinum Partner",
        teamSize: 24,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
        isActive: true,
        level: 1,
        position: "right",
        children: [
          {
            id: "right1-left",
            name: "Carol Williams",
            email: "carol@example.com",
            phone: "(555) 678-9012",
            joinDate: "2022-07-15",
            rank: "Silver Partner",
            teamSize: 9,
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=carol",
            isActive: true,
            level: 2,
            position: "left",
            children: [],
          },
          {
            id: "right1-right",
            name: "David Brown",
            email: "david@example.com",
            phone: "(555) 789-0123",
            joinDate: "2022-08-01",
            rank: "Gold Partner",
            teamSize: 15,
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
            isActive: true,
            level: 2,
            position: "right",
            children: [],
          },
        ],
      },
    ],
  },
  onMemberClick = () => {},
  onAddMember = () => {},
  onContactMember = () => {},
  onViewDownline = () => {},
}) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [showInactive, setShowInactive] = useState(true);
  const [maxLevel, setMaxLevel] = useState(3);
  const [searchTerm, setSearchTerm] = useState("");
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    member: Member;
  } | null>(null);
  const treeContainerRef = useRef<HTMLDivElement>(null);

  // Handle member click
  const handleMemberClick = (member: Member) => {
    setSelectedMember(member);
    onMemberClick(member);
  };

  // Handle context menu
  const handleContextMenu = (e: React.MouseEvent, member: Member) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      member,
    });
  };

  // Close context menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setContextMenu(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Reset pan when zoom changes
  useEffect(() => {
    setPan({ x: 0, y: 0 });
  }, [zoom]);

  // Render a single node in the tree
  const renderTreeNode = (member: Member) => {
    // Skip rendering if inactive and filter is on
    if (!showInactive && !member.isActive) return null;

    // Skip rendering if beyond max level
    if (member.level > maxLevel) return null;

    // Skip rendering if doesn't match search
    if (
      searchTerm &&
      !member.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return null;

    return (
      <div key={member.id} className="flex flex-col items-center">
        <div
          className={`relative ${member.isActive ? "opacity-100" : "opacity-60"}`}
          onClick={() => handleMemberClick(member)}
          onContextMenu={(e) => handleContextMenu(e, member)}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-pointer">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`flex flex-col items-center justify-center w-24 h-24 rounded-full border-4 ${member.isActive ? "border-green-500 bg-white" : "border-gray-300 bg-gray-100"} shadow-md overflow-hidden`}
                  >
                    <div className="w-full h-full overflow-hidden rounded-full">
                      <img
                        src={
                          member.avatar ||
                          `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.id}`
                        }
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                  <div className="mt-2 text-center">
                    <div className="font-semibold text-sm truncate max-w-[120px]">
                      {member.name}
                    </div>
                    <div className="text-xs text-gray-500">{member.rank}</div>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="p-2">
                  <div className="font-bold">{member.name}</div>
                  <div className="text-sm">{member.rank}</div>
                  <div className="text-xs mt-1">
                    Team Size: {member.teamSize}
                  </div>
                  <div className="text-xs flex items-center gap-1 mt-1">
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${member.isActive ? "bg-green-500" : "bg-gray-400"}`}
                    ></span>
                    <span>{member.isActive ? "Active" : "Inactive"}</span>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {member.children && member.children.length > 0 && (
          <div className="mt-8 relative">
            <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 w-0.5 h-5 bg-gray-300"></div>
            <div className="flex gap-16 relative">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gray-300"></div>
              {member.children.map((child, index) => (
                <div key={child.id} className="relative">
                  <div
                    className={`absolute top-[-5px] ${index === 0 ? "left-1/2" : "right-1/2"} transform ${index === 0 ? "-translate-x-1/2" : "translate-x-1/2"} w-0.5 h-5 bg-gray-300`}
                  ></div>
                  {renderTreeNode(child)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="w-full h-full bg-white border border-gray-200 overflow-hidden">
      <CardContent className="p-4 h-full flex flex-col">
        {/* Controls */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
              disabled={zoom <= 0.5}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>

            <Slider
              value={[zoom * 100]}
              min={50}
              max={150}
              step={10}
              onValueChange={(value) => setZoom(value[0] / 100)}
              className="w-32"
            />

            <Button
              variant="outline"
              size="icon"
              onClick={() => setZoom(Math.min(1.5, zoom + 0.1))}
              disabled={zoom >= 1.5}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 h-9 w-48"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="p-2">
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="show-inactive" className="cursor-pointer">
                      Show Inactive Members
                    </Label>
                    <Switch
                      id="show-inactive"
                      checked={showInactive}
                      onCheckedChange={setShowInactive}
                    />
                  </div>

                  <div className="mt-4">
                    <Label className="mb-2 block">Max Level Depth</Label>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setMaxLevel(Math.max(1, maxLevel - 1))}
                        disabled={maxLevel <= 1}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                      <div className="flex-1 text-center font-medium">
                        {maxLevel}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setMaxLevel(maxLevel + 1)}
                      >
                        <ChevronUp className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Tree Visualization */}
        <div className="flex-1 overflow-auto relative border border-gray-100 rounded-md bg-gray-50">
          <div
            ref={treeContainerRef}
            className="min-h-full flex items-center justify-center p-8"
          >
            <motion.div
              style={{
                scale: zoom,
                x: pan.x,
                y: pan.y,
              }}
              drag
              dragConstraints={treeContainerRef}
              dragElastic={0.1}
              onDragEnd={(_, info) => {
                setPan({
                  x: pan.x + info.offset.x,
                  y: pan.y + info.offset.y,
                });
              }}
              className="origin-center cursor-grab active:cursor-grabbing"
            >
              {renderTreeNode(rootMember)}
            </motion.div>
          </div>

          {/* Navigation Controls */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPan({ ...pan, y: pan.y + 50 })}
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setPan({ ...pan, x: pan.x + 50 })}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setPan({ ...pan, x: pan.x - 50 })}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPan({ ...pan, y: pan.y - 50 })}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Context Menu */}
        {contextMenu && (
          <div
            className="fixed bg-white shadow-lg rounded-md border border-gray-200 z-50 overflow-hidden"
            style={{ top: contextMenu.y, left: contextMenu.x }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-2 bg-gray-50 border-b border-gray-200 font-medium text-sm">
              {contextMenu.member.name}
            </div>
            <div className="p-1">
              <button
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded flex items-center gap-2"
                onClick={() => {
                  setSelectedMember(contextMenu.member);
                  setContextMenu(null);
                }}
              >
                <ChevronRight className="h-4 w-4" />
                View Details
              </button>

              {contextMenu.member.children &&
                contextMenu.member.children.length < 2 && (
                  <button
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded flex items-center gap-2"
                    onClick={() => {
                      const position =
                        contextMenu.member.children?.length === 0
                          ? "left"
                          : "right";
                      onAddMember(
                        contextMenu.member.id,
                        position as "left" | "right",
                      );
                      setContextMenu(null);
                    }}
                  >
                    <UserPlus className="h-4 w-4" />
                    Add Member
                  </button>
                )}

              <button
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded flex items-center gap-2"
                onClick={() => {
                  onContactMember(contextMenu.member.id);
                  setContextMenu(null);
                }}
              >
                <Mail className="h-4 w-4" />
                Contact
              </button>
            </div>
          </div>
        )}
      </CardContent>

      {/* Member Details Dialog */}
      <Dialog
        open={!!selectedMember}
        onOpenChange={(open) => !open && setSelectedMember(null)}
      >
        <DialogContent className="p-0 overflow-hidden max-w-md">
          {selectedMember && (
            <MemberDetailsCard
              member={selectedMember}
              onClose={() => setSelectedMember(null)}
              onViewDownline={(id) => {
                onViewDownline(id);
                setSelectedMember(null);
              }}
              onContact={(id) => {
                onContactMember(id);
                setSelectedMember(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default BinaryTreeVisualization;
