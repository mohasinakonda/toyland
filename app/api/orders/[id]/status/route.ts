import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const validStatuses = ["PLACED", "CONFIRMED", "PACKED", "SHIPPED", "DELIVERED", "CANCELLED"];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` },
        { status: 400 }
      );
    }

    // Update order status and append status history in a transaction
    const updatedOrder = await prisma.$transaction(async (tx) => {
      // Confirm order exists
      const existing = await tx.order.findUnique({
        where: { id },
      });

      if (!existing) {
        throw new Error("Order not found");
      }

      // Update status
      const order = await tx.order.update({
        where: { id },
        data: { status },
      });

      // Add to status history
      await tx.orderStatusHistory.create({
        data: {
          orderId: id,
          status,
        },
      });

      return order;
    });

    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error: any) {
    console.error("Error updating order status:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update order status" },
      { status: 400 }
    );
  }
}
