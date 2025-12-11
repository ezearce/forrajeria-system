"use client";

import { createProducto } from "@/services/productos.service";
import { useState } from "react";

export function ProductoForm({ onCreated, onCancel }: { onCreated: () => void; onCancel: () => void }) {
  const [form, setForm] = useState({ nombre: "", precio: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await createProducto({
      nombre: form.nombre.trim(),
      precio: Number(form.precio),
    });

    setForm({ nombre: "", precio: "" });
    onCreated();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded-md">
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
          Crear
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
