import { motion } from "framer-motion";
import { Button } from "@/shared/ui/button";
import { ArrowRight } from "lucide-react";

export function PricingGuarantee() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Jaminan Uang Kembali 100%</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Kami menawarkan jaminan uang kembali 100%. Jika kami gagal memberikan penempatan media yang tercantum dalam rencana ERP sekolah
            Anda, kami akan mengembalikan uang Anda seluruhnya — tanpa ribet.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button size="lg" asChild className="bg-hero-gradient hover:opacity-90 transition-opacity text-lg px-8 h-14 rounded-xl">
              <a href="#demo">
                Jadwalkan Demo Gratis
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>

          <div className="mt-12 flex justify-center">
            <div className="relative w-48 h-48">
              <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center">
                <div className="w-36 h-36 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-3xl font-extrabold text-primary">100%</span>
                    <span className="block text-xs font-bold text-primary/70 uppercase tracking-wider">Guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
