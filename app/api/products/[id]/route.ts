import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Update product (full update)
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const body = await request.json();
    const { name, price, stock, imageUrl } = body;
    const params = await context.params;
    const productId = parseInt(params.id);

    const priceNum = typeof price === "string" ? parseFloat(price) : price;
    const stockNum = typeof stock === "string" ? parseInt(stock) : stock;

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        name: name.toString(),
        price: priceNum,
        stock: stockNum,
        imageUrl:
          imageUrl && imageUrl.trim() !== ""
            ? imageUrl
            : "/images/products/default.jpg",
      },
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
  }
}

// Update product stock only
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
  }
}

// Delete product
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const params = await context.params;
    const productId = parseInt(params.id);

    await prisma.product.delete({
      where: { id: productId },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Product deleted successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete product",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
