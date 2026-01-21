import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: products,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch products",
      },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, price, stock, imageUrl } = body;

    console.log("Received data:", { name, price, stock, imageUrl });

    // Validasi input
    if (!name || price === undefined || stock === undefined) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, price, and stock are required",
        },
        { status: 400 },
      );
    }

    // Konversi ke number jika perlu
    const priceNum = typeof price === "string" ? parseFloat(price) : price;
    const stockNum = typeof stock === "string" ? parseInt(stock) : stock;

    const newProduct = await prisma.product.create({
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
        data: newProduct,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create product",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
