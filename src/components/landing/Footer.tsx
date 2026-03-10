import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t bg-background pt-24 pb-8">
      {/* Background Watermark */}
      <div className="pointer-events-none select-none absolute hidden md:block bottom-0 left-1/2 -translate-x-1/2 w-full leading-none text-center text-[18vw] font-bold tracking-[-0.25rem] bg-gradient-to-b from-muted-foreground/10 to-background bg-clip-text text-transparent md:from-muted-foreground/20">
        BCB Edu
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Top Content Grid */}
        <div className="mb-16 grid grid-cols-1 gap-12 md:mb-40 md:grid-cols-2 lg:grid-cols-12">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-start lg:col-span-5">
            <div className="mb-6 flex items-center gap-2">
              <img
                src="kite.svg"
                alt="BCB Edu Logo"
                className="w-7 h-7 object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all"
              />
              <span className="text-xl font-bold">
                BCB <span className="text-gradient">Edu</span>
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Platform Edukasi Terpadu untuk Tingkatkan Kualitas Pembelajaran
              Anda.
            </p>
          </div>

          {/* Address */}
          <div className="flex flex-col gap-2 text-sm leading-loose text-muted-foreground lg:col-span-3">
            <p>1234 Edu Street, Blok 56B,</p>
            <p>Jakarta Selatan, JK 12345,</p>
            <p>Indonesia.</p>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4 text-sm text-muted-foreground lg:col-span-2">
            <a
              href="tel:+6281234567890"
              className="transition-colors hover:text-foreground"
            >
              +62 812 3456 7890
            </a>
            <a
              href="mailto:hello@bcbedu.com"
              className="transition-colors hover:text-foreground"
            >
              hello@bcbedu.com
            </a>
          </div>

          {/* Links */}
          <div className="flex flex-col items-start gap-4 text-sm text-muted-foreground md:items-end lg:col-span-2 lg:items-end">
            <a
              href="#modul"
              className="transition-colors hover:text-foreground"
            >
              Fitur
            </a>
            <a
              href="#harga"
              className="transition-colors hover:text-foreground"
            >
              Harga
            </a>
            <a
              href="#testimoni"
              className="transition-colors hover:text-foreground"
            >
              Testimoni
            </a>
            <a href="#demo" className="transition-colors hover:text-foreground">
              Kontak
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-8 text-sm text-muted-foreground md:flex-row md:items-end md:gap-4">
          <div className="flex-1 pt-2 md:pt-0">
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy Policy
            </a>
          </div>

          <div className="flex-1 text-center">
            <p>All right reserved © BCB Edu {new Date().getFullYear()}</p>
          </div>

          <div className="flex flex-1 flex-col items-center gap-6 md:items-end">
            <div className="flex gap-4">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted/50 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted/50 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted/50 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted/50 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
            <a href="#" className="transition-colors hover:text-foreground">
              Term of service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
