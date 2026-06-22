import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const categorySlug = searchParams.get("category") || "";
    const ageGroup = searchParams.get("ageGroup") || "";
    const maxPrice = searchParams.get("price") ? parseFloat(searchParams.get("price")!) : null;

    // Build Prisma query filter
    const whereClause: any = {};

    if (search) {
      whereClause.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
      ];
    }

    if (categorySlug) {
      whereClause.category = {
        slug: categorySlug,
      };
    }

    if (ageGroup) {
      whereClause.ageGroup = ageGroup;
    }

    if (maxPrice !== null && !isNaN(maxPrice)) {
      whereClause.price = {
        lte: maxPrice,
      };
    }

    // Fetch products matching query and all categories for filters
    const [products, categories] = await Promise.all([
      prisma.product.findMany({
        where: whereClause,
        include: {
          category: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.category.findMany({
        orderBy: {
          name: "asc",
        },
      }),
    ]);

    return NextResponse.json({ products, categories });
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products", details: error.message },
      { status: 500 }
    );
  }
}
