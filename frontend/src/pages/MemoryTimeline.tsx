import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';
import { MessageCircle, Calendar, Bell, Award } from 'lucide-react';

interface TimelineItem {
  id: string;
  title: string;
  description: string;
  type: 'conversation' | 'event' | 'reminder' | 'achievement';
  created_at: string;
}

const MemoryTimeline = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [items, setItems] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadTimeline();
    }
  }, [user]);

  const loadTimeline = async () => {
    try {
      // Load conversations
      const { data: conversations } = await supabase
        .from('conversations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      // Load memory highlights
      const { data: highlights } = await supabase
        .from('memory_highlights')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      const timelineItems: TimelineItem[] = [
        ...(conversations?.map(c => ({
          id: c.id,
          title: c.title,
          description: `Conversation started on ${new Date(c.created_at).toLocaleDateString()}`,
          type: 'conversation' as const,
          created_at: c.created_at,
        })) || []),
        ...(highlights?.map(h => ({
          id: h.id,
          title: h.title,
          description: h.description,
          type: h.highlight_type as any,
          created_at: h.created_at,
        })) || []),
      ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      setItems(timelineItems);
    } catch (error) {
      console.error('Error loading timeline:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'conversation':
        return MessageCircle;
      case 'event':
        return Calendar;
      case 'reminder':
        return Bell;
      case 'achievement':
        return Award;
      default:
        return MessageCircle;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'conversation':
        return 'text-primary';
      case 'event':
        return 'text-accent';
      case 'reminder':
        return 'text-secondary';
      case 'achievement':
        return 'text-primary';
      default:
        return 'text-primary';
    }
  };

  if (!user) {
    return null;
  }

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Your Memory Timeline
            </h1>
            <p className="text-xl text-muted-foreground">
              A chronological view of your conversations and important moments
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-pulse text-muted-foreground">Loading your memories...</div>
            </div>
          ) : items.length === 0 ? (
            <Card className="p-12 text-center bg-card/80 backdrop-blur-sm shadow-soft">
              <p className="text-lg text-muted-foreground mb-4">
                No memories yet. Start a conversation to begin building your timeline!
              </p>
              <Button variant="hero" onClick={() => navigate('/')}>
                Start Your Journey
              </Button>
            </Card>
          ) : (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

              <div className="space-y-8">
                {items.map((item, index) => {
                  const Icon = getIcon(item.type);
                  const iconColor = getIconColor(item.type);

                  return (
                    <div
                      key={item.id}
                      className="relative pl-20 animate-in fade-in slide-in-from-bottom-4 duration-700"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className={`absolute left-6 w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center`}>
                        <Icon className={`w-3 h-3 ${iconColor}`} />
                      </div>

                      <Card className="p-6 bg-gradient-card hover:shadow-soft transition-all duration-300">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-semibold text-foreground">
                            {item.title}
                          </h3>
                          <span className="text-sm text-muted-foreground">
                            {new Date(item.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-muted-foreground">
                          {item.description}
                        </p>
                        <div className="mt-4">
                          <span className="inline-block px-3 py-1 text-xs rounded-full bg-primary/10 text-primary capitalize">
                            {item.type}
                          </span>
                        </div>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemoryTimeline;
