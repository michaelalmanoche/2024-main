import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop(); // Extract the ID from the URL

  if (!id) {
    return NextResponse.json({ message: 'ID is required' }, { status: 400 });
  }

  try {
    const operator = await prisma.operator.findUnique({
      where: { id: Number(id) },
    });

    if (operator) {
      return NextResponse.json(operator);
    } else {
      return NextResponse.json({ message: 'Operator not found' }, { status: 404 });
    }
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to retrieve operator', error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop(); // Extract the ID from the URL

  if (!id) {
    return NextResponse.json({ message: 'ID is required' }, { status: 400 });
  }

  const {
    firstname,
    middlename,
    lastname,
    contact,
    region,
    city,
    brgy,
    street,
    birth_date,
    emergency_firstname,
    emergency_middlename,
    emergency_lastname,
    emergency_region,
    emergency_city,
    emergency_brgy,
    emergency_street,
    emergency_contact,
    archived,
  } = await req.json();

  try {
    const updatedOperator = await prisma.operator.update({
      where: { id: Number(id) },
      data: {
        firstname,
        middlename,
        lastname, 
        contact,
        region,
        city,
        brgy,
        street,
        birth_date,
        emergency_firstname,
        emergency_middlename,
        emergency_lastname,
        emergency_region,
        emergency_city,
        emergency_brgy,
        emergency_street,
        emergency_contact,
        archived,
      },
    });

    return NextResponse.json({ message: 'Operator updated successfully', operator: updatedOperator });
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to update operator', error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: 'Operator ID is required' }, { status: 400 });
    }

    const updatedOperator = await prisma.operator.update({
      where: { id: Number(id) },
      data: { archived: true },
    });

    return NextResponse.json({ message: 'Operator archived successfully', operator: updatedOperator }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to archive operator', error: error.message }, { status: 500 });
  }
}