import { DashboardHeader } from "../components/DashboardHeader";
import { DashboardSidebar } from "../components/DashboardSidebar";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { 
  TrendingUp, 
  TrendingDown,
  Users,
  Clock,
  DollarSign,
  Target,
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart,
  LineChart,
  Activity
} from "lucide-react";

const metrics = [
  {
    title: "Time to Hire",
    value: "28 days",
    change: -12,
    trend: "down",
    description: "Average time from job posting to offer acceptance"
  },
  {
    title: "Cost per Hire",
    value: "$3,240",
    change: -8,
    trend: "down", 
    description: "Total recruitment cost per successful hire"
  },
  {
    title: "Candidate Experience",
    value: "4.6/5",
    change: 15,
    trend: "up",
    description: "Average candidate satisfaction rating"
  },
  {
    title: "Offer Acceptance Rate",
    value: "87%",
    change: 12,
    trend: "up",
    description: "Percentage of offers accepted by candidates"
  }
];

const sourceData = [
  { source: "LinkedIn", applications: 124, hires: 18, percentage: 45, color: "bg-electric-blue" },
  { source: "Indeed", applications: 89, hires: 12, percentage: 25, color: "bg-ai-purple" },
  { source: "Company Website", applications: 67, hires: 11, percentage: 20, color: "bg-neon-green" },
  { source: "Referrals", applications: 45, hires: 8, percentage: 15, color: "bg-orange-500" },
  { source: "Other", applications: 28, hires: 3, percentage: 10, color: "bg-gray-500" }
];

const departmentData = [
  { department: "Engineering", open: 8, filled: 12, pipeline: 45 },
  { department: "Product", open: 3, filled: 5, pipeline: 23 },
  { department: "Design", open: 2, filled: 3, pipeline: 18 },
  { department: "Marketing", open: 4, filled: 6, pipeline: 31 },
  { department: "Sales", open: 5, filled: 8, pipeline: 29 }
];

export default function Analytics() {
  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <TrendingUp className="h-4 w-4 text-neon-green" />
    ) : (
      <TrendingDown className="h-4 w-4 text-neon-green" />
    );
  };

  const getTrendColor = (trend: string) => {
    return trend === "up" ? "text-neon-green" : "text-neon-green";
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
              <h1 className="text-3xl font-bold text-foreground">Analytics & Reports</h1>
              <p className="text-muted-foreground">Comprehensive insights into your recruitment performance</p>
            </div>
            <div className="flex gap-2">
              <Select defaultValue="last-30-days">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-7-days">Last 7 days</SelectItem>
                  <SelectItem value="last-30-days">Last 30 days</SelectItem>
                  <SelectItem value="last-quarter">Last quarter</SelectItem>
                  <SelectItem value="last-year">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button className="bg-electric-blue hover:bg-electric-blue/90 text-white">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{metric.title}</p>
                      <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(metric.trend)}
                      <span className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                        {Math.abs(metric.change)}%
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{metric.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Analytics Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="sources">Source Analysis</TabsTrigger>
              <TabsTrigger value="departments">Department View</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Hiring Funnel */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="h-5 w-5 mr-2 text-electric-blue" />
                      Hiring Funnel
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Applications</span>
                        <span className="font-medium">1,425</span>
                      </div>
                      <Progress value={100} className="h-3" />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Screened</span>
                        <span className="font-medium">856</span>
                      </div>
                      <Progress value={60} className="h-3" />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Interviewed</span>
                        <span className="font-medium">312</span>
                      </div>
                      <Progress value={22} className="h-3" />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Offers</span>
                        <span className="font-medium">89</span>
                      </div>
                      <Progress value={6} className="h-3" />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Hires</span>
                        <span className="font-medium">72</span>
                      </div>
                      <Progress value={5} className="h-3" />
                    </div>
                  </CardContent>
                </Card>

                {/* Top Performers */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-ai-purple" />
                      Top Performing Jobs
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { job: "Senior Frontend Developer", applications: 156, hires: 8, rate: 5.1 },
                      { job: "Product Manager", applications: 134, hires: 6, rate: 4.5 },
                      { job: "DevOps Engineer", applications: 89, hires: 5, rate: 5.6 },
                      { job: "UX Designer", applications: 78, hires: 4, rate: 5.1 }
                    ].map((job, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{job.job}</p>
                          <p className="text-xs text-muted-foreground">{job.applications} applications</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-sm">{job.hires} hires</p>
                          <p className="text-xs text-neon-green">{job.rate}% rate</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Monthly Trends Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <LineChart className="h-5 w-5 mr-2 text-neon-green" />
                    Monthly Hiring Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium">Interactive Chart Placeholder</p>
                      <p className="text-sm">Monthly applications, interviews, and hires would be visualized here using Recharts</p>
                      <div className="flex justify-center gap-8 mt-4 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-electric-blue rounded-full"></div>
                          <span>Applications</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-ai-purple rounded-full"></div>
                          <span>Interviews</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-neon-green rounded-full"></div>
                          <span>Hires</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sources" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Source Performance */}
                <Card>
                  <CardHeader>
                    <CardTitle>Application Sources</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {sourceData.map((source, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`h-3 w-3 rounded-full ${source.color}`} />
                            <span className="text-sm font-medium">{source.source}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground">{source.applications} apps</span>
                            <span className="text-sm font-medium">{source.percentage}%</span>
                          </div>
                        </div>
                        <Progress value={source.percentage} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Source ROI */}
                <Card>
                  <CardHeader>
                    <CardTitle>Source ROI Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {sourceData.map((source, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{source.source}</p>
                          <p className="text-xs text-muted-foreground">
                            {source.hires} hires from {source.applications} applications
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-sm">
                            {((source.hires / source.applications) * 100).toFixed(1)}%
                          </p>
                          <p className="text-xs text-muted-foreground">conversion</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="departments" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Department Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {departmentData.map((dept, index) => (
                      <div key={index} className="p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold">{dept.department}</h3>
                          <Badge variant="outline">{dept.pipeline} in pipeline</Badge>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <p className="text-2xl font-bold text-orange-500">{dept.open}</p>
                            <p className="text-xs text-muted-foreground">Open Positions</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-neon-green">{dept.filled}</p>
                            <p className="text-xs text-muted-foreground">Filled This Month</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-electric-blue">{dept.pipeline}</p>
                            <p className="text-xs text-muted-foreground">Active Candidates</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Hiring Velocity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Activity className="h-5 w-5 mr-2 text-electric-blue" />
                      Hiring Velocity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Average Time to Screen</span>
                        <span className="font-medium">3.2 days</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Average Time to Interview</span>
                        <span className="font-medium">12.4 days</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Average Time to Offer</span>
                        <span className="font-medium">18.6 days</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Average Time to Accept</span>
                        <span className="font-medium">6.8 days</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quality Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="h-5 w-5 mr-2 text-ai-purple" />
                      Quality Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">90-day Retention Rate</span>
                        <span className="font-medium text-neon-green">94%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Interview No-Show Rate</span>
                        <span className="font-medium text-orange-500">8%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Offer Decline Rate</span>
                        <span className="font-medium text-danger-red">13%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Hiring Manager Satisfaction</span>
                        <span className="font-medium text-neon-green">4.7/5</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
