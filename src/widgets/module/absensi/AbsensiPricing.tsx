import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { PillBadge } from "@/shared/ui/pill-badge";
import { Wallet } from "lucide-react";
import { Section, sectionVariants, childFade } from "@/widgets/module/ui/Section";
import { useCountUp } from "@/shared/hooks/use-count-up";
import { cardHover } from "@/entities/module/data/module.data";

export function AbsensiPricing() {
  const pricingRef = useRef<HTMLDivElement>(null);
  const pricingInView = useInView(pricingRef, { once: true, margin: "-80px" });
  const countedPrice = useCountUp(5000, 1200, pricingInView);

  return (
    <Section className="py-24 bg-section-alt" id="harga">
      <div className="container mx-auto px-4">
        <motion.div variants={sectionVariants} className="flex flex-col items-center">
          <PillBadge icon={<Wallet className="w-3 h-3" />}>Harga Modul</PillBadge>
          <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-12">
            Harga Transparan, Bayar Sesuai Siswa Aktif
          </h2>
        </motion.div>

        <motion.div variants={childFade()} className="max-w-lg mx-auto">
          <div
            ref={pricingRef}
            className={`${cardHover} p-8 md:p-10 text-center`}>
            <p className="text-sm text-muted-foreground mb-2 font-medium">
              Mulai dari
            </p>
            <p className="text-5xl md:text-6xl font-extrabold text-gradient mb-1">
              Rp {countedPrice.toLocaleString("id-ID")}
            </p>
            <p className="text-muted-foreground text-sm mb-8">
              / siswa / tahun
            </p>

            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">500 siswa</span>
                <span className="font-semibold">Rp 2.500.000 / tahun</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">1.000 siswa</span>
                <span className="font-semibold">Rp 5.000.000 / tahun</span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mb-4">
              Hemat 5–15% jika dikombinasikan dengan modul lain
            </p>

            <Link
              to="/pricing"
              className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1">
              Lihat detail harga lengkap →
            </Link>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
