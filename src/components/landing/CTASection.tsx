import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

const CTASection = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Terima kasih! 🎉",
        description: "Tim kami akan menghubungi Anda dalam 1x24 jam.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <section id="demo" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-card rounded-2xl shadow-card-hover border overflow-hidden">
            <div className="bg-hero-gradient p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-3">
                Siap Membawa Sekolah Anda ke Level Berikutnya?
              </h2>
              <p className="text-primary-foreground/80">
                Jadwalkan demo gratis dan lihat langsung bagaimana BCB Edu bekerja untuk sekolah Anda.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input placeholder="Nama lengkap" required className="h-12 rounded-xl" />
                <Input placeholder="Nama sekolah" required className="h-12 rounded-xl" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input placeholder="No. HP / WhatsApp" type="tel" required className="h-12 rounded-xl" />
                <Input placeholder="Email" type="email" required className="h-12 rounded-xl" />
              </div>
              <Input placeholder="Modul yang diminati (opsional)" className="h-12 rounded-xl" />

              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full bg-hero-gradient hover:opacity-90 transition-opacity h-14 rounded-xl text-lg"
              >
                {loading ? "Mengirim..." : (
                  <>
                    Jadwalkan Demo Sekarang
                    <Send className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Tidak ada komitmen. Tim kami akan menghubungi Anda dalam 1x24 jam.
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
