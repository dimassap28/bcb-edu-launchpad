import { motion } from "framer-motion";
import { Zap, Monitor, BookOpen, FileText } from "lucide-react";

export function PricingFreeSetup() {
  return (
    <section className="py-20 bg-section-alt">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4 flex-wrap">
            <h2 className="text-3xl md:text-4xl font-extrabold flex items-center gap-2">
              <Zap className="h-8 w-8 text-accent" />
              <span className="bg-hero-gradient text-background px-3 py-1 rounded-lg">FREE</span> SETUP FEE
            </h2>
            <span className="border-2 border-foreground rounded-full px-4 py-1 text-secondary font-bold text-sm">
              HEMAT HINGGA Rp 5 JUTA!
            </span>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nikmati layanan tanpa biaya setup awal. Tim BCB Edu membantu sekolah Anda dalam proses penyiapan sistem hingga siap digunakan secara optimal.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <Monitor className="h-8 w-8 text-primary" />,
              title: "Setup & Migrasi Data",
              desc: "Tim kami membantu input data awal siswa, guru, dan kelas dari Excel ke dalam sistem BCB Edu hingga siap pakai.",
            },
            {
              icon: <BookOpen className="h-8 w-8 text-primary" />,
              title: "Pelatihan Guru",
              desc: "Sesi pelatihan intensif (online/offline) untuk admin dan guru agar mahir menggunakan fitur-fitur sistem.",
            },
            {
              icon: <FileText className="h-8 w-8 text-primary" />,
              title: "Kustomisasi Logo",
              desc: "Penyesuaian logo sekolah pada kop surat, format rapor, dan kartu ujian sesuai identitas sekolah Anda.",
            },
          ].map((item) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card rounded-2xl border p-6 shadow-card">
              <div className="mb-4">{item.icon}</div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
