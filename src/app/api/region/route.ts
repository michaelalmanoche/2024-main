import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const regions = await prisma.region.findMany(); // Ensure 'region' matches your model
    console.log('Fetched regions:', regions); // Log for debugging
    return NextResponse.json(regions);
  } catch (error) {
    console.error('Error fetching regions:', error); // Log the error for debugging
    return NextResponse.json({ error: 'Unable to fetch regions' }, { status: 500 });
  }
}
