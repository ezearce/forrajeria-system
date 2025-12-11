// src/services/caja.service.ts
export async function getCajaMovimientos() {
  const res = await fetch("/api/caja", { cache: "no-store" });
  if (!res.ok) throw new Error("Error loading caja movimientos");
  return res.json(); // devuelve todos los movimientos
}

// Devuelve resumen del día (filtra por fecha local)
export async function getCajaDelDia() {
  const movs: any[] = await getCajaMovimientos();
  const today = new Date().toISOString().slice(0, 10);
  const hoy = movs.filter(m => new Date(m.fecha).toISOString().slice(0,10) === today);
  const totalIngresos = hoy.filter(m => m.tipo === "ingreso").reduce((s, x) => s + Number(x.monto), 0);
  const totalEgresos = hoy.filter(m => m.tipo === "egreso").reduce((s, x) => s + Number(x.monto), 0);
  return { movimientos: hoy, totalIngresos, totalEgresos, total: totalIngresos - totalEgresos };
}

export async function registrarMovimiento(data: { tipo: "ingreso" | "egreso"; monto: number; detalle?: string }) {
  const res = await fetch("/api/caja", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tipo: data.tipo, monto: data.monto, descripcion: data.detalle ?? null }),
  });
  if (!res.ok) throw new Error("Error registrando movimiento");
  return res.json();
}

export async function getHistorialCajas() {
  const res = await fetch("/api/cierres", { cache: "no-store" });
  if (!res.ok) throw new Error("Error loading historial");
  return res.json();
}

export async function cerrarCajaAuto() {
  // Construye los totales desde movimientos y manda POST a /api/cierres
  const { totalIngresos, totalEgresos, total } = await getCajaDelDia();
  const payload = {
    fecha: new Date().toISOString().slice(0,10),
    totalIngresos,
    totalEgresos,
    saldoDia: total,
    observaciones: null
  };
  const res = await fetch("/api/cierres", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Error cerrando caja");
  return res.json();
}
