import type { ElementType, ReactNode } from "react";

/** Komponen yang bisa menerima children */
export interface WithChildren {
  children: ReactNode;
}

/** Komponen yang bisa menerima className tambahan */
export interface WithClassName {
  className?: string;
}

/** Komponen React dengan icon dari lucide-react */
export interface WithIcon {
  icon: ElementType;
}
