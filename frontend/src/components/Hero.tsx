import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import memoryNetwork from "@/assets/memory-network.jpg";

const Hero = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-gradient-hero opacity-90"
        style={{
          backgroundImage: `url(${memoryNetwork})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      />
      
      {user && (
        <div className="absolute top-6 right-6 z-20 flex gap-3">
          <Button variant="outline" onClick={() => navigate('/timeline')} className="bg-card/50 backdrop-blur-sm">
            My Timeline
          </Button>
          <Button variant="outline" onClick={signOut} className="bg-card/50 backdrop-blur-sm">
            Sign Out
          </Button>
        </div>
      )}
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="mb-6 inline-block">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium backdrop-blur-sm border border-accent/20">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            AI Cognitive Companion
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground animate-in fade-in slide-in-from-bottom-4 duration-700">
          Memory Mirror
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-foreground/90 font-medium animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          A warm, intelligent companion that gently holds your memories
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          {user ? (
            <>
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => navigate('/conversation')}
              >
                Start Conversation
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/timeline')}
                className="bg-card/50 backdrop-blur-sm hover:bg-card/80"
              >
                View Timeline
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => navigate('/auth')}
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/daily-anchor')}
                className="bg-card/50 backdrop-blur-sm hover:bg-card/80"
              >
                Learn More
              </Button>
            </>
          )}
        </div>
        
        <p className="mt-12 text-lg italic text-foreground/80 animate-in fade-in duration-700 delay-300">
          "We hold the light, so you can always find your way back."
        </p>
      </div>
    </section>
  );
};

export default Hero;
