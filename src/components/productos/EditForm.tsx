"use client";

import { createProducto, updateProducto } from "@/services/productos.service";
import { useState, useEffect } from "react";

type Props = {
  modo: "crear" | "editar";
  producto?: { id: number; nombre: string; precio: number };
  onSuccess: () => void;
  onCancel: () => void;
};

export function EditForm({ modo, producto, onSuccess, onCancel }: Props) {
  const [form, setForm] = useState({ nombre: "", precio: "" });

  useEffect(() => {
    if (modo === "editar" && producto) {
      setForm({
        nombre: producto.nombre,
        precio: String(producto.precio),
      });
    }
  }, [modo, producto]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (modo === "crear") {
      await createProducto({
        nombre: form.nombre.trim(),
        precio: Number(form.precio),
      });
    } else if (modo === "editar" && producto) {
      await updateProducto(producto.id, {
        nombre: form.nombre.trim(),
        precio: Number(form.precio),
      });
    }

    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded-md">
      <h2 className="text-lg font-semibold">
        {modo === "crear" ? "Nuevo producto" : "Editar producto"}
      </h2>

      <div>
        <label className="text-sm font-medium">Nombre</label>
        <input
          className="border rounded w-full px-3 py-2"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        />
      </div>

      <div>
        <label className="text-sm font-medium">Precio</label>
        <input
          type="number"
          className="border rounded w-full px-3 py-2"
          value={form.precio}
          onChange={(e) => setForm({ ...form, precio: e.target.value })}
        />
      </div>

      <div className="flex gap-2">
        <button type="submit" className="bg-emerald-600 text-white px-3 py-2 rounded">
          {modo === "crear" ? "Crear" : "Guardar cambios"}
        </button>
        <button
          type="button"
          className="bg-red-400 text-white px-3 py-2 rounded"
          onClick={onCancel}
        >
          Cerrar
        </button>
      </div>
    </form>
  );
}
