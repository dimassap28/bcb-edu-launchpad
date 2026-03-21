// ── model (types) ──────────────────────────────────────────────────────────
export type {
  ProblemType,
  FloatingTag,
  ChaosFile,
  ChecklistItem,
  UIButton,
  UITag,
} from "./model/problem.types";
export type { SolutionCardType, PersonaCardType } from "./model/solution-persona.types";

// ── data ───────────────────────────────────────────────────────────────────
export {
  floatingTags,
  FILES,
  CHECKLIST_ITEMS,
  PRICE_STEPS,
  UI_BUTTONS,
  UI_TAGS,
  TAG_COLORS,
} from "./data/problem.data";
export { NAV_MODUL_ITEMS, NAV_LINKS } from "./data/nav.data";
export { LANDING_MODULES } from "./data/modules.data";
export type { LandingModule } from "./data/modules.data";
export { SOLUTIONS, PERSONAS } from "./data/solution-persona.data";
export { HOW_IT_WORKS_STEPS, ANIM_MODULES } from "./data/how-it-works.data";
export type { HowItWorksStep, AnimModule } from "./data/how-it-works.data";
