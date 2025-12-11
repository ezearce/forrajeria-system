"use client";

import { useEffect, useState } from "react";
import { getCajaDelDia, registrarMovimiento, cerrarCajaAuto, getCajaMovimientosDelDia } from "@/services/caja.service";

export function CajaHoy() {
  const [caja, setCaja] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [monto, setMonto] = useState("");
  const [detalle, setDetalle] = useState("");
  const [movimientosHoy, setMovimientosHoy] = useState<any[]>([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const data = await getCajaDelDia();
    setCaja(data);
    const movsHoy = await getCajaMovimientosDelDia();
    setMovimientosHoy(movsHoy);
    setLoading(false);
  }

  async function movimiento(tipo: "ingreso" | "egreso") {
    await registrarMovimiento({ tipo, monto: Number(monto), detalle });
    setMonto("");
    setDetalle("");
    await load();
  }

  async function cierre() {
    await cerrarCajaAuto();
    await load();
  }

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="bg-white shadow rounded-md p-4 space-y-4">
      <h2 className="text-xl font-semibold">Caja del día</h2>

      <div className="text-lg">
        Total actual:
        <span className="font-bold ml-2 text-emerald-700">${caja.total}</span>
      </div>

      {/* Formulario de nuevo movimiento */}
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

      {/* Historial del día */}
      <div className="pt-4 border-t">
        <h3 className="font-semibold mb-2">Movimientos del día</h3>
        {movimientosHoy.length === 0 ? (
          <p className="text-sm text-slate-500">No hay movimientos aún.</p>
        ) : (
          <ul className="space-y-2">
            {movimientosHoy.map((m: any) => (
              <li key={m.id} className="flex justify-between border rounded p-2">
                <div>
                  <span className="font-medium">{m.tipo === "ingreso" ? "+" : "-"}</span>
                  {m.descripcion && <span className="text-sm text-slate-500 ml-2">({m.descripcion})</span>}
                </div>
                <span className={m.tipo === "ingreso" ? "text-emerald-600 font-bold" : "text-red-600 font-bold"}>
                  ${Number(m.monto).toLocaleString("es-AR")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
