import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // update path if your prisma client is located elsewhere

// Force Next.js to treat this API route as dynamic, skipping static build-time generation
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { rank } = body;

    const matchedColleges = await prisma.college.findMany({
      where: {
        cutoffRank: {
          gte: Number(rank),
        },
      },
      orderBy: {
        cutoffRank: 'asc',
      },
    });

    return NextResponse.json(matchedColleges);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process rank prediction' }, { status: 500 });
  }
}