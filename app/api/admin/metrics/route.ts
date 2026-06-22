import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // 1. Total sales (all non-cancelled orders)
    const salesGroup = await prisma.order.aggregate({
      where: {
        status: {
          not: "CANCELLED",
        },
      },
      _sum: {
        total: true,
      },
    });
    const totalSales = salesGroup._sum.total || 0;

    // 2. Total orders count
    const totalOrders = await prisma.order.count();

    // 3. Low stock items (stock <= 3)
    const lowStockCount = await prisma.product.count({
      where: {
        stock: {
          lte: 3,
        },
      },
    });

    // 4. Status breakdown
    const orders = await prisma.order.findMany({
      select: {
        status: true,
      },
    });

    const statusCounts = orders.reduce((acc: any, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {
      PLACED: 0,
      CONFIRMED: 0,
      PACKED: 0,
      SHIPPED: 0,
      DELIVERED: 0,
      CANCELLED: 0,
    });

    // 5. Recent orders (last 5)
    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json({
      totalSales,
      totalOrders,
      lowStockCount,
      statusCounts,
      recentOrders,
    });
  } catch (error: any) {
    console.error("Error fetching admin metrics:", error);
    return NextResponse.json(
      { error: "Failed to fetch metrics", details: error.message },
      { status: 500 }
    );
  }
}
