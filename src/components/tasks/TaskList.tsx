import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Search,
  Filter,
  Calendar,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import TaskForm from "./TaskForm";

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: "pending" | "in-progress" | "completed" | "blocked";
  priority: "low" | "medium" | "high";
  assignedTo?: string;
  kycRequired: boolean;
  kycStatus?: "not-started" | "in-progress" | "verified" | "rejected";
  completionPercentage: number;
}

interface TaskListProps {
  isLoggedIn?: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ isLoggedIn = true }) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "task-1",
      title: "Complete KYC Verification",
      description: "Submit identity documents for verification",
      dueDate: "2023-07-15",
      status: "pending",
      priority: "high",
      assignedTo: "John Doe",
      kycRequired: true,
      kycStatus: "not-started",
      completionPercentage: 0,
    },
    {
      id: "task-2",
      title: "Review Team Structure",
      description: "Analyze current team structure and suggest improvements",
      dueDate: "2023-07-20",
      status: "in-progress",
      priority: "medium",
      assignedTo: "John Doe",
      kycRequired: false,
      completionPercentage: 45,
    },
    {
      id: "task-3",
      title: "Prepare Monthly Report",
      description: "Compile team performance metrics for the monthly report",
      dueDate: "2023-07-25",
      status: "in-progress",
      priority: "medium",
      assignedTo: "John Doe",
      kycRequired: false,
      completionPercentage: 30,
    },
    {
      id: "task-4",
      title: "Update Bank Information",
      description: "Update banking details for commission payments",
      dueDate: "2023-07-10",
      status: "blocked",
      priority: "high",
      assignedTo: "John Doe",
      kycRequired: true,
      kycStatus: "rejected",
      completionPercentage: 50,
    },
    {
      id: "task-5",
      title: "Complete Compliance Training",
      description: "Finish the required compliance training modules",
      dueDate: "2023-07-30",
      status: "completed",
      priority: "low",
      assignedTo: "John Doe",
      kycRequired: false,
      completionPercentage: 100,
    },
  ]);

  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleAddTask = (task: Task) => {
    setTasks([...tasks, task]);
    setIsTaskFormOpen(false);
  };

  const handleEditTask = (task: Task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    setSelectedTask(null);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const filteredTasks = tasks.filter((task) => {
    // Filter by search term
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Filter by tab
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "pending" && task.status === "pending") ||
      (activeTab === "in-progress" && task.status === "in-progress") ||
      (activeTab === "completed" && task.status === "completed") ||
      (activeTab === "kyc-required" && task.kycRequired);

    return matchesSearch && matchesTab;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "blocked":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getKycStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Verified
          </Badge>
        );
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            In Review
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700">
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
            Not Started
          </Badge>
        );
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700">
            High
          </Badge>
        );
      case "medium":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
            Medium
          </Badge>
        );
      case "low":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Low
          </Badge>
        );
      default:
        return null;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-[500px] bg-gray-50 p-8 rounded-lg">
        <AlertCircle className="h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Login Required</h2>
        <p className="text-gray-500 mb-6 text-center max-w-md">
          Please log in to access your tasks and manage your KYC verification.
        </p>
        <Button size="lg">Log In</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Task Management</h1>
          <p className="text-gray-500 mt-1">
            Manage your tasks and KYC verification requirements
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button
            className="flex items-center gap-2"
            onClick={() => {
              setSelectedTask(null);
              setIsTaskFormOpen(true);
            }}
          >
            <Plus className="h-4 w-4" />
            Add New Task
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search tasks..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 w-full max-w-3xl mb-8">
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="kyc-required">KYC Required</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <Card key={task.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="border-l-4 border-l-transparent hover:border-l-primary transition-colors">
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            {getStatusIcon(task.status)}
                          </div>
                          <div>
                            <h3 className="font-medium text-lg">
                              {task.title}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              {task.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {getPriorityBadge(task.priority)}
                              {task.kycRequired && (
                                <Badge
                                  variant="outline"
                                  className="bg-purple-50 text-purple-700"
                                >
                                  KYC Required
                                </Badge>
                              )}
                              {task.kycRequired &&
                                task.kycStatus &&
                                getKycStatusBadge(task.kycStatus)}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </div>
                          <div className="w-full max-w-[200px]">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Progress</span>
                              <span>{task.completionPercentage}%</span>
                            </div>
                            <Progress value={task.completionPercentage} />
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedTask(task);
                                  setIsTaskFormOpen(true);
                                }}
                              >
                                Edit Task
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDeleteTask(task.id)}
                                className="text-red-600"
                              >
                                Delete Task
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <div className="mx-auto w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No tasks found</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                {searchTerm
                  ? `No tasks matching "${searchTerm}"`
                  : "No tasks in this category"}
              </p>
              <Button
                onClick={() => {
                  setSelectedTask(null);
                  setIsTaskFormOpen(true);
                }}
              >
                Create New Task
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={isTaskFormOpen} onOpenChange={setIsTaskFormOpen}>
        <DialogContent className="sm:max-w-lg">
          <TaskForm
            task={selectedTask}
            onSubmit={selectedTask ? handleEditTask : handleAddTask}
            onCancel={() => {
              setIsTaskFormOpen(false);
              setSelectedTask(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskList;
