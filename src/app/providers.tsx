import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/shared/ui/tooltip";
import { Toaster } from "@/shared/ui/toaster";
import { Toaster as Sonner } from "@/shared/ui/sonner";
import GradualBlur from "@/shared/ui/GradualBlur";
import type { ReactNode } from "react";

const queryClient = new QueryClient();

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
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
      {children}
    </TooltipProvider>
  </QueryClientProvider>
);
