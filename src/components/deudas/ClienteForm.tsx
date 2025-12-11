import { useState } from "react";
import { createCliente } from "@/services/deudas.service";

export function ClienteForm({ onCreated, onCancel }: { onCreated: () => void; onCancel: () => void }) {
  const [form, setForm] = useState({ nombre: "", telefono: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nombre.trim()) return alert("El nombre es obligatorio");

    await createCliente({
      nombre: form.nombre.trim(),
      telefono: form.telefono.trim() || null,
    });

    setForm({ nombre: "", telefono: "" });
    onCreated();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 shadow rounded-md">
      <div>
        <label className="text-sm font-medium">Nombre</label>
        <input
          className="border rounded w-full px-3 py-2"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        />
      </div>

      <div>
        <label className="text-sm font-medium">Teléfono</label>
        <input
          className="border rounded w-full px-3 py-2"
          value={form.telefono}
          onChange={(e) => setForm({ ...form, telefono: e.target.value })}
        />
      </div>

      <div className="flex gap-2">
        <button type="submit" className="bg-emerald-600 text-white px-3 py-2 rounded">
          Crear
        </button>
        <button type="button" className="bg-gray-400 text-white px-3 py-2 rounded" onClick={onCancel}>
          Cerrar
        </button>
      </div>
    </form>
  );
}
