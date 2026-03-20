import type { ReactNode } from "react";

export interface SizePreset {
  label: string;
  range: string;
  value: number;
}

export interface PricingModule {
  id: string;
  name: string;
  description: string;
  pricePerStudent: number;
  icon: ReactNode;
  free?: boolean;
  comingSoon?: boolean;
}

export interface FaqItem {
  q: string;
  a: string;
}
