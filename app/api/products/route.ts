import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        id: 'asc'
      }
    });

    return NextResponse.json({
      success: true,
      data: products
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch products'
    }, { status: 500 });

  } finally {
    await prisma.$disconnect();
  }
}