import { TrendingUp, TrendingDown, Users, Briefcase, Calendar, Target } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { cn } from "./ui/utils";

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  changeType: "increase" | "decrease";
  icon: React.ComponentType<{ className?: string }>;
  trend?: number[];
}

function KPICard({ title, value, change, changeType, icon: Icon, trend }: KPICardProps) {
  return (
    <Card className="transition-smooth hover:shadow-lg hover:shadow-electric-blue/10 hover:border-electric-blue/30 pulse-glow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={cn(
              "p-2 rounded-lg",
              changeType === "increase" ? "bg-neon-green/10" : "bg-danger-red/10"
            )}>
              <Icon className={cn(
                "h-5 w-5",
                changeType === "increase" ? "text-neon-green" : "text-danger-red"
              )} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{title}</p>
              <p className="text-2xl font-bold text-foreground">{value}</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className={cn(
              "flex items-center text-sm font-medium",
              changeType === "increase" ? "text-neon-green" : "text-danger-red"
            )}>
              {changeType === "increase" ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              {change}
            </div>
            <p className="text-xs text-muted-foreground mt-1">vs last month</p>
          </div>
        </div>
        
        {/* Mini trend chart */}
        {trend && (
          <div className="mt-4 h-12 flex items-end space-x-1">
            {trend.map((value, index) => (
              <div
                key={index}
                className={cn(
                  "flex-1 rounded-t-sm transition-all duration-300",
                  changeType === "increase" ? "bg-neon-green/20" : "bg-danger-red/20"
                )}
                style={{ height: `${(value / Math.max(...trend)) * 100}%` }}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function KPICards() {
  const kpiData = [
    {
      title: "Total Applications",
      value: "1,248",
      change: "+12.5%",
      changeType: "increase" as const,
      icon: Users,
      trend: [45, 52, 48, 61, 55, 67, 72, 68, 75, 82, 78, 85]
    },
    {
      title: "Active Jobs",
      value: "24",
      change: "+8.3%",
      changeType: "increase" as const,
      icon: Briefcase,
      trend: [12, 15, 18, 22, 19, 24, 21, 25, 28, 24, 26, 24]
    },
    {
      title: "Interviews Scheduled",
      value: "64",
      change: "+15.2%",
      changeType: "increase" as const,
      icon: Calendar,
      trend: [28, 32, 29, 35, 42, 38, 45, 52, 48, 55, 61, 64]
    },
    {
      title: "Hire Rate",
      value: "18.5%",
      change: "-2.1%",
      changeType: "decrease" as const,
      icon: Target,
      trend: [22, 21, 19, 20, 18, 17, 19, 18, 17, 18, 19, 18.5]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiData.map((kpi, index) => (
        <KPICard key={index} {...kpi} />
      ))}
    </div>
  );
}