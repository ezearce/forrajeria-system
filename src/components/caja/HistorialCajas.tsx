"use client";

import { useEffect, useState } from "react";
import { getHistorialCajas } from "@/services/caja.service";

export function HistorialCajas() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getHistorialCajas();
    setItems(data);
  }

  return (
    <div className="bg-white shadow rounded-md p-4 space-y-3">
      <h2 className="text-lg font-semibold">Historial de cajas</h2>

      {items.map((c: any) => (
        <div key={c.id} className="border rounded p-3 flex justify-between">
          <span>{c.fecha}</span>
          <span className="font-bold text-slate-700">
            ${Number(c.saldoDia).toLocaleString("es-AR")}
            </span>
        </div>
      ))}
    </div>
  );
}
