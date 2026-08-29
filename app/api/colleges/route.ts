import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // update import path if different

// Prevents Next.js from trying to statically pre-render this API route during build time
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const colleges = await prisma.college.findMany({
      include: {
        placements: true,
        reviews: true,
      },
    });
    return NextResponse.json(colleges);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch colleges' },
      { status: 500 }
    );
  }
}