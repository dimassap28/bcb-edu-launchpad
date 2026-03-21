import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";

import { HomePage } from "@/pages/home";
import { PricingPage } from "@/pages/pricing";
import { ModulAbsensiPage } from "@/pages/modul/absensi";
import { ModulJadwalPage } from "@/pages/modul/jadwal";
import { ModulCBTPage } from "@/pages/modul/cbt";
import { NotFoundPage } from "@/pages/not-found";

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path={ROUTES.home} element={<HomePage />} />
      <Route path={ROUTES.pricing} element={<PricingPage />} />
      <Route path={ROUTES.modulAbsensi} element={<ModulAbsensiPage />} />
      <Route path={ROUTES.modulJadwal} element={<ModulJadwalPage />} />
      <Route path={ROUTES.modulCBT} element={<ModulCBTPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);
