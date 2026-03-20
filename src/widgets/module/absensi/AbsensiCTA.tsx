import { motion } from "framer-motion";
import { Button } from "@/shared/ui/button";
import { Send } from "lucide-react";

export function AbsensiCTA() {
  return (
    <section className="bg-hero-gradient py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-4">
          Tertarik dengan Modul Ini?
        </h2>
        <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-8">
          Jadwalkan demo gratis dan lihat langsung cara kerja modul Absensi
          &amp; Jurnaling di sekolah Anda.
        </p>
        <Button
          asChild
          size="lg"
          variant="secondary"
          className="bg-card text-foreground hover:bg-card/90 h-14 rounded-xl text-base px-8 shadow-lg">
          <a href="/#demo">
            Jadwalkan Demo Sekarang
            <Send className="ml-2 h-5 w-5" />
          </a>
        </Button>
        <p className="mt-4 text-sm text-primary-foreground/70">
          Tidak ada komitmen. Tim kami menghubungi Anda dalam 1×24 jam.
        </p>
      </motion.div>
    </section>
  );
}
