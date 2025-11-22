import { useState, useRef, useEffect } from "react";
import { MessageCircle, Mic, Send, Volume2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const Conversation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I\'m here to help you remember and reflect. What would you like to talk about today?' }
  ]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await handleVoiceInput(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      toast({
        title: "Microphone Error",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleVoiceInput = async (audioBlob: Blob) => {
    // Mock transcription - in production, this would call a speech-to-text service
    const mockTranscription = "Tell me about my last conversation with Sarah";
    setInput(mockTranscription);
    
    // Auto-send after brief delay
    setTimeout(() => {
      handleSendMessage(mockTranscription);
      setInput('');
    }, 500);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    
    // Mock AI response
    setTimeout(() => {
      const mockResponse = "Based on your memories, you last spoke with Sarah three days ago about the family reunion. She mentioned bringing her famous apple pie and asked about your dietary preferences. You seemed excited about seeing your grandchildren there.";
      const assistantMessage: Message = { role: 'assistant', content: mockResponse };
      setMessages(prev => [...prev, assistantMessage]);
      speakText(mockResponse);
    }, 1000);

    if (!text) setInput('');
  };

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
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <MessageCircle className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              A Dialogue with Your Second Self
            </h1>
          </div>

          <Card className="p-6 bg-card/80 backdrop-blur-sm shadow-soft">
            <div className="h-[500px] overflow-y-auto mb-4 space-y-4 pr-2">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="flex gap-2">
              <Button
                variant={isRecording ? "destructive" : "outline"}
                size="icon"
                onClick={isRecording ? stopRecording : startRecording}
                className="flex-shrink-0"
              >
                <Mic className={isRecording ? "animate-pulse" : ""} />
              </Button>
              
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message or use voice..."
                className="flex-1"
              />
              
              <Button
                onClick={() => handleSendMessage()}
                size="icon"
                disabled={!input.trim()}
              >
                <Send />
              </Button>

              {isSpeaking && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => window.speechSynthesis.cancel()}
                >
                  <Volume2 className="animate-pulse" />
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
