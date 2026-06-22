import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Cleaning up database...");
  await prisma.orderStatusHistory.deleteMany({});
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.productImage.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});

  console.log("Seeding categories...");
  const categories = [
    {
      name: "Action Figures & Dolls",
      slug: "action-figures",
      icon: "Sparkles",
    },
    {
      name: "Building & Blocks",
      slug: "building-blocks",
      icon: "Grid",
    },
    {
      name: "Creative Arts & Crafts",
      slug: "creative-crafts",
      icon: "Palette",
    },
    {
      name: "Educational & STEM",
      slug: "educational-stem",
      icon: "Brain",
    },
    {
      name: "Active Outdoors",
      slug: "active-outdoors",
      icon: "Bicycle",
    },
  ];

  const categoryMap: { [key: string]: string } = {};

  for (const cat of categories) {
    const created = await prisma.category.create({
      data: cat,
    });
    categoryMap[cat.slug] = created.id;
  }

  console.log("Seeding products...");
  const products = [
    {
      name: "Bopo the Space Dino",
      slug: "bopo-space-dino",
      description: "A lovable soft plush toy space dinosaur with glowing stars on its back. Perfect for bedtime hugs and outer space adventures! Made with organic hypoallergenic cotton.",
      price: 19.99,
      stock: 15,
      ageGroup: "3-5",
      categoryId: categoryMap["action-figures"],
      thumbnail: "/toys/space-dino.webp",
      benefits: "Emotional Security, Imaginative Play, Sensory Stimulation",
      images: [
        "/toys/space-dino.webp",
        "/toys/space-dino-back.webp",
      ],
    },
    {
      name: "Rainbow Stacking Blocks",
      slug: "rainbow-stacking-blocks",
      description: "Set of 10 solid wooden blocks in beautiful pastel colors. Helps toddlers build coordination, spatial skills, and colorful towers. Uses non-toxic water-based paints.",
      price: 24.99,
      stock: 8,
      ageGroup: "3-5",
      categoryId: categoryMap["building-blocks"],
      thumbnail: "/toys/stacking-blocks.webp",
      benefits: "Motor Skills, Spatial Awareness, Color Recognition",
      images: [
        "/toys/stacking-blocks.webp",
        "/toys/stacking-blocks-detail.webp",
      ],
    },
    {
      name: "Mini Artist Clay Set",
      slug: "mini-artist-clay-set",
      description: "Non-toxic, air-dry clay set with 12 vibrant colors and sculpting tools. Easy to shape, mold, and dry without oven baking. Let your child's creativity take shape!",
      price: 14.99,
      stock: 20,
      ageGroup: "6-8",
      categoryId: categoryMap["creative-crafts"],
      thumbnail: "/toys/clay-set.webp",
      benefits: "Fine Motor Skills, Creative Expression, Stress Relief",
      images: [
        "/toys/clay-set.webp",
      ],
    },
    {
      name: "Robot Coding Buddy",
      slug: "robot-coding-buddy",
      description: "An interactive smart robot that teaches basic coding concepts through screen-free cards, physical maps, and fun sound responses. Helps develop early logical thinking.",
      price: 49.99,
      stock: 5,
      ageGroup: "6-8",
      categoryId: categoryMap["educational-stem"],
      thumbnail: "/toys/robot-buddy.webp",
      benefits: "Logical Thinking, Problem Solving, Introduction to Tech",
      images: [
        "/toys/robot-buddy.webp",
        "/toys/robot-buddy-box.webp",
      ],
    },
    {
      name: "Explorer's Telescope Kit",
      slug: "explorers-telescope-kit",
      description: "Lightweight, easy-to-use telescope with 30x magnification, custom tripod, and sky explorer booklet. Perfect for budding astronomers to explore the moon and stars.",
      price: 39.99,
      stock: 10,
      ageGroup: "9-10",
      categoryId: categoryMap["educational-stem"],
      thumbnail: "/toys/telescope-kit.webp",
      benefits: "Scientific Inquiry, Curiosity, Patience & Concentration",
      images: [
        "/toys/telescope-kit.webp",
      ],
    },
    {
      name: "Turbo Rocket Launcher",
      slug: "turbo-rocket-launcher",
      description: "Stomp-powered outdoor rocket launcher that shoots soft foam rockets up to 100 feet in the air! Fully kid-powered, no batteries required. Fun and active play for sunny days.",
      price: 18.50,
      stock: 12,
      ageGroup: "6-8",
      categoryId: categoryMap["active-outdoors"],
      thumbnail: "/toys/rocket-launcher.webp",
      benefits: "Active Play, Physics Concepts, Coordination",
      images: [
        "/toys/rocket-launcher.webp",
      ],
    },
    {
      name: "Super Craft Beads Studio",
      slug: "super-craft-beads-studio",
      description: "Over 500 colourful glass and wooden beads with colorful elastic threads and safety clasps. Design customized friendship bracelets, keychains, and necklaces.",
      price: 12.99,
      stock: 18,
      ageGroup: "9-10",
      categoryId: categoryMap["creative-crafts"],
      thumbnail: "/toys/craft-beads.webp",
      benefits: "Focus & Patience, Design Principles, Fine Motor Skills",
      images: [
        "/toys/craft-beads.webp",
      ],
    },
    {
      name: "Magical Magnetic Tiles",
      slug: "magical-magnetic-tiles",
      description: "3D magnetic building set with 48 translucent geometric shapes. Design castles, rockets, and spheres. Watch creations glow beautifully when held up to the light!",
      price: 34.99,
      stock: 14,
      ageGroup: "3-5",
      categoryId: categoryMap["building-blocks"],
      thumbnail: "/toys/magnetic-tiles.webp",
      benefits: "Geometry & Math, Hand-Eye Coordination, Teamwork",
      images: [
        "/toys/magnetic-tiles.webp",
      ],
    },
  ];

  for (const prod of products) {
    const { images, ...productData } = prod;
    const createdProduct = await prisma.product.create({
      data: productData,
    });

    for (const imgUrl of images) {
      await prisma.productImage.create({
        data: {
          productId: createdProduct.id,
          imageUrl: imgUrl,
        },
      });
    }
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
