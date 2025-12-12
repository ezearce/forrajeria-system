import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const hoy = new Date();
    const todayISO = hoy.toISOString().slice(0, 10);

    // 1) Obtener movimientos del día
    const movimientos = await prisma.cajaMovimiento.findMany({
      where: {
        fecha: {
          gte: new Date(todayISO + "T00:00:00"),
          lt: new Date(todayISO + "T23:59:59"),
        },
      },
      orderBy: { fecha: "asc" },
    });

    const totalIngresos = movimientos
      .filter(m => m.tipo === "ingreso")
      .reduce((s, x) => s + Number(x.monto), 0);

    const totalEgresos = movimientos
      .filter(m => m.tipo === "egreso")
      .reduce((s, x) => s + Number(x.monto), 0);

    const saldoDia = totalIngresos - totalEgresos;

    // 2) Crear cierre
    await prisma.cierreCaja.create({
      data: {
        fecha: new Date(),
        totalIngresos,
        totalEgresos,
        saldoDia,
        observaciones: null,
        movimientos, // JSONB
      },
    });

    // 3) Borrar movimientos del día
    await prisma.cajaMovimiento.deleteMany({
      where: {
        fecha: {
          gte: new Date(todayISO + "T00:00:00"),
          lt: new Date(todayISO + "T23:59:59"),
        },
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("ERROR CERRANDO CAJA:", err);
    return NextResponse.json(
      { error: "No se pudo cerrar la caja" },
      { status: 500 }
    );
  }
}
