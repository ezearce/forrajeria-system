"use client";

import { useEffect, useState } from "react";
import { getMovimientos, crearDeuda, registrarPago } from "@/services/deudas.service";

export function ClienteDetalle({ clienteId, onMovimientosChange }: { clienteId: number; onMovimientosChange?: () => void }) {
  const [movimientos, setMovimientos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [monto, setMonto] = useState("");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    load();
  }, [clienteId]);

  async function load() {
    setLoading(true);
    const data = await getMovimientos(clienteId);
    setMovimientos(data);
    setLoading(false);
  }

  async function agregarDeuda() {
    await crearDeuda({ clienteId, monto: Number(monto), detalle: descripcion });
    setMonto("");
    setDescripcion("");
    load();
    onMovimientosChange?.();
  }

  async function pagar() {
    await registrarPago({ clienteId, monto: Number(monto) });
    setMonto("");
    setDescripcion("");
    load();
    onMovimientosChange?.(); 
  }

  // calcular saldo actual
  const saldo = movimientos.reduce((s, m) => s + (m.tipo === "deuda" ? -Number(m.monto) : Number(m.monto)), 0);

  return (
    <div className="space-y-4">
      {/* Card de Movimientos Actuales */}
      <div className="bg-white shadow rounded-md p-4">
        <h3 className="text-lg font-semibold mb-3">Movimientos</h3>

        <p className={`font-semibold mb-2 ${saldo < 0 ? "text-red-600" : "text-emerald-700"}`}>
          Saldo actual: ${saldo.toLocaleString()}
        </p>

        <div className="mb-3">
          <input
            className="border rounded px-3 py-2 w-full mb-2"
            placeholder="Monto"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
          />
          <input
            className="border rounded px-3 py-2 w-full mb-2"
            placeholder="Detalle (opcional)"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <button onClick={agregarDeuda} className="bg-red-600 text-white px-3 py-2 rounded">
            + Registrar deuda
          </button>
          <button onClick={pagar} className="bg-green-600 text-white px-3 py-2 rounded">
            Registrar pago
          </button>
        </div>
      </div>

      {/* Card de Historial */}
      <div className="bg-white shadow rounded-md p-4">
        <h3 className="text-lg font-semibold mb-3">Historial de Movimientos</h3>

        {loading ? (
          <p>Cargando historial...</p>
        ) : movimientos.length === 0 ? (
          <p className="text-slate-500">No hay movimientos registrados.</p>
        ) : (
          <ul className="space-y-2 max-h-96 overflow-y-auto">
            {movimientos
              .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()) // ordenar más reciente primero
              .map((m) => (
                <li key={m.id} className="border rounded p-3 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {m.tipo === "deuda" ? "Deuda" : "Pago"}
                    </span>
                    {m.descripcion && (
                      <span className="text-sm text-slate-500">({m.descripcion})</span>
                    )}
                    {/* Fecha del movimiento */}
                    <span className="text-xs text-slate-400">
                      {new Date(m.fecha).toLocaleString("es-AR", {
                        timeZone: "America/Argentina/Buenos_Aires",
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <span
                    className={`${
                      m.tipo === "deuda" ? "text-red-600" : "text-emerald-700"
                    } font-semibold`}
                  >
                    {m.tipo === "deuda" ? "-" : "+"}${Number(m.monto).toLocaleString()}
                  </span>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
