// src/services/productos.service.ts
export async function getProductos() {
  const res = await fetch("/api/productos");
  if (!res.ok) throw new Error("Error obteniendo productos");
  return res.json();
}

export async function createProducto(data: { nombre: string; precio: number }) {
  const res = await fetch("/api/productos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error creando producto");
  return res.json();
}
