"use client";

import { useEffect, useState } from "react";
import { getProductos, deleteProducto } from "@/services/productos.service";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { EditForm } from "@/components/productos/EditForm";

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

  const [editing, setEditing] = useState<Producto | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const data = await getProductos();
    setProductos(data);
    setLoading(false);
  }

  async function eliminar() {
    if (!confirmDeleteId) return;

    await deleteProducto(confirmDeleteId);
    setConfirmDeleteId(null);
    load();
  }

  const filtered = productos.filter((p) =>
    p.nombre.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="rounded-lg bg-white shadow p-4">

      {/* Popup confirmación */}
      <ConfirmModal
        open={confirmDeleteId !== null}
        title="Eliminar producto"
        message="¿Seguro que querés eliminar este producto?"
        onCancel={() => setConfirmDeleteId(null)}
        onConfirm={eliminar}
      />

      {/* Formulario de edición */}
      {editing && (
        <EditForm
          modo="editar"
          producto={editing}
          onSuccess={() => {
            setEditing(null);
            load();
          }}
          onCancel={() => setEditing(null)}
        />
      )}

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
                <h3 className="font-semibold">{p.nombre}</h3>
                <div className="text-emerald-600 font-bold">${p.precio}</div>
              </div>

              <div className="text-xs text-slate-500 mt-1">
                {p.updatedAt ? new Date(p.updatedAt).toLocaleString() : "-"}
              </div>

              {/* BOTONES */}
              <div className="flex gap-3 mt-3">
                <button
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => setEditing(p)}
                >
                  <FiEdit size={18} />
                </button>

                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => setConfirmDeleteId(p.id)}
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
