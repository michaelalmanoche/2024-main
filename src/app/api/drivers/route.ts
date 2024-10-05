import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const {
    firstname,
    middlename,
    lastname,
    contact,
    region,
    city,
    brgy,
    street,
   
    license_no,
    dl_codes,
    conditions,
    expiration_date,
    birth_date,
    emergency_firstname,
    emergency_middlename,
    emergency_lastname,
    emergency_region,
    emergency_city,
    emergency_brgy,
    emergency_street,
    emergency_contact,
    archived
  } = await req.json();

  try {
    // Check if the license number already exists
    const existingDriver = await prisma.driver.findUnique({
      where: { license_no },
    });

    if (existingDriver) {
      return NextResponse.json({ message: 'License number already registered' }, { status: 409 });
    }

    const newDriver = await prisma.driver.create({
      data: {
        firstname,
        middlename,
        lastname,
        contact,
        region,
        city,
        brgy,
        street,
        license_no,
        dl_codes,
        conditions,
        expiration_date: new Date(expiration_date),
        birth_date: new Date(birth_date),
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

    return NextResponse.json(newDriver, { status: 201 });
  } catch (error: any) {
    console.error('Error adding driver:', error);
    return NextResponse.json({ message: 'Failed to add driver', error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const drivers = await prisma.driver.findMany({
      where: { archived: false },
    });
    return NextResponse.json(drivers);
  } catch (error: any) {
    console.error('Error retrieving drivers:', error);
    return NextResponse.json({ message: 'Failed to retrieve drivers', error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: 'Driver ID is required' }, { status: 400 });
    }

    const updatedDriver = await prisma.driver.update({
      where: { id },
      data: { archived: true },
    });

    return NextResponse.json({ message: 'Driver archived successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Error archiving driver:', error);
    return NextResponse.json({ message: 'Failed to archive driver', error: error.message }, { status: 500 });
  }
}