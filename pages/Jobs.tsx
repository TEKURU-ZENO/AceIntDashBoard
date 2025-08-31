import { useState } from "react";
import { DashboardHeader } from "../components/DashboardHeader";
import { DashboardSidebar } from "../components/DashboardSidebar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { 
  Search, 
  Plus, 
  Filter, 
  MoreVertical,
  MapPin,
  Calendar,
  Users,
  Eye,
  Edit,
  Archive,
  Share2,
  Clock,
  DollarSign
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    status: "Active",
    applicants: 42,
    posted: "2024-01-15",
    salary: "$120k - $150k",
    urgency: "High"
  },
  {
    id: 2,
    title: "Product Manager",
    department: "Product",
    location: "Remote",
    type: "Full-time",
    status: "Active",
    applicants: 28,
    posted: "2024-01-10",
    salary: "$100k - $130k",
    urgency: "Medium"
  },
  {
    id: 3,
    title: "UX Designer",
    department: "Design",
    location: "New York, NY",
    type: "Full-time",
    status: "Draft",
    applicants: 0,
    posted: "2024-01-20",
    salary: "$80k - $100k",
    urgency: "Low"
  },
  {
    id: 4,
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Austin, TX",
    type: "Full-time",
    status: "Paused",
    applicants: 15,
    posted: "2024-01-08",
    salary: "$110k - $140k",
    urgency: "High"
  },
  {
    id: 5,
    title: "Marketing Specialist",
    department: "Marketing",
    location: "Chicago, IL",
    type: "Contract",
    status: "Active",
    applicants: 33,
    posted: "2024-01-12",
    salary: "$60k - $80k",
    urgency: "Medium"
  }
];

const statusColors = {
  Active: "bg-neon-green/10 text-neon-green border-neon-green/20",
  Draft: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Paused: "bg-orange-100 text-orange-800 border-orange-200",
  Closed: "bg-gray-100 text-gray-800 border-gray-200"
};

const urgencyColors = {
  High: "bg-danger-red/10 text-danger-red",
  Medium: "bg-yellow-100 text-yellow-800",
  Low: "bg-green-100 text-green-800"
};

export default function Jobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === "all" || job.department === filterDepartment;
    const matchesStatus = filterStatus === "all" || job.status === filterStatus;
    const matchesTab = activeTab === "all" || 
                      (activeTab === "active" && job.status === "Active") ||
                      (activeTab === "draft" && job.status === "Draft") ||
                      (activeTab === "closed" && job.status === "Closed");
    
    return matchesSearch && matchesDepartment && matchesStatus && matchesTab;
  });

  const getStatusBadgeClass = (status: string) => {
    return statusColors[status as keyof typeof statusColors] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getUrgencyBadgeClass = (urgency: string) => {
    return urgencyColors[urgency as keyof typeof urgencyColors] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <div className="flex">
        <DashboardSidebar />
        
        <main className="flex-1 p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Job Management</h1>
              <p className="text-muted-foreground">Create, manage, and track your job postings</p>
            </div>
            <Button className="bg-electric-blue hover:bg-electric-blue/90 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Post New Job
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-neon-green/10 rounded-lg">
                    <Eye className="h-5 w-5 text-neon-green" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-muted-foreground">Active Jobs</p>
                    <p className="text-2xl font-bold">3</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-ai-purple/10 rounded-lg">
                    <Users className="h-5 w-5 text-ai-purple" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-muted-foreground">Total Applications</p>
                    <p className="text-2xl font-bold">118</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-electric-blue/10 rounded-lg">
                    <Clock className="h-5 w-5 text-electric-blue" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-muted-foreground">Draft Jobs</p>
                    <p className="text-2xl font-bold">1</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-danger-red/10 rounded-lg">
                    <DollarSign className="h-5 w-5 text-danger-red" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-muted-foreground">Avg. Salary</p>
                    <p className="text-2xl font-bold">$105k</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Product">Product</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Paused">Paused</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>

          {/* Jobs Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Jobs ({mockJobs.length})</TabsTrigger>
              <TabsTrigger value="active">Active ({mockJobs.filter(j => j.status === 'Active').length})</TabsTrigger>
              <TabsTrigger value="draft">Drafts ({mockJobs.filter(j => j.status === 'Draft').length})</TabsTrigger>
              <TabsTrigger value="closed">Closed (0)</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-6">
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <Card key={job.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
                            <Badge className={getStatusBadgeClass(job.status)}>
                              {job.status}
                            </Badge>
                            <Badge className={getUrgencyBadgeClass(job.urgency)}>
                              {job.urgency} Priority
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {job.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Posted {formatDate(job.posted)}
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              {job.salary}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-6">
                            <div className="text-sm">
                              <span className="font-medium text-foreground">{job.applicants}</span>
                              <span className="text-muted-foreground"> applicants</span>
                            </div>
                            <div className="text-sm">
                              <span className="font-medium text-foreground">{job.department}</span>
                              <span className="text-muted-foreground"> • {job.type}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 ml-4">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Job
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Users className="h-4 w-4 mr-2" />
                                View Applicants
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Archive className="h-4 w-4 mr-2" />
                                Archive Job
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {filteredJobs.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-muted-foreground mb-4">
                      <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <h3 className="text-lg font-medium">No jobs found</h3>
                      <p>Try adjusting your search criteria or create a new job posting.</p>
                    </div>
                    <Button className="bg-electric-blue hover:bg-electric-blue/90 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Post Your First Job
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
