import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Request body:', body);

    const {
      firstname,
      middlename,
      lastname,
      license_no,
      contact,
      region,
      city,
      brgy,
      street,
      dl_codes,
      conditions,
      expiration_date,
      emergency_firstname,
      emergency_middlename,
      emergency_lastname,
      emergency_region,
      emergency_city,
      emergency_brgy,
      emergency_street,
      emergency_contact,
      archived
    } = body;

    // Validate input data
    const requiredFields = [
      'firstname', 'lastname', 'contact', 'region', 'city', 'brgy', 'street', 'emergency_firstname', 'emergency_lastname', 'emergency_contact'
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ message: `${field} is required` }, { status: 400 });
      }
    }

    const newOperator = await prisma.operator.create({
      data: {
        firstname,
        middlename,
        lastname,
        birth_date: new Date(), // Add the birth_date property here
        contact,
        region,
        city,
        brgy,
        street,
        emergency_firstname,
        emergency_middlename,
        emergency_lastname,
        emergency_region,
        emergency_city,
        emergency_brgy,
        emergency_street,
        emergency_contact,
        archived: archived || false,
      },
    });

    return NextResponse.json(newOperator, { status: 201 });
  } catch (error: any) {
    console.error('Error creating operator:', error);
    return NextResponse.json({ message: 'Failed to add operator', error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const operators = await prisma.operator.findMany({
      where: { archived: false },
    });
    return NextResponse.json(operators);
  } catch (error: any) {
    console.error('Error retrieving operators:', error);
    return NextResponse.json({ message: 'Failed to retrieve operators', error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: 'Operator ID is required' }, { status: 400 });
    }

    const updatedOperator = await prisma.operator.update({
      where: { id },
      data: { archived: true },
    });

    return NextResponse.json({ message: 'Operator archived successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Error archiving operator:', error);
    return NextResponse.json({ message: 'Failed to archive operator', error: error.message }, { status: 500 });
  }
}