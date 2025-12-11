"use client";

import { useEffect, useState } from "react";
import { getCajaDelDia, registrarMovimiento, cerrarCajaAuto } from "@/services/caja.service";

export function CajaHoy() {
  const [caja, setCaja] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [monto, setMonto] = useState("");
  const [detalle, setDetalle] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getCajaDelDia();
    setCaja(data);
    setLoading(false);
  }

  async function movimiento(tipo: "ingreso" | "egreso") {
    await registrarMovimiento({ tipo, monto: Number(monto), detalle });
    setMonto("");
    setDetalle("");
    load();
  }

  async function cierre() {
    await cerrarCajaAuto();
    load();
  }

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="bg-white shadow rounded-md p-4 space-y-4">
      <h2 className="text-xl font-semibold">Caja del día</h2>

      <div className="text-lg">
        Total actual:
        <span className="font-bold ml-2 text-emerald-700">${caja.total}</span>
      </div>

      <div className="pt-4 border-t">
        <input
          className="border rounded px-3 py-2 w-full mb-2"
          placeholder="Monto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
        />

        <input
          className="border rounded px-3 py-2 w-full mb-3"
          placeholder="Detalle (opcional)"
          value={detalle}
          onChange={(e) => setDetalle(e.target.value)}
        />

        <div className="flex gap-2">
          <button onClick={() => movimiento("ingreso")} className="bg-emerald-600 text-white px-3 py-2 rounded">+ Ingreso</button>
          <button onClick={() => movimiento("egreso")} className="bg-red-600 text-white px-3 py-2 rounded">- Egreso</button>
        </div>

        <button onClick={cierre} className="mt-3 w-full bg-slate-700 text-white px-3 py-2 rounded">
          Cerrar día
        </button>
      </div>
    </div>
  );
}
