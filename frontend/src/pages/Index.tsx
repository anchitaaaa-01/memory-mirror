import Hero from "@/components/Hero";
import Features from "@/components/Features";
import { ChatWidget } from "@/components/ChatWidget";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <ChatWidget />
    </div>
  );
};

export default Index;
