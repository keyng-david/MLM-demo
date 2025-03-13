import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Mail,
  Phone,
  Users,
  Calendar,
  Award,
  ChevronRight,
} from "lucide-react";

interface MemberDetailsCardProps {
  member?: {
    id: string;
    name: string;
    email: string;
    phone: string;
    joinDate: string;
    rank: string;
    teamSize: number;
    avatar?: string;
    isActive: boolean;
  };
  onClose?: () => void;
  onViewDownline?: (memberId: string) => void;
  onContact?: (memberId: string) => void;
}

const MemberDetailsCard: React.FC<MemberDetailsCardProps> = ({
  member = {
    id: "123456",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "(555) 123-4567",
    joinDate: "2023-01-15",
    rank: "Gold Partner",
    teamSize: 24,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    isActive: true,
  },
  onClose = () => {},
  onViewDownline = () => {},
  onContact = () => {},
}) => {
  // Format join date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="w-full max-w-md bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white pb-12 relative">
        <div className="absolute right-4 top-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/20"
          >
            <span className="sr-only">Close</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-x"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </Button>
        </div>
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 border-4 border-white shadow-md">
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback>
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="mt-4 text-2xl font-bold text-center">
            {member.name}
          </CardTitle>
          <CardDescription className="text-blue-100 flex items-center gap-1">
            <span
              className={`inline-block w-2 h-2 rounded-full ${member.isActive ? "bg-green-400" : "bg-gray-400"}`}
            ></span>
            <span>{member.isActive ? "Active" : "Inactive"}</span>
          </CardDescription>
          <div className="mt-2 px-3 py-1 bg-blue-700 bg-opacity-30 rounded-full text-sm font-medium">
            {member.rank}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-gray-500" />
            <span className="text-sm">{member.email}</span>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-gray-500" />
            <span className="text-sm">{member.phone}</span>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-gray-500" />
            <span className="text-sm">
              Joined {formatDate(member.joinDate)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-gray-500" />
            <span className="text-sm">
              Team Size: {member.teamSize} members
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Award className="h-5 w-5 text-gray-500" />
            <span className="text-sm">Rank: {member.rank}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 border-t border-gray-100 pt-4">
        <Button
          className="w-full justify-between"
          onClick={() => onViewDownline(member.id)}
        >
          View Downline
          <ChevronRight className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          className="w-full justify-between"
          onClick={() => onContact(member.id)}
        >
          Contact Member
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MemberDetailsCard;
