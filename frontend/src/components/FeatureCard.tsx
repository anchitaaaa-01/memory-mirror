import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

const FeatureCard = ({ title, description, icon: Icon, href }: FeatureCardProps) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="p-8 cursor-pointer bg-gradient-card hover:shadow-soft transition-all duration-500 hover:scale-105 border-border group"
      onClick={() => navigate(href)}
    >
      <div className="mb-4 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
        <Icon className="w-7 h-7 text-primary group-hover:text-accent transition-colors duration-300" />
      </div>
      <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </Card>
  );
};

export default FeatureCard;
