import type { ElementType, ReactNode } from "react";

export interface ProblemType {
  icon: ElementType;
  title: string;
  desc: string;
  animation: ReactNode;
  extraRef?: any;
}

export interface FloatingTag {
  label: string;
  icon: ElementType;
  x: string;
  y: string | number;
  mobileX?: string;
}

export interface ChaosFile {
  label: string;
  Icon: ElementType;
  x: string;
  y: number;
  rot: number;
  dur: number;
  delay: number;
}

export interface ChecklistItem {
  label: string;
  delay: number;
  highlight: boolean;
}

export interface UIButton {
  label: string;
  variant: "fill" | "outline" | "ghost";
  x: string;
  y: number;
  ox: string;
  oy: string;
  delay: number;
}

export interface UITag {
  label: string;
  color: string;
  x: string;
  y: number;
  delay: number;
}
