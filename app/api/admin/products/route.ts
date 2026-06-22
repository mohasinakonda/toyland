import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Helper to slugify a string
function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // remove non-word chars
    .replace(/[\s_-]+/g, "-") // replace spaces and double hyphens with single hyphen
    .replace(/^-+|-+$/g, ""); // trim leading/trailing hyphens
}

// POST: Create a new product
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, price, stock, ageGroup, categoryId, thumbnail, benefits, images } = body;

    if (!name || !description || price === undefined || stock === undefined || !ageGroup || !categoryId || !thumbnail) {
      return NextResponse.json({ error: "Missing required product fields" }, { status: 400 });
    }

    const slugBase = slugify(name);
    // Ensure slug is unique
    let slug = slugBase;
    let count = 1;
    while (true) {
      const existing = await prisma.product.findUnique({
        where: { slug },
      });
      if (!existing) break;
      slug = `${slugBase}-${count}`;
      count++;
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        ageGroup,
        categoryId,
        thumbnail,
        benefits: benefits || "",
      },
    });

    // Create ProductImage records for all uploaded images
    const imageUrls: string[] = Array.isArray(images) && images.length > 0 ? images : [thumbnail];
    for (const imgUrl of imageUrls) {
      await prisma.productImage.create({
        data: {
          productId: newProduct.id,
          imageUrl: imgUrl,
        },
      });
    }

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error: any) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product", details: error.message },
      { status: 500 }
    );
  }
}

// PUT: Update an existing product
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, description, price, stock, ageGroup, categoryId, thumbnail, benefits, images } = body;

    if (!id || !name || !description || price === undefined || stock === undefined || !ageGroup || !categoryId || !thumbnail) {
      return NextResponse.json({ error: "Missing required fields for update" }, { status: 400 });
    }

    // Check if product exists
    const existing = await prisma.product.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Update slug if name changed
    let slug = existing.slug;
    if (existing.name !== name) {
      const slugBase = slugify(name);
      slug = slugBase;
      let count = 1;
      while (true) {
        const checkDuplicate = await prisma.product.findFirst({
          where: { slug, id: { not: id } },
        });
        if (!checkDuplicate) break;
        slug = `${slugBase}-${count}`;
        count++;
      }
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        ageGroup,
        categoryId,
        thumbnail,
        benefits: benefits || "",
      },
    });

    // Sync ProductImage records if images array is provided
    if (Array.isArray(images)) {
      // Delete old images and replace with new set
      await prisma.productImage.deleteMany({
        where: { productId: id },
      });
      for (const imgUrl of images) {
        await prisma.productImage.create({
          data: {
            productId: id,
            imageUrl: imgUrl,
          },
        });
      }
    }

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error: any) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product", details: error.message },
      { status: 500 }
    );
  }
}

// DELETE: Delete a product
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product", details: error.message },
      { status: 500 }
    );
  }
}
