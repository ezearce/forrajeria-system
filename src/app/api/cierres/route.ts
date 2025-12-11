import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const cierres = await prisma.cierreCaja.findMany({
    orderBy: { fecha: "desc" }
  });

  return NextResponse.json(cierres);
}

export async function POST(req: Request) {
  const data = await req.json();

  const nuevo = await prisma.cierreCaja.create({
    data: {
      fecha: new Date(data.fecha),
      totalIngresos: data.totalIngresos,
      totalEgresos: data.totalEgresos,
      saldoDia: data.saldoDia,
      observaciones: data.observaciones ?? null,
    },
  });

  return NextResponse.json(nuevo);
}
