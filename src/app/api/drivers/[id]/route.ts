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
    const driver = await prisma.driver.findUnique({
      where: { id: Number(id) },
    });

    if (driver) {
      return NextResponse.json(driver);
    } else {
      return NextResponse.json({ message: 'Driver not found' }, { status: 404 });
    }
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to retrieve driver', error: error.message }, { status: 500 });
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
    license_no,
    contact,
    region,
    city,
    brgy,
    street,
    
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
    archived,
  } = await req.json();

  try {
    const updatedDriver = await prisma.driver.update({
      where: { id: Number(id) },
      data: {
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
        archived,
      },
    });

    return NextResponse.json({ message: 'Driver updated successfully', driver: updatedDriver });
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to update driver', error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: 'Driver ID is required' }, { status: 400 });
    }

    const updatedDriver = await prisma.driver.update({
      where: { id: Number(id) },
      data: { archived: true },
    });

    return NextResponse.json({ message: 'Driver archived successfully', driver: updatedDriver }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to archive driver', error: error.message }, { status: 500 });
  }
}