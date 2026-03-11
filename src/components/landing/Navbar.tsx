import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";

const modulItems = [
  {
    title: "Absensi & Jurnaling",
    subtitle: "Catat kehadiran & aktivitas kelas secara digital",
    href: "/modul/absensi",
  },
  {
    title: "Jadwal & Kurikulum",
    subtitle: "Atur jadwal otomatis, tanpa bentrok",
    href: "/modul/jadwal",
  },
  {
    title: "CBT – Ujian Online",
    subtitle: "Ujian online langsung di platform BCB Edu",
    href: "/modul/cbt",
  },
];

const navLinks = [
  { label: "Cara Kerja", href: "#cara-kerja" },
  { label: "Harga", href: "/pricing" },
  { label: "Testimoni", href: "#testimoni" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [modulOpen, setModulOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center justify-between h-20 px-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 relative z-50">
          <img
            src="/kite.svg"
            alt="BCB Edu Logo"
            className="w-8 h-8 object-contain"
          />
          <span className="text-xl font-bold text-foreground">
            BCB <span className="text-gradient">Edu</span>
          </span>
        </a>

        {/* Desktop Center Nav Pill */}
        <div className="hidden md:flex items-center bg-card/80 backdrop-blur-xl border border-border rounded-full px-2 py-1.5 shadow-sm">
          {/* Modul Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors outline-none px-4 py-2 rounded-full hover:bg-muted/60">
              Modul
              <ChevronDown className="h-3.5 w-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-72 p-2">
              {modulItems.map((item) => (
                <DropdownMenuItem
                  key={item.href}
                  asChild
                  className="cursor-pointer rounded-md px-3 py-2.5 focus:bg-accent"
                >
                  <Link to={item.href} className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-foreground">
                      {item.title}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.subtitle}
                    </span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {navLinks.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-full hover:bg-muted/60"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-full hover:bg-muted/60"
              >
                {link.label}
              </a>
            ),
          )}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button
            asChild
            className="bg-hero-gradient hover:opacity-90 transition-opacity rounded-full px-6"
          >
            <a href="#demo">Jadwalkan Demo</a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-full border border-border bg-card/80 backdrop-blur-xl text-foreground"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="relative z-10 flex flex-col items-center gap-8 h-full bg-gradient-to-b from-primary via-primary/95 to-secondary pt-24 pb-8 px-6">
              {/* Nav Links */}
              <div className="flex flex-col items-center gap-2 w-full">
                {/* Modul Accordion */}
                <button
                  onClick={() => setModulOpen(!modulOpen)}
                  className="text-xl font-semibold text-primary-foreground/90 hover:text-primary-foreground transition-colors py-3 flex items-center gap-2"
                >
                  Modul
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${modulOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {modulOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden flex flex-col items-center gap-1"
                    >
                      {modulItems.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => setOpen(false)}
                          className="text-base text-primary-foreground/70 hover:text-primary-foreground transition-colors py-2"
                        >
                          {item.title}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {navLinks.map((link) =>
                  link.href.startsWith("/") ? (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setOpen(false)}
                      className="text-xl font-semibold text-primary-foreground/90 hover:text-primary-foreground transition-colors py-3"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-xl font-semibold text-primary-foreground/90 hover:text-primary-foreground transition-colors py-3"
                    >
                      {link.label}
                    </a>
                  ),
                )}
              </div>

              {/* Bottom CTA */}
              <div className="w-full">
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-full h-12 text-base font-semibold bg-primary-foreground text-primary hover:bg-primary-foreground/90 border-0"
                >
                  <a href="#demo" onClick={() => setOpen(false)}>
                    Jadwalkan Demo
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
