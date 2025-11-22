import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import DailyAnchor from "./pages/DailyAnchor";
import Conversation from "./pages/Conversation";
import FaceRecognition from "./pages/FaceRecognition";
import Caregiver from "./pages/Caregiver";
import MemoryTimeline from "./pages/MemoryTimeline";

// ✅ Backend base URL (from .env if present, otherwise fallback to your Render URL)
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://memory-mirror-2.onrender.com/api";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // you can tweak these for better UX
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// 🔍 Small component that checks backend /health once on app load
const BackendHealthWatcher = () => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/health`);
        if (!res.ok) {
          console.warn(
            "[Memory Mirror] Backend health check failed:",
            res.status,
            res.statusText
          );
        } else {
          const data = await res.json().catch(() => null);
          console.log("[Memory Mirror] Backend connected ✅", data);
        }
      } catch (err) {
        console.error("[Memory Mirror] Backend unreachable ❌", err);
      } finally {
        setChecked(true);
      }
    };

    checkHealth();
  }, []);

  // we don't need to render anything for this; it's just a background check
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          {/* This silently pings your backend when the app mounts */}
          <BackendHealthWatcher />

          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/daily-anchor" element={<DailyAnchor />} />
            <Route path="/face-recognition" element={<FaceRecognition />} />
            <Route path="/caregiver" element={<Caregiver />} />
            <Route
              path="/conversation"
              element={
                <ProtectedRoute>
                  <Conversation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/timeline"
              element={
                <ProtectedRoute>
                  <MemoryTimeline />
                </ProtectedRoute>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
