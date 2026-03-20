import type { ElementType } from "react";

export interface SolutionCardType {
  icon: ElementType;
  name: string;
  desc: string;
  connectedPersonas: string[];
}

export interface PersonaCardType {
  icon: ElementType;
  name: string;
  tagline: string;
  benefits: string[];
  color: string;
}
