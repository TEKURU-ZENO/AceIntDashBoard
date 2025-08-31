import React from "react";
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Calendar, 
  BarChart3, 
  Settings,
  ChevronRight,
  Zap
} from "lucide-react";
import { RouterContext } from "../App";
import { cn } from "./ui/utils";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface SidebarItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  path: string;
  count?: number;
  subItems?: { label: string; count?: number }[];
}

const sidebarItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { 
    icon: Briefcase, 
    label: "Jobs", 
    path: "/jobs",
    count: 12,
    subItems: [
      { label: "Active", count: 8 },
      { label: "Draft", count: 3 },
      { label: "Archived", count: 1 }
    ]
  },
  { 
    icon: Users, 
    label: "Candidates", 
    path: "/candidates",
    count: 248,
    subItems: [
      { label: "New Applications", count: 23 },
      { label: "In Review", count: 45 },
      { label: "Shortlisted", count: 12 }
    ]
  },
  { 
    icon: Calendar, 
    label: "Interviews", 
    path: "/interviews",
    count: 5,
    subItems: [
      { label: "Today", count: 2 },
      { label: "This Week", count: 8 },
      { label: "Upcoming", count: 15 }
    ]
  },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
];

export function DashboardSidebar() {
  const { currentPath, navigate } = React.useContext(RouterContext);

  const isActive = (path: string) => {
    return currentPath === path || (path === "/dashboard" && currentPath === "/");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="w-64 h-full bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* AI Assistant Banner */}
      <div className="p-4 m-4 bg-gradient-to-r from-ai-purple/10 to-electric-blue/10 rounded-lg border border-ai-purple/20">
        <div className="flex items-center space-x-2 mb-2">
          <div className="h-6 w-6 bg-ai-purple rounded-full flex items-center justify-center">
            <Zap className="h-3 w-3 text-white" />
          </div>
          <span className="font-medium text-ai-purple">AI Assistant</span>
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          Get AI-powered insights for your hiring process
        </p>
        <Button size="sm" className="w-full bg-ai-purple hover:bg-ai-purple/90 text-white">
          Ask AI
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {sidebarItems.map((item, index) => {
          const active = isActive(item.path);
          return (
            <div key={index}>
              <Button
                variant="ghost"
                onClick={() => handleNavigation(item.path)}
                className={cn(
                  "w-full justify-start transition-smooth hover:bg-sidebar-accent",
                  active && "bg-sidebar-accent text-sidebar-primary font-medium"
                )}
              >
                <item.icon className={cn(
                  "mr-3 h-4 w-4",
                  active ? "text-sidebar-primary" : "text-muted-foreground"
                )} />
                <span className="flex-1 text-left">{item.label}</span>
                {item.count && (
                  <Badge 
                    variant="secondary" 
                    className={cn(
                      "ml-auto text-xs",
                      active ? "bg-sidebar-primary text-sidebar-primary-foreground" : "bg-muted"
                    )}
                  >
                    {item.count}
                  </Badge>
                )}
                {item.subItems && (
                  <ChevronRight className="ml-2 h-3 w-3 text-muted-foreground" />
                )}
              </Button>
              
              {/* Sub-items (expanded for active item) */}
              {item.subItems && active && (
                <div className="ml-7 mt-1 space-y-1">
                  {item.subItems.map((subItem, subIndex) => (
                    <Button
                      key={subIndex}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-xs text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50"
                    >
                      <span className="flex-1 text-left">{subItem.label}</span>
                      {subItem.count && (
                        <Badge variant="outline" className="ml-auto text-xs">
                          {subItem.count}
                        </Badge>
                      )}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="px-4 pb-2">
        <Button
          variant="ghost"
          onClick={() => handleNavigation('/settings')}
          className={cn(
            "w-full justify-start transition-smooth hover:bg-sidebar-accent",
            isActive('/settings') && "bg-sidebar-accent text-sidebar-primary font-medium"
          )}
        >
          <Settings className={cn(
            "mr-3 h-4 w-4",
            isActive('/settings') ? "text-sidebar-primary" : "text-muted-foreground"
          )} />
          <span className="flex-1 text-left">Settings</span>
        </Button>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="text-xs text-muted-foreground text-center">
          AceInt v2.0.1 • AI-Powered Recruitment
        </div>
      </div>
    </div>
  );
}