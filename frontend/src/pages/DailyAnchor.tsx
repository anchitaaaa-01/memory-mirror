import { Calendar, Clock, Bell } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const DailyAnchor = () => {
  const navigate = useNavigate();

  const mockSchedule = [
    { time: "9:00 AM", title: "Morning Medication", type: "reminder" },
    { time: "10:30 AM", title: "Coffee with Sarah", type: "event" },
    { time: "2:00 PM", title: "Doctor's Appointment", type: "event" },
    { time: "6:00 PM", title: "Evening Medication", type: "reminder" },
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

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Calendar className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Your Day, Gently Held
            </h1>
            <p className="text-xl text-muted-foreground">
              Start each day with clarity and confidence
            </p>
          </div>

          <Card className="p-8 bg-card/80 backdrop-blur-sm shadow-soft mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">Today's Schedule</h2>
            </div>
            
            <div className="space-y-4">
              {mockSchedule.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg bg-gradient-card hover:shadow-soft transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    <div className={`w-3 h-3 rounded-full mt-1 ${
                      item.type === 'reminder' ? 'bg-accent' : 'bg-primary'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {item.type === 'reminder' && <Bell className="w-4 h-4 text-accent" />}
                      <span className="font-medium text-foreground">{item.title}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8 bg-card/80 backdrop-blur-sm shadow-soft">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Memory Highlights</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Yesterday, you enjoyed a wonderful lunch at the Italian restaurant downtown. 
              You mentioned the pasta reminded you of your grandmother's cooking.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Sarah called in the evening to discuss the upcoming family reunion. 
              She's excited about seeing everyone next month.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DailyAnchor;
