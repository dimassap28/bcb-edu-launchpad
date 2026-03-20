import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Check, Shield, Zap, Monitor, Info, Star } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Slider } from "@/shared/ui/slider";
import { Switch } from "@/shared/ui/switch";
import { cn } from "@/shared/lib/utils";

import { SIZE_PRESETS, MODULES } from "@/entities/pricing/data/pricing.data";

const formatRupiah = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);

export function PricingCalculator() {
  const [studentCount, setStudentCount] = useState(750);
  const [selectedModules, setSelectedModules] = useState<string[]>(["core", "lms", "cbt"]);
  const [isBundle, setIsBundle] = useState(true);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("annually");
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const activePreset = SIZE_PRESETS.findIndex((p) => {
    if (p.value <= 300 && studentCount <= 300) return true;
    if (p.value > 300 && p.value <= 800 && studentCount > 300 && studentCount <= 800) return true;
    if (p.value > 800 && studentCount > 800) return true;
    return false;
  });

  const toggleModule = (id: string) => {
    if (id === "core") return;
    setSelectedModules((prev) => (prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]));
  };

  const { subtotal, discount, couponDiscount, total } = useMemo(() => {
    const paidModules = selectedModules.filter((id) => {
      const mod = MODULES.find((m) => m.id === id);
      return mod && !mod.free && !mod.comingSoon;
    });

    const sub = paidModules.reduce((sum, id) => {
      const mod = MODULES.find((m) => m.id === id)!;
      return sum + mod.pricePerStudent * studentCount;
    }, 0);

    const bundleDiscount = isBundle && paidModules.length >= 2 ? sub * 0.1 : 0;
    const annualDiscount = billingCycle === "annually" ? (sub - bundleDiscount) * 0.2 : 0;
    const disc = bundleDiscount + annualDiscount;

    const couponDisc = couponApplied ? (sub - disc) * 0.1 : 0;

    return {
      subtotal: sub,
      discount: disc,
      couponDiscount: couponDisc,
      total: sub - disc - couponDisc,
    };
  }, [selectedModules, studentCount, isBundle, billingCycle, couponApplied]);

  const applyCoupon = () => {
    if (couponCode.trim().toUpperCase() === "PENGGUNABARU") {
      setCouponApplied(true);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-12 bg-hero-gradient text-primary-foreground text-center">
        <div className="container mx-auto px-4">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl font-extrabold mb-4">
            Hak akses semua modul, aktivasi bertahap.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Dalam paket ini, sekolah mendapatkan hak menggunakan semua modul selama 1 tahun, dengan aktivasi dan pendampingan bertahap.
          </motion.p>

          {/* Billing toggle */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center bg-primary-foreground/10 backdrop-blur-sm rounded-full p-1 gap-1">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-semibold transition-all",
                billingCycle === "monthly" ? "bg-primary-foreground text-primary" : "text-primary-foreground/70 hover:text-primary-foreground"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annually")}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2",
                billingCycle === "annually" ? "bg-primary-foreground text-primary" : "text-primary-foreground/70 hover:text-primary-foreground"
              )}
            >
              Annually
              <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full font-bold">⚡ 20% OFF</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[1fr_380px] gap-8 max-w-6xl mx-auto">
            {/* Left panel */}
            <div className="space-y-8">
              {/* Step 1: Student count */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card rounded-2xl border shadow-card p-6 md:p-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-hero-gradient flex items-center justify-center">
                    <Zap className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-lg">1. Tentukan Kapasitas Sekolah</h3>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">Wajib</span>
                </div>
                <p className="text-sm text-muted-foreground mb-6 ml-11">Harga modul menyesuaikan jumlah siswa.</p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">Geser slider sesuai jumlah siswa:</span>
                  <span className="text-lg font-bold text-primary">{studentCount.toLocaleString("id-ID")} Siswa</span>
                </div>

                <Slider value={[studentCount]} onValueChange={([v]) => setStudentCount(v)} min={50} max={1500} step={10} className="mb-4" />
                <div className="flex justify-between text-xs text-muted-foreground mb-6">
                  <span>50</span>
                  <span>500</span>
                  <span>1000</span>
                  <span>1500+</span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {SIZE_PRESETS.map((preset, i) => (
                    <button
                      key={preset.label}
                      onClick={() => setStudentCount(preset.value)}
                      className={cn(
                        "rounded-xl py-3 px-2 text-center border transition-all",
                        activePreset === i ? "bg-primary text-primary-foreground border-primary shadow-md" : "bg-card hover:bg-muted border-border"
                      )}
                    >
                      <span className="block text-sm font-bold">{preset.label}</span>
                      <span className={cn("block text-xs mt-0.5", activePreset === i ? "text-primary-foreground/80" : "text-muted-foreground")}>({preset.range})</span>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Step 2: Module selection */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card rounded-2xl border shadow-card p-6 md:p-8">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-hero-gradient flex items-center justify-center">
                      <Shield className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <h3 className="font-bold text-lg">2. Pilih Modul yang Dibutuhkan</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-accent-foreground flex items-center gap-1">
                      <Star className="h-4 w-4 text-accent" />
                      Bundle (Lebih Murah)
                    </span>
                    <Switch checked={isBundle} onCheckedChange={setIsBundle} />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-6 ml-11">Centang fitur yang ingin Anda aktifkan.</p>

                <div className="space-y-3">
                  {MODULES.map((mod) => {
                    const isSelected = selectedModules.includes(mod.id);
                    const calculatedPrice = mod.free ? 0 : mod.pricePerStudent * studentCount;
                    const originalPerStudent = mod.comingSoon ? 0 : mod.pricePerStudent;

                    return (
                      <button
                        key={mod.id}
                        onClick={() => toggleModule(mod.id)}
                        disabled={mod.comingSoon}
                        className={cn(
                          "w-full rounded-xl border p-4 text-left transition-all flex items-start gap-4",
                          mod.comingSoon ? "opacity-60 cursor-not-allowed bg-muted/50" : isSelected ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-primary/30 hover:bg-muted/30"
                        )}
                      >
                        <div className={cn("w-6 h-6 rounded-md border-2 flex items-center justify-center mt-0.5 shrink-0 transition-all", isSelected ? "bg-primary border-primary" : "border-muted-foreground/30")}>
                          {isSelected && <Check className="h-4 w-4 text-primary-foreground" />}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm">{mod.name}</span>
                            <Info className="h-3.5 w-3.5 text-muted-foreground" />
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{mod.description}</p>
                        </div>

                        <div className="text-right shrink-0">
                          {mod.comingSoon ? (
                            <span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-1 rounded-full">Coming Soon</span>
                          ) : mod.free ? (
                            <div>
                              <span className="text-sm font-bold text-secondary">Rp 0</span>
                              <span className="block text-xs text-muted-foreground">/ tahun</span>
                            </div>
                          ) : (
                            <div>
                              {isBundle && isSelected && <span className="text-xs text-muted-foreground line-through">{formatRupiah(originalPerStudent * studentCount * 1.1)}</span>}
                              <span className="text-sm font-bold text-primary ml-1">{formatRupiah(calculatedPrice)}</span>
                              <span className="block text-xs text-muted-foreground">siswa/tahun</span>
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Right panel: Summary */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:sticky lg:top-24 h-fit">
              <div className="bg-card rounded-2xl border shadow-card-hover overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b">
                  <h3 className="font-bold text-lg">Estimasi Investasi</h3>
                  <span className="text-xs bg-secondary/10 text-secondary px-3 py-1 rounded-full font-semibold">Free</span>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Monitor className="h-4 w-4" />
                    <span>
                      Untuk <strong className="text-foreground">{studentCount.toLocaleString("id-ID")} Siswa</strong>
                    </span>
                  </div>

                  <div className="space-y-3 pt-2">
                    {MODULES.filter((m) => selectedModules.includes(m.id) && !m.comingSoon).map((mod) => (
                      <div key={mod.id} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{mod.name.split("(")[0].trim()}</span>
                        <span className="font-semibold">{mod.free ? "Rp 0" : formatRupiah(mod.pricePerStudent * studentCount)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Coupon */}
                  <div className="pt-3 border-t">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => {
                            setCouponCode(e.target.value);
                            setCouponApplied(false);
                          }}
                          placeholder="Masukkan kode kupon"
                          className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                      <Button variant="outline" size="sm" onClick={applyCoupon} className="h-10 shrink-0">
                        Terapkan
                      </Button>
                    </div>
                    {couponApplied && (
                      <div className="flex items-center justify-between mt-3 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded-full font-semibold">PENGGUNABARU</span>
                          <span className="text-secondary text-xs font-semibold">10% OFF</span>
                        </div>
                        <span className="text-secondary font-semibold">- {formatRupiah(couponDiscount)}</span>
                      </div>
                    )}
                  </div>

                  {/* Total */}
                  <div className="pt-4 border-t space-y-2">
                    {discount > 0 && (
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Potongan</span>
                        <span>- {formatRupiah(discount)}</span>
                      </div>
                    )}
                    <div className="flex items-end justify-between">
                      <span className="text-sm font-semibold text-muted-foreground">Total / Tahun</span>
                      <div className="text-right">
                        {(discount > 0 || couponApplied) && <span className="text-sm line-through text-muted-foreground block">{formatRupiah(subtotal)}</span>}
                        <span className="text-2xl font-extrabold text-foreground">{formatRupiah(total)}</span>
                        <span className="text-xs text-muted-foreground block">*Belum termasuk PPN 11%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <Button className="w-full h-12 bg-hero-gradient hover:opacity-90 transition-opacity rounded-xl font-semibold" asChild>
                      <a href="#demo">Minta Penawaran Resmi</a>
                    </Button>
                    <Button variant="outline" className="w-full h-12 rounded-xl font-semibold" asChild>
                      <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                        Konsultasi via WhatsApp
                      </a>
                    </Button>
                  </div>

                  <div className="flex items-start gap-2 text-xs text-secondary bg-secondary/5 rounded-lg p-3">
                    <Check className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>Free up to 6-month trial • No credit card required • Secure payment</span>
                  </div>

                  <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg p-3">
                    <Check className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>Harga final dapat berbeda tergantung negosiasi dan kustomisasi khusus.</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
