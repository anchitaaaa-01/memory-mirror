import FeatureCard from "./FeatureCard";
import { Calendar, MessageCircle, Camera, Heart } from "lucide-react";

const Features = () => {
  const features = [
    {
      title: "Your Day, Gently Held",
      description: "Start each day with clarity. Your schedule, memories, and reminders arranged like cards in a gentle hand.",
      icon: Calendar,
      href: "/daily-anchor"
    },
    {
      title: "A Dialogue with Your Second Self",
      description: "Ask anything. Your AI companion reconstructs context and meaning from your memories with profound empathy.",
      icon: MessageCircle,
      href: "/conversation"
    },
    {
      title: "A Face, A Flood of Context",
      description: "The ultimate magic trick. Instantly reconnect with familiar faces and cherished relationships.",
      icon: Camera,
      href: "/face-recognition"
    },
    {
      title: "Peace of Mind, Visualized",
      description: "Transform anxiety into insight. Attentive care without surveillance, for profound reassurance.",
      icon: Heart,
      href: "/caregiver"
    }
  ];

  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-foreground">
          Four Moments of Care
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {features.map((feature, index) => (
            <div 
              key={feature.href}
              className="animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
