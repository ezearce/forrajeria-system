import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const movimientos = await prisma.cajaMovimiento.findMany({
    orderBy: { fecha: "desc" }
  });

  return NextResponse.json(movimientos);
}

export async function POST(req: Request) {
  const data = await req.json();

  const nuevo = await prisma.cajaMovimiento.create({
    data: {
      tipo: data.tipo,                // "ingreso" | "egreso"
      monto: data.monto,
      descripcion: data.descripcion ?? null,
    },
  });

  return NextResponse.json(nuevo);
}
