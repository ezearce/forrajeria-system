"use client"; 

import { useState } from "react";
import { ClienteForm } from "./ClienteForm";

export type Cliente = { id: number; nombre: string; telefono?: string; movimientos?: any[] };

export function ClientesList({
  clientes,
  onSelect,
  onReload,
}: {
  clientes: Cliente[];
  onSelect: (id: number) => void;
  onReload: () => void; // función que recarga clientes desde DeudasPage
}) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="bg-white shadow rounded-md p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Clientes</h3>
        <button
          className="bg-emerald-600 text-white px-3 py-1 rounded"
          onClick={() => setShowForm(true)}
        >
          + Nuevo Cliente
        </button>
      </div>

      {showForm && (
        <ClienteForm
          onCreated={() => { onReload(); setShowForm(false); }}
          onCancel={() => setShowForm(false)}
        />
      )}

      <ul className="space-y-2">
        {clientes.map(c => {
          const saldo = (c.movimientos || []).reduce(
            (s: number, m: any) => s + (m.tipo === "deuda" ? -Number(m.monto) : Number(m.monto)),
            0
          );

          return (
            <li
              key={c.id}
              onClick={() => onSelect(c.id)}
              className="border rounded p-3 cursor-pointer hover:bg-slate-100 flex justify-between items-center"
            >
              <div>
                <span className="font-medium">{c.nombre}</span>
                {c.telefono && <span className="text-sm text-slate-500 ml-2">({c.telefono})</span>}
              </div>
              <span className={`${saldo < 0 ? "text-red-600" : "text-emerald-700"} font-semibold`}>
                {saldo.toLocaleString()}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
