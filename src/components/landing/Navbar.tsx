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
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-hero-gradient flex items-center justify-center">
            <span className="text-sm font-bold text-primary-foreground">B</span>
          </div>
          <span className="text-xl font-bold text-foreground">BCB <span className="text-gradient">Edu</span></span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {/* Modul Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors outline-none">
              Modul
              <ChevronDown className="h-3.5 w-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-72 p-2">
              {modulItems.map((item) => (
                <DropdownMenuItem key={item.href} asChild className="cursor-pointer rounded-md px-3 py-2.5 focus:bg-accent">
                  <Link to={item.href} className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-foreground">{item.title}</span>
                    <span className="text-xs text-muted-foreground">{item.subtitle}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {navLinks.map((link) =>
            link.href.startsWith("/") ? (
              <Link key={link.href} to={link.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {link.label}
              </Link>
            ) : (
              <a key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {link.label}
              </a>
            )
          )}
        </div>

        <div className="hidden md:block">
          <Button asChild className="bg-hero-gradient hover:opacity-90 transition-opacity">
            <a href="#demo">Jadwalkan Demo</a>
          </Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-b px-4 pb-4 space-y-1">
          {/* Modul Accordion */}
          <Collapsible open={modulOpen} onOpenChange={setModulOpen}>
            <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              Modul
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${modulOpen ? "rotate-180" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-4 space-y-1 pb-1">
              {modulItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 hover:bg-accent"
                >
                  <span className="block text-sm font-medium text-foreground">{item.title}</span>
                  <span className="block text-xs text-muted-foreground">{item.subtitle}</span>
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {navLinks.map((link) =>
            link.href.startsWith("/") ? (
              <Link key={link.href} to={link.href} onClick={() => setOpen(false)} className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                {link.label}
              </Link>
            ) : (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                {link.label}
              </a>
            )
          )}
          <Button asChild className="w-full bg-hero-gradient mt-2">
            <a href="#demo" onClick={() => setOpen(false)}>Jadwalkan Demo</a>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
