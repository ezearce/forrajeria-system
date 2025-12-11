import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const clientes = await prisma.cliente.findMany({
    include: {
      movimientos: true,
    },
  });

  return NextResponse.json(clientes);
}

export async function POST(req: Request) {
  const data = await req.json();

  const nuevo = await prisma.cliente.create({
    data: {
      nombre: data.nombre,
      telefono: data.telefono ?? null,
    },
  });

  return NextResponse.json(nuevo);
}
