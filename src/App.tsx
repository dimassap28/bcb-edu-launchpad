import { Toaster } from "@/shared/ui/toaster";
import { Toaster as Sonner } from "@/shared/ui/sonner";
import { TooltipProvider } from "@/shared/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GradualBlur from "@/shared/ui/GradualBlur";
import Index from "./pages/Index";
import Pricing from "./pages/Pricing";
import ModulAbsensi from "./pages/ModulAbsensi";
import ModulJadwal from "./pages/ModulJadwal";
import ModulCBT from "./pages/ModulCBT";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* GradualBlur - Top & Bottom of all pages */}
      <GradualBlur
        target="page"
        position="top"
        height="3rem"
        strength={0.6}
        curve="linear"
        exponential
        opacity={1}
        zIndex={-80}
      />
      <GradualBlur
        target="page"
        position="bottom"
        height="3rem"
        strength={0.6}
        curve="linear"
        exponential
        opacity={1}
        zIndex={-80}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/modul/absensi" element={<ModulAbsensi />} />
          <Route path="/modul/jadwal" element={<ModulJadwal />} />
          <Route path="/modul/cbt" element={<ModulCBT />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
