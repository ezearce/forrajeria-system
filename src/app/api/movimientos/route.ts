import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const movs = await prisma.movCliente.findMany({
    include: {
      cliente: true,
    },
  });

  return NextResponse.json(movs);
}

export async function POST(req: Request) {
  const data = await req.json();

  const nuevo = await prisma.movCliente.create({
    data: {
      tipo: data.tipo,       // ingreso / egreso
      monto: data.monto,
      descripcion: data.descripcion ?? null,
      clienteId: data.clienteId,
    },
  });

  return NextResponse.json(nuevo);
}
