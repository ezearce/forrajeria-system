// src/services/deudas.service.ts
export async function getClientes() {
  const res = await fetch("/api/clientes", { cache: "no-store" });
  if (!res.ok) throw new Error("Error loading clientes");
  return res.json();
}

// obtiene movimientos y los filtra por clienteId (backend devuelve todos)
export async function getMovimientos(clienteId: number) {
  const res = await fetch("/api/movimientos", { cache: "no-store" });
  if (!res.ok) throw new Error("Error loading movimientos");
  const all = await res.json();
  return all.filter((m: any) => Number(m.clienteId) === Number(clienteId));
}

export async function crearDeuda(data: {
  clienteId: number;
  monto: number;
  detalle?: string;
}) {
  const res = await fetch("/api/movimientos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tipo: "deuda",
      monto: data.monto,
      descripcion: data.detalle ?? null,
      clienteId: data.clienteId,
    }),
  });
  if (!res.ok) throw new Error("Error creando deuda");
  return res.json();
}

export async function registrarPago(data: { clienteId: number; monto: number }) {
  const res = await fetch("/api/movimientos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tipo: "pago",
      monto: data.monto,
      descripcion: null,
      clienteId: data.clienteId,
    }),
  });
  if (!res.ok) throw new Error("Error registrando pago");
  return res.json();
}

export async function createCliente(data: { nombre: string; telefono?: string | null }) {
  const res = await fetch("/api/clientes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error creando cliente");
  return res.json();
}

