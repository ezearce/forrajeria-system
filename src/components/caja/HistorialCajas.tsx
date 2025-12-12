"use client";

import { useEffect, useState } from "react";
import { getHistorialCajas } from "@/services/caja.service";

export function HistorialCajas({ refresh }: { refresh: number }) {
  const [items, setItems] = useState([]);
  const [openId, setOpenId] = useState<number | null>(null);

  useEffect(() => {
    load();
  }, [refresh]);

  async function load() {
    const data = await getHistorialCajas();
    setItems(data);
  }

  function formatFecha(fecha: string) {
    return new Date(fecha).toLocaleString("es-AR", {
      timeZone: "America/Argentina/Buenos_Aires",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="bg-white shadow rounded-md p-4 space-y-3">
      <h2 className="text-lg font-semibold">Historial de cajas</h2>

      {items.map((c: any) => (
        <div key={c.id} className="border rounded p-3">
          <div
            className="flex justify-between cursor-pointer"
            onClick={() => setOpenId(openId === c.id ? null : c.id)}
          >
            <span>{formatFecha(c.fecha)}</span>

            <span className="font-bold text-slate-700">
              ${Number(c.saldoDia).toLocaleString("es-AR")}
            </span>
          </div>

          {openId === c.id && (
            <div className="mt-3 bg-slate-100 rounded p-3 space-y-1">
              <h3 className="font-semibold text-sm">Movimientos del día</h3>

              {c.movimientos?.length === 0 && (
                <p className="text-sm text-gray-500">Sin movimientos</p>
              )}

              {c.movimientos?.map((m: any, idx: number) => (
                <div key={idx} className="flex justify-between border-b pb-1">
                  <span className="text-sm">
                    {m.tipo.toUpperCase()} • {m.descripcion ?? "-"}
                  </span>
                  <span className={m.tipo === "ingreso" ? "text-green-700" : "text-red-700"}>
                    {m.tipo === "ingreso" ? "+" : "-"}$
                    {Number(m.monto).toLocaleString("es-AR")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
