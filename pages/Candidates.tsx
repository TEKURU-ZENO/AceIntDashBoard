import { useState } from "react";
import { DashboardHeader } from "../components/DashboardHeader";
import { DashboardSidebar } from "../components/DashboardSidebar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { 
  Search, 
  Filter, 
  MapPin,
  Calendar,
  Mail,
  Phone,
  LinkedinIcon,
  FileText,
  Brain,
  User,
  Briefcase,
  GraduationCap,
  ChevronRight
} from "lucide-react";

const mockCandidates = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    position: "Senior Frontend Developer",
    location: "San Francisco, CA",
    experience: "5+ years",
    education: "BS Computer Science, Stanford",
    appliedDate: "2024-01-20",
    status: "Interview Scheduled",
    aiScore: 92,
    skills: ["React", "TypeScript", "Node.js", "AWS"],
    avatar: "/api/placeholder/40/40",
    resumeUrl: "/resumes/sarah-johnson.pdf",
    linkedinUrl: "https://linkedin.com/in/sarahjohnson",
    stage: "interview",
    notes: "Strong technical background, excellent communication skills."
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@email.com", 
    phone: "+1 (555) 234-5678",
    position: "Product Manager",
    location: "New York, NY",
    experience: "7+ years",
    education: "MBA, Harvard Business School",
    appliedDate: "2024-01-18",
    status: "AI Screening",
    aiScore: 88,
    skills: ["Product Strategy", "Agile", "Analytics", "Leadership"],
    avatar: "/api/placeholder/40/40",
    resumeUrl: "/resumes/michael-chen.pdf",
    linkedinUrl: "https://linkedin.com/in/michaelchen",
    stage: "screening",
    notes: "Previous experience at top-tier companies, strong PM background."
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    phone: "+1 (555) 345-6789",
    position: "UX Designer",
    location: "Austin, TX",
    experience: "4+ years",
    education: "MFA Design, RISD",
    appliedDate: "2024-01-22",
    status: "Application Review",
    aiScore: 85,
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    avatar: "/api/placeholder/40/40", 
    resumeUrl: "/resumes/emily-rodriguez.pdf",
    linkedinUrl: "https://linkedin.com/in/emilyrodriguez",
    stage: "review",
    notes: "Impressive portfolio, strong design thinking approach."
  },
  {
    id: 4,
    name: "David Kim",
    email: "david.kim@email.com",
    phone: "+1 (555) 456-7890",
    position: "DevOps Engineer",
    location: "Seattle, WA",
    experience: "6+ years",
    education: "BS Computer Engineering, MIT",
    appliedDate: "2024-01-19",
    status: "Technical Assessment",
    aiScore: 90,
    skills: ["Docker", "Kubernetes", "AWS", "Terraform"],
    avatar: "/api/placeholder/40/40",
    resumeUrl: "/resumes/david-kim.pdf",
    linkedinUrl: "https://linkedin.com/in/davidkim",
    stage: "assessment",
    notes: "Strong DevOps background, experience with cloud infrastructure."
  },
  {
    id: 5,
    name: "Jessica Taylor",
    email: "jessica.taylor@email.com",
    phone: "+1 (555) 567-8901",
    position: "Marketing Specialist",
    location: "Chicago, IL",
    experience: "3+ years",
    education: "BA Marketing, Northwestern",
    appliedDate: "2024-01-21",
    status: "Rejected",
    aiScore: 65,
    skills: ["Digital Marketing", "Content Strategy", "SEO", "Analytics"],
    avatar: "/api/placeholder/40/40",
    resumeUrl: "/resumes/jessica-taylor.pdf",
    linkedinUrl: "https://linkedin.com/in/jessicataylor",
    stage: "rejected",
    notes: "Good background but not a strong fit for senior role requirements."
  }
];

const stageColors = {
  review: "bg-yellow-100 text-yellow-800 border-yellow-200",
  screening: "bg-ai-purple/10 text-ai-purple border-ai-purple/20",
  assessment: "bg-electric-blue/10 text-electric-blue border-electric-blue/20",
  interview: "bg-neon-green/10 text-neon-green border-neon-green/20",
  offer: "bg-green-100 text-green-800 border-green-200",
  rejected: "bg-red-100 text-red-800 border-red-200"
};

const getAIScoreColor = (score: number) => {
  if (score >= 90) return "text-neon-green";
  if (score >= 80) return "text-electric-blue"; 
  if (score >= 70) return "text-ai-purple";
  return "text-orange-500";
};

const getAIScoreLabel = (score: number) => {
  if (score >= 90) return "Excellent Match";
  if (score >= 80) return "Good Match";
  if (score >= 70) return "Fair Match";
  return "Poor Match";
};

export default function Candidates() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [filterPosition, setFilterPosition] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredCandidates = mockCandidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = filterPosition === "all" || candidate.position === filterPosition;
    const matchesStatus = filterStatus === "all" || candidate.status === filterStatus;
    const matchesTab = activeTab === "all" || 
                      (activeTab === "screening" && candidate.stage === "screening") ||
                      (activeTab === "interview" && candidate.stage === "interview") ||
                      (activeTab === "assessment" && candidate.stage === "assessment");
    
    return matchesSearch && matchesPosition && matchesStatus && matchesTab;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getStageColor = (stage: string) => {
    return stageColors[stage as keyof typeof stageColors] || "bg-gray-100 text-gray-800 border-gray-200";
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
              <h1 className="text-3xl font-bold text-foreground">Candidates</h1>
              <p className="text-muted-foreground">AI-powered candidate screening and pipeline management</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
              <Button className="bg-electric-blue hover:bg-electric-blue/90 text-white">
                <Brain className="h-4 w-4 mr-2" />
                AI Insights
              </Button>
            </div>
          </div>

          {/* Pipeline Overview */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-foreground">248</div>
                <div className="text-sm text-muted-foreground">Total Applications</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-ai-purple">156</div>
                <div className="text-sm text-muted-foreground">AI Screening</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-electric-blue">89</div>
                <div className="text-sm text-muted-foreground">Assessment</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-neon-green">34</div>
                <div className="text-sm text-muted-foreground">Interview</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">12</div>
                <div className="text-sm text-muted-foreground">Offers</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={filterPosition} onValueChange={setFilterPosition}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Positions</SelectItem>
                  <SelectItem value="Senior Frontend Developer">Senior Frontend Developer</SelectItem>
                  <SelectItem value="Product Manager">Product Manager</SelectItem>
                  <SelectItem value="UX Designer">UX Designer</SelectItem>
                  <SelectItem value="DevOps Engineer">DevOps Engineer</SelectItem>
                  <SelectItem value="Marketing Specialist">Marketing Specialist</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Application Review">Application Review</SelectItem>
                  <SelectItem value="AI Screening">AI Screening</SelectItem>
                  <SelectItem value="Technical Assessment">Technical Assessment</SelectItem>
                  <SelectItem value="Interview Scheduled">Interview Scheduled</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Candidates Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Candidates ({mockCandidates.length})</TabsTrigger>
              <TabsTrigger value="screening">AI Screening (1)</TabsTrigger>
              <TabsTrigger value="assessment">Assessment (1)</TabsTrigger>
              <TabsTrigger value="interview">Interview (1)</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-6">
              <div className="space-y-4">
                {filteredCandidates.map((candidate) => (
                  <Card key={candidate.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-6">
                        {/* Avatar and Basic Info */}
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={candidate.avatar} alt={candidate.name} />
                            <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-semibold text-foreground">{candidate.name}</h3>
                              <Badge className={getStageColor(candidate.stage)}>
                                {candidate.status}
                              </Badge>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-2">{candidate.position}</p>
                            
                            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {candidate.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                Applied {formatDate(candidate.appliedDate)}
                              </div>
                              <div className="flex items-center gap-1">
                                <Briefcase className="h-3 w-3" />
                                {candidate.experience}
                              </div>
                              <div className="flex items-center gap-1">
                                <GraduationCap className="h-3 w-3" />
                                {candidate.education}
                              </div>
                            </div>
                            
                            {/* Skills */}
                            <div className="flex flex-wrap gap-1 mb-3">
                              {candidate.skills.slice(0, 4).map((skill, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                              {candidate.skills.length > 4 && (
                                <Badge variant="outline" className="text-xs">
                                  +{candidate.skills.length - 4} more
                                </Badge>
                              )}
                            </div>
                            
                            {/* Contact Info */}
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {candidate.email}
                              </div>
                              <div className="flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                {candidate.phone}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* AI Score and Actions */}
                        <div className="flex flex-col items-end gap-4">
                          {/* AI Score */}
                          <div className="text-center">
                            <div className="flex items-center gap-2 mb-2">
                              <Brain className="h-4 w-4 text-ai-purple" />
                              <span className="text-sm text-muted-foreground">AI Score</span>
                            </div>
                            <div className={`text-2xl font-bold ${getAIScoreColor(candidate.aiScore)}`}>
                              {candidate.aiScore}%
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {getAIScoreLabel(candidate.aiScore)}
                            </div>
                            <div className="w-20 mt-2">
                              <Progress value={candidate.aiScore} className="h-2" />
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4 mr-2" />
                              Resume
                            </Button>
                            <Button variant="outline" size="sm">
                              <LinkedinIcon className="h-4 w-4 mr-2" />
                              LinkedIn
                            </Button>
                            <Button size="sm" className="bg-electric-blue hover:bg-electric-blue/90 text-white">
                              View Profile
                              <ChevronRight className="h-4 w-4 ml-2" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Notes */}
                      {candidate.notes && (
                        <div className="mt-4 pt-4 border-t border-border">
                          <p className="text-sm text-muted-foreground">
                            <strong>Notes:</strong> {candidate.notes}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
                
                {filteredCandidates.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-muted-foreground mb-4">
                      <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <h3 className="text-lg font-medium">No candidates found</h3>
                      <p>Try adjusting your search criteria or filters.</p>
                    </div>
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
