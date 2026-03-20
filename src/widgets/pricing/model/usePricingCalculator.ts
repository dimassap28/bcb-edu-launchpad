import { useState, useMemo } from "react";
import { MODULES } from "@/entities/pricing";

export type BillingCycle = "monthly" | "annually";

export interface PricingTotals {
  subtotal: number;
  discount: number;
  couponDiscount: number;
  total: number;
}

export interface UsePricingCalculatorReturn {
  studentCount: number;
  setStudentCount: (n: number) => void;
  selectedModules: string[];
  toggleModule: (id: string) => void;
  isBundle: boolean;
  setIsBundle: (v: boolean) => void;
  billingCycle: BillingCycle;
  setBillingCycle: (v: BillingCycle) => void;
  couponCode: string;
  setCouponCode: (v: string) => void;
  couponApplied: boolean;
  applyCoupon: () => void;
  totals: PricingTotals;
}

const VALID_COUPON = "PENGGUNABARU";
const COUPON_DISCOUNT_RATE = 0.1;
const BUNDLE_DISCOUNT_RATE = 0.1;
const ANNUAL_DISCOUNT_RATE = 0.2;

export const usePricingCalculator = (): UsePricingCalculatorReturn => {
  const [studentCount, setStudentCount] = useState(750);
  const [selectedModules, setSelectedModules] = useState<string[]>(["core", "lms", "cbt"]);
  const [isBundle, setIsBundle] = useState(true);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("annually");
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const toggleModule = (id: string) => {
    if (id === "core") return; // core tidak bisa di-toggle
    setSelectedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );
  };

  const applyCoupon = () => {
    if (couponCode.trim().toUpperCase() === VALID_COUPON) {
      setCouponApplied(true);
    }
  };

  const totals = useMemo((): PricingTotals => {
    const paidModules = selectedModules.filter((id) => {
      const mod = MODULES.find((m) => m.id === id);
      return mod && !mod.free && !mod.comingSoon;
    });

    const subtotal = paidModules.reduce((sum, id) => {
      const mod = MODULES.find((m) => m.id === id)!;
      return sum + mod.pricePerStudent * studentCount;
    }, 0);

    const bundleDiscount =
      isBundle && paidModules.length >= 2 ? subtotal * BUNDLE_DISCOUNT_RATE : 0;
    const annualDiscount =
      billingCycle === "annually"
        ? (subtotal - bundleDiscount) * ANNUAL_DISCOUNT_RATE
        : 0;
    const discount = bundleDiscount + annualDiscount;
    const couponDiscount = couponApplied
      ? (subtotal - discount) * COUPON_DISCOUNT_RATE
      : 0;

    return { subtotal, discount, couponDiscount, total: subtotal - discount - couponDiscount };
  }, [selectedModules, studentCount, isBundle, billingCycle, couponApplied]);

  return {
    studentCount, setStudentCount,
    selectedModules, toggleModule,
    isBundle, setIsBundle,
    billingCycle, setBillingCycle,
    couponCode, setCouponCode,
    couponApplied, applyCoupon,
    totals,
  };
};
