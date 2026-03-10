import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Send, Mail, Phone, CheckCircle2, CalendarCheck } from "lucide-react";
import { PillBadge } from "@/components/ui/pill-badge";

const MODULE_OPTIONS = [
  "Absensi & Jurnaling",
  "Jadwal & Kurikulum",
  "CBT – Ujian Online",
  "Belum tahu, ingin konsultasi",
];

const CTASection = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const toggleModule = (mod: string) => {
    setSelectedModules((prev) =>
      prev.includes(mod) ? prev.filter((m) => m !== mod) : [...prev, mod],
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const newErrors: Record<string, boolean> = {};

    ["nama", "sekolah", "phone", "email"].forEach((field) => {
      if (!formData.get(field)?.toString().trim()) {
        newErrors[field] = true;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast({
        title: "Terima kasih! 🎉",
        description: "Tim kami akan menghubungi Anda dalam 1x24 jam.",
      });
    }, 1000);
  };

  return (
    <section id="demo" className="py-24">
      <div className="px-14">
        <div className="bg-muted rounded-3xl p-8 md:p-14 mx-auto">
          <div className="grid md:grid-cols-[45fr_50fr] gap-8 md:gap-12 items-start">
            {/* LEFT COLUMN */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col"
            >
              <PillBadge icon={<CalendarCheck className="h-3 w-3" />}>
                Jadwalkan Demo
              </PillBadge>

              <h2 className="text-4xl md:text-[64px] max-w-3xl md:leading-[1.15] font-extrabold text-foreground mb-4">
                Siap Membawa Sekolah
                <br />
                Anda ke Level
                <br />
                <span className="text-gradient">Berikutnya?</span>
              </h2>

              <p className="text-muted-foreground text-lg max-w-md mb-8">
                Isi form di sebelah dan tim kami akan menghubungi Anda dalam
                1×24 jam untuk menjadwalkan demo gratis.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[10px] bg-card shadow-sm border flex items-center justify-center shrink-0">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-semibold text-foreground">
                      halo@bcbedu.id
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[10px] bg-card shadow-sm border flex items-center justify-center shrink-0">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">WhatsApp</p>
                    <p className="text-sm font-semibold text-foreground">
                      +62 812-XXXX-XXXX
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT COLUMN — FORM CARD */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
            >
              <div className="bg-card rounded-[20px] p-6 md:p-9 shadow-card border">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle2 className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">
                      Terima kasih!
                    </h3>
                    <p className="text-muted-foreground text-sm max-w-xs">
                      Tim kami akan segera menghubungi Anda.
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      Jadwalkan Demo Gratis
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Gratis setup · Gratis migrasi · Gratis pelatihan
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Nama */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label className="text-xs text-muted-foreground">
                            Nama Lengkap
                          </Label>
                          <Input
                            name="nama"
                            placeholder="Masukkan nama lengkap Anda"
                            className={`h-11 rounded-xl ${errors.nama ? "border-destructive ring-1 ring-destructive" : ""}`}
                            onChange={() =>
                              setErrors((p) => ({ ...p, nama: false }))
                            }
                          />
                        </div>

                        {/* Sekolah */}
                        <div className="space-y-1.5">
                          <Label className="text-xs text-muted-foreground">
                            Nama Sekolah
                          </Label>
                          <Input
                            name="sekolah"
                            placeholder="Masukkan nama sekolah"
                            className={`h-11 rounded-xl ${errors.sekolah ? "border-destructive ring-1 ring-destructive" : ""}`}
                            onChange={() =>
                              setErrors((p) => ({ ...p, sekolah: false }))
                            }
                          />
                        </div>

                        {/* Phone */}
                        <div className="space-y-1.5">
                          <Label className="text-xs text-muted-foreground">
                            No. HP / WhatsApp
                          </Label>
                          <Input
                            name="phone"
                            type="tel"
                            placeholder="+62"
                            className={`h-11 rounded-xl ${errors.phone ? "border-destructive ring-1 ring-destructive" : ""}`}
                            onChange={() =>
                              setErrors((p) => ({ ...p, phone: false }))
                            }
                          />
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                          <Label className="text-xs text-muted-foreground">
                            Email
                          </Label>
                          <Input
                            name="email"
                            type="email"
                            placeholder="nama@sekolah.sch.id"
                            className={`h-11 rounded-xl ${errors.email ? "border-destructive ring-1 ring-destructive" : ""}`}
                            onChange={() =>
                              setErrors((p) => ({ ...p, email: false }))
                            }
                          />
                        </div>

                        {/* Modul — checkbox pills */}
                        <div className="space-y-1.5 col-span-2">
                          <Label className="text-xs text-muted-foreground">
                            Modul yang Diminati
                          </Label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {MODULE_OPTIONS.map((mod) => {
                              const isSelected = selectedModules.includes(mod);
                              return (
                                <button
                                  key={mod}
                                  type="button"
                                  onClick={() => toggleModule(mod)}
                                  className={`text-left text-xs px-3 py-2.5 rounded-xl border transition-colors ${
                                    isSelected
                                      ? "border-primary bg-primary/5 text-primary font-medium"
                                      : "border-border bg-background text-muted-foreground hover:border-primary/40"
                                  }`}
                                >
                                  <span className="mr-1.5">
                                    {isSelected ? "✓" : "○"}
                                  </span>
                                  {mod}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        disabled={loading}
                        className="w-full bg-hero-gradient hover:opacity-90 transition-opacity h-12 rounded-xl text-base"
                      >
                        {loading ? (
                          "Mengirim..."
                        ) : (
                          <>
                            Jadwalkan Demo Sekarang
                            <Send className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>

                      <p className="text-center text-xs text-muted-foreground">
                        Tidak ada komitmen. Kami menghubungi Anda dalam 1×24
                        jam.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
