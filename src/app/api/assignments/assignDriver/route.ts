import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const { assignment_id, driver_id } = await req.json();
  
    try {
      // Check if the driver is already assigned to another van
      const existingAssignment = await prisma.assignment.findFirst({
        where: { driver_id },
      });
  
      if (existingAssignment) {
        throw new Error(`Driver with ID ${driver_id} is already assigned to another van`);
      }
  
      const assignment = await prisma.assignment.update({
        where: { id: assignment_id },
        data: { driver_id },
      });
  
      return NextResponse.json(assignment);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
  }