import { DashboardHeader } from "../components/DashboardHeader";
import { DashboardSidebar } from "../components/DashboardSidebar";
import { KPICards } from "../components/KPICards";
import { AIWidget } from "../components/AIWidget";
import { ActivityFeed } from "../components/ActivityFeed";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { 
  Plus, 
  Filter, 
  Download, 
  BarChart3, 
  PieChart, 
  TrendingUp,
  Users,
  Calendar
} from "lucide-react";

function QuickStats() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span>Pipeline Overview</span>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Applied</span>
            <span className="font-medium">248</span>
          </div>
          <Progress value={85} className="h-2" />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Screened</span>
            <span className="font-medium">156</span>
          </div>
          <Progress value={65} className="h-2" />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Interviewed</span>
            <span className="font-medium">64</span>
          </div>
          <Progress value={40} className="h-2" />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Hired</span>
            <span className="font-medium">18</span>
          </div>
          <Progress value={15} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}

function QuickActions() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button className="w-full justify-start bg-electric-blue hover:bg-electric-blue/90 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Post New Job
        </Button>
        
        <Button variant="outline" className="w-full justify-start">
          <Users className="h-4 w-4 mr-2" />
          Review Candidates
        </Button>
        
        <Button variant="outline" className="w-full justify-start">
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Interviews
        </Button>
        
        <Button variant="outline" className="w-full justify-start">
          <BarChart3 className="h-4 w-4 mr-2" />
          View Analytics
        </Button>
        
        <Button variant="outline" className="w-full justify-start">
          <Download className="h-4 w-4 mr-2" />
          Export Reports
        </Button>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <div className="flex">
        <DashboardSidebar />
        
        <main className="flex-1 p-6 space-y-6">
          {/* Welcome Section */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Welcome back, John!</h1>
              <p className="text-muted-foreground">Here's what's happening with your recruitment today.</p>
            </div>
            <div className="flex space-x-3">
              <Badge className="bg-neon-green/10 text-neon-green border-neon-green/20">
                5 new applications
              </Badge>
              <Badge className="bg-ai-purple/10 text-ai-purple border-ai-purple/20">
                3 interviews today
              </Badge>
            </div>
          </div>

          {/* KPI Cards */}
          <KPICards />

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
            {/* AI Widget - spans 2 columns */}
            <div className="lg:col-span-2">
              <AIWidget />
            </div>
            
            {/* Activity Feed - spans 2 columns */}
            <div className="lg:col-span-2">
              <ActivityFeed />
            </div>
            
            {/* Sidebar widgets - spans 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              <QuickStats />
              <QuickActions />
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-neon-green" />
                  Hiring Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                    <p>Interactive charts would be rendered here</p>
                    <p className="text-sm">Using Recharts library</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="h-5 w-5 mr-2 text-ai-purple" />
                  Source Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    { source: "LinkedIn", percentage: 45, color: "bg-electric-blue" },
                    { source: "Indeed", percentage: 25, color: "bg-ai-purple" },
                    { source: "Company Site", percentage: 20, color: "bg-neon-green" },
                    { source: "Referrals", percentage: 10, color: "bg-muted" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`h-3 w-3 rounded-full ${item.color}`} />
                        <span className="text-sm">{item.source}</span>
                      </div>
                      <span className="text-sm font-medium">{item.percentage}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
