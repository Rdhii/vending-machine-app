import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Update product stock
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { stock } = await request.json();
    const params = await context.params;
    const productId = parseInt(params.id);

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: { stock },
    });

    return NextResponse.json(
      {
        success: true,
        data: updatedProduct,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update product",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
