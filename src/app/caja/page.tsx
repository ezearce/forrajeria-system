"use client";

import { CajaHoy } from "@/components/caja/CajaHoy";
import { HistorialCajas } from "@/components/caja/HistorialCajas";

export default function CajaPage() {
  return (
    <div className="space-y-6">
      <CajaHoy />
      <HistorialCajas />
    </div>
  );
}
