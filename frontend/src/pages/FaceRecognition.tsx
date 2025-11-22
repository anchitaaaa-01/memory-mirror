import { Camera, Upload } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const FaceRecognition = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleImageUpload = () => {
    toast({
      title: "Face Recognition",
      description: "This feature would connect to face recognition AI to identify loved ones and recall shared memories.",
    });
  };

  const mockRelationships = [
    { name: "Sarah Johnson", relation: "Daughter", lastSeen: "3 days ago", memories: 47 },
    { name: "Michael Chen", relation: "Son", lastSeen: "1 week ago", memories: 89 },
    { name: "Emma Davis", relation: "Granddaughter", lastSeen: "Yesterday", memories: 23 },
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

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Camera className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              A Face, A Flood of Context
            </h1>
            <p className="text-xl text-muted-foreground">
              Instantly reconnect with familiar faces and cherished relationships
            </p>
          </div>

          <Card className="p-8 bg-card/80 backdrop-blur-sm shadow-soft mb-8">
            <div className="text-center py-12 border-2 border-dashed border-border rounded-lg mb-8 hover:border-primary transition-colors duration-300">
              <Upload className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg text-muted-foreground mb-4">
                Upload a photo to recognize who's in it
              </p>
              <Button variant="hero" onClick={handleImageUpload}>
                Choose Photo
              </Button>
            </div>
          </Card>

          <div>
            <h2 className="text-2xl font-semibold mb-6 text-foreground">
              Recent Connections
            </h2>
            <div className="grid gap-4">
              {mockRelationships.map((person, index) => (
                <Card 
                  key={index}
                  className="p-6 bg-gradient-card hover:shadow-soft transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-1">
                        {person.name}
                      </h3>
                      <p className="text-muted-foreground mb-2">{person.relation}</p>
                      <p className="text-sm text-muted-foreground">
                        Last seen: {person.lastSeen}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">
                        {person.memories}
                      </div>
                      <p className="text-sm text-muted-foreground">shared memories</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaceRecognition;
