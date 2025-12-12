import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// PATCH /api/productos/:id
export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params; // ← FIX
  const parsed = Number(id);

  if (isNaN(parsed)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  const body = await req.json();

  const updated = await prisma.producto.update({
    where: { id: parsed },
    data: {
      nombre: body.nombre,
      precio: body.precio,
    },
  });

  return NextResponse.json(updated);
}

// DELETE /api/productos/:id
export async function DELETE(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params; // ← FIX
  const parsed = Number(id);

  if (isNaN(parsed)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  try {
    await prisma.producto.delete({
      where: { id: parsed },
    });

    return NextResponse.json({ message: "Producto eliminado" });
  } catch (err) {
    console.error("ERROR DELETE PRODUCTO:", err);
    return NextResponse.json(
      { error: "No se pudo eliminar" },
      { status: 500 }
    );
  }
}
