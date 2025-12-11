"use client";

import { useEffect, useState } from "react";
import { getProductos } from "@/services/productos.service";

type Producto = {
  id: number;
  nombre: string;
  precio: number;
  updatedAt?: string;
};

export function ProductosList() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const data = await getProductos();
    setProductos(data);
    setLoading(false);
  }

  const filtered = productos.filter((p) =>
    p.nombre.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="rounded-lg bg-white shadow p-4">
      <div className="flex justify-between mb-4">
        <div className="text-slate-600">
          Productos: <span className="font-medium">{filtered.length}</span>
        </div>

        <input
          placeholder="Buscar..."
          className="border rounded-md px-3 py-2 text-sm"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="py-20 text-center">Cargando...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((p) => (
            <div key={p.id} className="border rounded p-3 bg-white">
              <div className="flex justify-between">
                <h3>{p.nombre}</h3>
                <div className="text-emerald-600 font-bold">${p.precio}</div>
              </div>
              <div className="text-xs text-slate-500 mt-2">
                {p.updatedAt ? new Date(p.updatedAt).toLocaleString() : "-"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
