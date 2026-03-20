export const ROUTES = {
  home: "/",
  pricing: "/pricing",
  modulAbsensi: "/modul/absensi",
  modulJadwal: "/modul/jadwal",
  modulCBT: "/modul/cbt",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
