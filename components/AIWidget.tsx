import { Brain, TrendingUp, Users, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface ConfidenceScoreProps {
  label: string;
  score: number;
  color: string;
}

function ConfidenceScore({ label, score, color }: ConfidenceScoreProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex items-center space-x-2">
        <Progress 
          value={score} 
          className="w-16 h-2" 
          style={{ 
            backgroundColor: `${color}20`,
          }}
        />
        <span className="text-sm font-medium w-10 text-right">{score}%</span>
      </div>
    </div>
  );
}

export function AIWidget() {
  const confidenceScores = [
    { label: "Skill Match", score: 92, color: "#00E676" },
    { label: "Experience", score: 78, color: "#0066FF" },
    { label: "Culture Fit", score: 85, color: "#8B5CF6" },
    { label: "Communication", score: 67, color: "#FF5252" }
  ];

  const insights = [
    { text: "3 high-potential candidates identified", type: "positive" },
    { text: "JavaScript skills trending up 23%", type: "neutral" },
    { text: "Interview no-show rate increased", type: "warning" }
  ];

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-to-br from-ai-purple to-electric-blue rounded-lg flex items-center justify-center">
              <Brain className="h-4 w-4 text-white" />
            </div>
            <span>AI Insights</span>
          </CardTitle>
          <Badge className="bg-neon-green/10 text-neon-green border-neon-green/20">
            Real-time
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Confidence Scores */}
        <div>
          <h4 className="font-medium mb-3 flex items-center">
            <TrendingUp className="h-4 w-4 mr-2 text-neon-green" />
            Matching Confidence
          </h4>
          <div className="space-y-1">
            {confidenceScores.map((score, index) => (
              <ConfidenceScore key={index} {...score} />
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div>
          <h4 className="font-medium mb-3 flex items-center">
            <Zap className="h-4 w-4 mr-2 text-ai-purple" />
            Latest Insights
          </h4>
          <div className="space-y-2">
            {insights.map((insight, index) => (
              <div 
                key={index}
                className="flex items-center p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className={`h-2 w-2 rounded-full mr-3 ${
                  insight.type === "positive" ? "bg-neon-green" :
                  insight.type === "warning" ? "bg-danger-red" : "bg-electric-blue"
                }`} />
                <span className="text-sm flex-1">{insight.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <Button className="w-full bg-gradient-to-r from-ai-purple to-electric-blue hover:from-ai-purple/90 hover:to-electric-blue/90 text-white">
          <Users className="h-4 w-4 mr-2" />
          View Detailed Analysis
        </Button>
      </CardContent>
    </Card>
  );
}