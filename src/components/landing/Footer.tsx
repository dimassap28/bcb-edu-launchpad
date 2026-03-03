const Footer = () => {
  return (
    <footer className="border-t py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-hero-gradient flex items-center justify-center">
              <span className="text-xs font-bold text-primary-foreground">B</span>
            </div>
            <span className="text-lg font-bold">BCB <span className="text-gradient">Edu</span></span>
          </div>

          <div className="flex gap-8 text-sm text-muted-foreground">
            <a href="#modul" className="hover:text-foreground transition-colors">Fitur</a>
            <a href="#harga" className="hover:text-foreground transition-colors">Harga</a>
            <a href="#testimoni" className="hover:text-foreground transition-colors">Testimoni</a>
            <a href="#demo" className="hover:text-foreground transition-colors">Kontak</a>
          </div>

          <p className="text-sm text-muted-foreground">
            © 2026 BCB Edu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
