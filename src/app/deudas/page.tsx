"use client";

import { useState, useEffect } from "react";
import { ClientesList } from "@/components/deudas/ClientesList";
import { ClienteDetalle } from "@/components/deudas/ClienteDetalle";
import { getClientes } from "@/services/deudas.service";

export default function DeudasPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [clientes, setClientes] = useState<any[]>([]);

  // Función para cargar clientes
  async function loadClientes() {
    const data = await getClientes();
    setClientes(data);
  }

  useEffect(() => {
    loadClientes();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-1">
        <ClientesList
            clientes={clientes}
            selectedId={selected} 
            onSelect={setSelected}
            onReload={loadClientes} 
        />
      </div>

      <div className="md:col-span-2">
        {selected ? (
          <ClienteDetalle
            clienteId={selected}
            onMovimientosChange={loadClientes} // <-- aquí propagamos actualización
          />
        ) : (
          <div className="text-center text-slate-500 p-6 bg-white rounded shadow">
            Seleccioná un cliente para ver detalles.
          </div>
        )}
      </div>
    </div>
  );
}
