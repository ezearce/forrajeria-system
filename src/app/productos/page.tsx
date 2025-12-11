"use client";

import { useState } from "react";
import { ProductosList } from "@/components/productos/ProductosList";
import { ProductoForm } from "@/components/productos/ProductoForm";

export default function ProductosPage() {
  const [showForm, setShowForm] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  function refresh() {
    setReloadKey(reloadKey + 1);
    setShowForm(false);
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Lista de precios</h2>
        <button
          className="bg-emerald-600 text-white px-3 py-2 rounded"
          onClick={() => setShowForm(true)}
        >
          + Nuevo producto
        </button>
      </div>

      {showForm && <ProductoForm onCreated={refresh} onCancel={() => setShowForm(false)} />}

      {/* Forzar recarga del listado */}
      <ProductosList key={reloadKey} />
    </div>
  );
}
