import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Tag } from "lucide-react";
import { PillBadge } from "@/components/ui/pill-badge";

const PricingSection = () => {
  return (
    <section id="harga" className="py-24 bg-section-alt">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Pill badge */}
          <PillBadge icon={<Tag className="h-3 w-3" />}>
            Harga Transparan
          </PillBadge>

          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Harga Transparan, <span className="text-gradient">Sesuai Skala Sekolah Anda</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mulai dari <span className="font-bold text-foreground">Rp 2.000 / siswa / tahun</span> — Core System gratis selamanya.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-card rounded-2xl shadow-card-hover border overflow-hidden"
        >
          {/* Header */}
          <div className="bg-hero-gradient p-8 text-center">
            <h3 className="text-2xl font-bold text-primary-foreground mb-2">Simulasi Harga</h3>
            <p className="text-primary-foreground/80 text-sm">Contoh untuk 1.000 siswa aktif</p>
          </div>

          <div className="p-8 space-y-4">
            {[
              { label: "Core System (Database, Kelas, Dashboard)", price: "Gratis", highlight: true },
              { label: "Absensi & Jurnaling", price: "Rp 5.000.000" },
              { label: "Jadwal & Kurikulum", price: "Rp 2.000.000" },
              { label: "Nilai & Rapor", price: "Rp 3.000.000" },
              { label: "CBT — Ujian Online", price: "Rp 3.000.000" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-3 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <Check className={`h-4 w-4 ${item.highlight ? 'text-secondary' : 'text-primary'}`} />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                <span className={`text-sm font-bold ${item.highlight ? 'text-secondary' : 'text-foreground'}`}>{item.price}</span>
              </div>
            ))}

            <div className="mt-6 pt-6 border-t">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold">Total (tanpa diskon)</span>
                <span className="font-bold text-lg">Rp 13.000.000<span className="text-sm font-normal text-muted-foreground"> /tahun</span></span>
              </div>
              <div className="flex justify-between items-center text-secondary">
                <span className="text-sm font-semibold">Dengan diskon bundling 15%</span>
                <span className="font-bold">Rp 11.050.000</span>
              </div>
            </div>

            <div className="bg-muted rounded-xl p-4 mt-4">
              <p className="text-sm text-muted-foreground text-center">
                💡 Ambil lebih banyak modul atau kontrak multi-tahun? <span className="font-bold text-foreground">Dapatkan diskon hingga 20%.</span>
              </p>
            </div>

            <div className="text-center mt-6">
              <Button size="lg" asChild className="bg-hero-gradient hover:opacity-90 transition-opacity px-8 h-12 rounded-xl">
                <a href="/pricing">Hitung Estimasi Biaya Sekolah Anda</a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
