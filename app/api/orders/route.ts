import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Retrieve orders by phone number for tracking
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get("phone") || "";

    if (!phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    // Clean phone number from whitespace/hyphens for matching if needed,
    // but we can query it directly
    const orders = await prisma.order.findMany({
      where: {
        phone: phone.trim(),
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        statusHistory: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(orders);
  } catch (error: any) {
    console.error("Error retrieving orders:", error);
    return NextResponse.json(
      { error: "Failed to retrieve orders", details: error.message },
      { status: 500 }
    );
  }
}

// POST: Create a new order (registration-free)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, phone, address, items } = body;

    // Validation
    if (!customerName || !phone || !address || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Missing required order fields (customerName, phone, address, items)" },
        { status: 400 }
      );
    }

    // Generate random 6-digit tracking code, e.g. TP-492810
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    const trackingId = `TP-${randomCode}`;

    // Perform transaction
    const result = await prisma.$transaction(async (tx) => {
      let orderTotal = 0;
      const orderItemsData = [];

      // Check stock and calculate total
      for (const item of items) {
        const { productId, quantity } = item;
        if (!productId || typeof quantity !== "number" || quantity <= 0) {
          throw new Error("Invalid item format in request");
        }

        const product = await tx.product.findUnique({
          where: { id: productId },
        });

        if (!product) {
          throw new Error(`Product not found: ${productId}`);
        }

        if (product.stock < quantity) {
          throw new Error(`Insufficient stock for product "${product.name}". Available: ${product.stock}`);
        }

        // Deduct stock
        await tx.product.update({
          where: { id: productId },
          data: {
            stock: {
              decrement: quantity,
            },
          },
        });

        const itemSubtotal = product.price * quantity;
        orderTotal += itemSubtotal;

        orderItemsData.push({
          productId,
          quantity,
          price: product.price,
        });
      }

      // Create Order
      const newOrder = await tx.order.create({
        data: {
          trackingId,
          customerName: customerName.trim(),
          phone: phone.trim(),
          address: address.trim(),
          status: "PLACED",
          total: orderTotal,
        },
      });

      // Create Order Items
      for (const itemData of orderItemsData) {
        await tx.orderItem.create({
          data: {
            orderId: newOrder.id,
            productId: itemData.productId,
            quantity: itemData.quantity,
            price: itemData.price,
          },
        });
      }

      // Create OrderStatusHistory entry
      await tx.orderStatusHistory.create({
        data: {
          orderId: newOrder.id,
          status: "PLACED",
        },
      });

      return newOrder;
    });

    return NextResponse.json({
      success: true,
      orderId: result.id,
      trackingId: result.trackingId,
      total: result.total,
    });
  } catch (error: any) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: error.message || "Failed to place order" },
      { status: 400 }
    );
  }
}
