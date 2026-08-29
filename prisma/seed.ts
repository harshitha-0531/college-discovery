import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.review.deleteMany()
  await prisma.placement.deleteMany()
  await prisma.college.deleteMany()

  await prisma.college.create({
    data: {
      name: "IIT Hyderabad",
      location: "Sangareddy, Telangana",
      annualFee: 220000,
      rating: 4.8,
      cutoffRank: 1500,
      examName: "JEE Main",
      overview: "Premier technical institute known for research innovation.",
      placements: {
        create: { avgPackage: 20.4, highestPkg: 63.0, placementPct: 92.5 }
      },
      reviews: {
        create: [{ author: "Rahul M.", rating: 5, comment: "Excellent research culture." }]
      }
    }
  })

  console.log("Database seeded successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })