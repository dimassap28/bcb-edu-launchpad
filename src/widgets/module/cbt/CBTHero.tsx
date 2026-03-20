import { motion } from "framer-motion";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Send } from "lucide-react";
import { staggerContainer, childFade } from "@/widgets/module/ui/Section";

export function CBTHero() {
  return (
    <section className="pt-28 pb-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto relative">
          <div className="grid lg:flex gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer(0.12)}>
              <motion.div variants={childFade()}>
                <Badge variant="secondary" className="mb-4 text-xs font-semibold">
                  Modul · CBT – Ujian Online
                </Badge>
              </motion.div>
              <motion.div variants={childFade()}>
                <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.12] mb-5">
                  Ujian Online Langsung di Platform —{" "}
                  <span className="text-gradient">Aman, Stabil, Otomatis</span>
                </h1>
              </motion.div>
              <motion.div variants={childFade()}>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
                  Buat soal, jadwalkan ujian, pantau 1000+ siswa secara bersamaan, dan lihat hasil otomatis — semua di satu tempat tanpa aplikasi tambahan.
                </p>
              </motion.div>
              <motion.div variants={childFade()}>
                <Button size="lg" asChild className="bg-hero-gradient hover:opacity-90 transition-opacity text-lg px-8 h-14 rounded-xl">
                  <a href="/#demo">
                    Jadwalkan Demo Gratis
                    <Send className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </motion.div>
              <motion.div variants={childFade()}>
                <p className="mt-4 text-sm text-muted-foreground">
                  Harga mulai <span className="font-semibold text-foreground">Rp 3.000</span> / siswa / tahun
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="right-0 -translate-y-1/2 lg:translate-y-0 lg:right-auto flex justify-center"
            >
              <div
                className="relative rounded-[2.5rem] border-2 border-border bg-muted/50 flex items-center justify-center"
                style={{ width: 280, aspectRatio: "9/19.5" }}
              >
                <span className="text-xs text-muted-foreground font-medium">[ Screenshot Produk ]</span>
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 rounded-full bg-border/60" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
