import { Heart, Activity, Shield, Bell } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Caregiver = () => {
  const navigate = useNavigate();

  const insights = [
    { icon: Activity, label: "Daily Engagement", value: "87%", trend: "up" },
    { icon: Bell, label: "Reminders Completed", value: "15/17", trend: "stable" },
    { icon: Heart, label: "Mood Score", value: "8.2/10", trend: "up" },
    { icon: Shield, label: "Safety Alerts", value: "0", trend: "stable" },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-6 py-12">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-8"
        >
          ← Back to Home
        </Button>

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Peace of Mind, Visualized
            </h1>
            <p className="text-xl text-muted-foreground">
              Attentive care without surveillance, for profound reassurance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {insights.map((insight, index) => (
              <Card 
                key={index}
                className="p-6 bg-gradient-card hover:shadow-soft transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <insight.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {insight.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {insight.label}
                </div>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 bg-card/80 backdrop-blur-sm shadow-soft">
              <h2 className="text-2xl font-semibold mb-6 text-foreground">
                Recent Activity
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                  <div>
                    <p className="font-medium text-foreground">Medication taken on time</p>
                    <p className="text-sm text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div>
                    <p className="font-medium text-foreground">Video call with Sarah</p>
                    <p className="text-sm text-muted-foreground">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div>
                    <p className="font-medium text-foreground">Morning routine completed</p>
                    <p className="text-sm text-muted-foreground">8 hours ago</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-card/80 backdrop-blur-sm shadow-soft">
              <h2 className="text-2xl font-semibold mb-6 text-foreground">
                Care Insights
              </h2>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-primary/5">
                  <p className="text-sm font-medium text-primary mb-2">Sleep Pattern</p>
                  <p className="text-sm text-muted-foreground">
                    Sleeping well with consistent 7-8 hour nights
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-accent/5">
                  <p className="text-sm font-medium text-accent mb-2">Social Engagement</p>
                  <p className="text-sm text-muted-foreground">
                    Active conversations with family members daily
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-primary/5">
                  <p className="text-sm font-medium text-primary mb-2">Memory Exercises</p>
                  <p className="text-sm text-muted-foreground">
                    Regular engagement with memory recall activities
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Caregiver;
