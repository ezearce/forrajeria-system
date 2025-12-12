"use client";

import { useState } from "react";
import { CajaHoy } from "@/components/caja/CajaHoy";
import { HistorialCajas } from "@/components/caja/HistorialCajas";

export default function CajaPage() {
  const [refreshHistorial, setRefreshHistorial] = useState(0);

  return (
    <div className="space-y-6">
      <CajaHoy onCerrarCaja={() => setRefreshHistorial(prev => prev + 1)} />
      <HistorialCajas refresh={refreshHistorial} />
    </div>
  );
}
