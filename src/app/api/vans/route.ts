import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();



export async function POST(req: NextRequest) {
  try {
    const {
      mv_file_no,
      plate_number,
      engine_no,
      chassis_no,
      denomination,
      piston_displacement,
      number_of_cylinders,
      fuel,
      make,
      series,
      body_type,
      body_no,
      year_model,
      gross_weight,
      net_weight,
      shipping_weight,
      net_capacity,
      year_last_registered,
      expiration_date,
    } = await req.json();

    const newVan = await prisma.van.create({
      data: {
        mv_file_no,
        plate_number,
        engine_no,
        chassis_no,
        denomination,
        piston_displacement,
        number_of_cylinders: parseInt(number_of_cylinders, 10),
        fuel,
        make,
        series,
        body_type,
        body_no,
        year_model: parseInt(year_model, 10),
        gross_weight: parseInt(gross_weight, 10),
        net_weight: parseInt(net_weight, 10),
        shipping_weight: parseInt(shipping_weight, 10),
        net_capacity: parseInt(net_capacity, 10),
        year_last_registered: parseInt(year_last_registered, 10),
        expiration_date: new Date(expiration_date),
      },
    });

    return NextResponse.json(newVan, { status: 201 });
  } catch (error: any) {
    console.error("Error creating van:", error);
    return NextResponse.json(
      { message: 'Failed to add van', error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const vans = await prisma.van.findMany({
      where: { archived: false },
    });
    return NextResponse.json(vans);
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Failed to retrieve vans', error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: 'Van ID is required' },
        { status: 400 }
      );
    }

    const updatedVan = await prisma.van.update({
      where: { id: Number(id) },
      data: { archived: true },
    });

    return NextResponse.json(
      { message: 'Van archived successfully', van: updatedVan },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Failed to archive van', error: error.message },
      { status: 500 }
    );
  }
}