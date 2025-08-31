import { Clock, User, Briefcase, Calendar, CheckCircle2, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";

interface ActivityItem {
  id: string;
  type: "application" | "interview" | "hire" | "job_posted" | "ai_flag";
  title: string;
  description: string;
  timestamp: string;
  user?: {
    name: string;
    avatar?: string;
    initials: string;
  };
  badge?: {
    text: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  };
  isNew?: boolean;
}

const activityItems: ActivityItem[] = [
  {
    id: "1",
    type: "application",
    title: "New Application Received",
    description: "Sarah Chen applied for Senior Frontend Developer",
    timestamp: "2 min ago",
    user: {
      name: "Sarah Chen",
      initials: "SC",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c0a2?w=32&h=32&fit=crop&crop=face"
    },
    badge: { text: "High Match", variant: "default" },
    isNew: true
  },
  {
    id: "2",
    type: "ai_flag",
    title: "AI Recommendation",
    description: "Top 5% candidate identified for Product Manager role",
    timestamp: "15 min ago",
    badge: { text: "AI Insight", variant: "secondary" },
    isNew: true
  },
  {
    id: "3",
    type: "interview",
    title: "Interview Completed",
    description: "Final round with David Kim for Backend Engineer",
    timestamp: "1 hour ago",
    user: {
      name: "David Kim",
      initials: "DK",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
    },
    badge: { text: "Positive", variant: "default" }
  },
  {
    id: "4",
    type: "hire",
    title: "Candidate Hired",
    description: "Emily Rodriguez accepted offer for UX Designer",
    timestamp: "3 hours ago",
    user: {
      name: "Emily Rodriguez",
      initials: "ER",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face"
    },
    badge: { text: "Hired", variant: "default" }
  },
  {
    id: "5",
    type: "job_posted",
    title: "New Job Posted",
    description: "Data Scientist position is now live",
    timestamp: "5 hours ago",
    badge: { text: "Active", variant: "outline" }
  },
  {
    id: "6",
    type: "ai_flag",
    title: "Communication Risk Detected",
    description: "Candidate may need additional screening for soft skills",
    timestamp: "6 hours ago",
    badge: { text: "Review Needed", variant: "destructive" }
  }
];

function ActivityItemComponent({ item }: { item: ActivityItem }) {
  const getIcon = () => {
    switch (item.type) {
      case "application":
        return <User className="h-4 w-4 text-electric-blue" />;
      case "interview":
        return <Calendar className="h-4 w-4 text-ai-purple" />;
      case "hire":
        return <CheckCircle2 className="h-4 w-4 text-neon-green" />;
      case "job_posted":
        return <Briefcase className="h-4 w-4 text-muted-foreground" />;
      case "ai_flag":
        return <AlertTriangle className="h-4 w-4 text-danger-red" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className={`flex items-start space-x-3 p-3 rounded-lg transition-smooth hover:bg-muted/50 ${item.isNew ? 'bg-electric-blue/5 border-l-2 border-electric-blue' : ''}`}>
      <div className="flex-shrink-0 mt-1">
        {item.user ? (
          <Avatar className="h-8 w-8">
            <AvatarImage src={item.user.avatar} />
            <AvatarFallback className="text-xs">{item.user.initials}</AvatarFallback>
          </Avatar>
        ) : (
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
            {getIcon()}
          </div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-medium text-sm text-foreground">{item.title}</h4>
          {item.isNew && (
            <div className="h-2 w-2 bg-neon-green rounded-full pulse-glow" />
          )}
        </div>
        <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {item.timestamp}
          </span>
          {item.badge && (
            <Badge 
              variant={item.badge.variant}
              className="text-xs"
            >
              {item.badge.text}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}

export function ActivityFeed() {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span>Recent Activity</span>
          <Badge variant="outline" className="text-xs">
            {activityItems.filter(item => item.isNew).length} new
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <div className="space-y-1 p-3">
            {activityItems.map((item) => (
              <ActivityItemComponent key={item.id} item={item} />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}