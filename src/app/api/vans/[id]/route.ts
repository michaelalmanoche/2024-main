import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop(); // Extract the ID from the URL

  if (!id) {
    return NextResponse.json({ message: 'ID is required' }, { status: 400 });
  }

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

  // Validate and parse the weights and capacities
  const parsedGrossWeight = parseFloat(gross_weight);
  const parsedNetWeight = parseFloat(net_weight);
  const parsedShippingWeight = parseFloat(shipping_weight);
  const parsedNetCapacity = parseFloat(net_capacity);

  if (isNaN(parsedGrossWeight) || isNaN(parsedNetWeight) || isNaN(parsedShippingWeight) || isNaN(parsedNetCapacity)) {
    return NextResponse.json({ message: 'Invalid weight or capacity values' }, { status: 400 });
  }

  try {
    const updatedVan = await prisma.van.update({
      where: { id: Number(id) },
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
        gross_weight: parsedGrossWeight,
        net_weight: parsedNetWeight,
        shipping_weight: parsedShippingWeight,
        net_capacity: parsedNetCapacity,
        year_last_registered: parseInt(year_last_registered, 10),
        expiration_date: new Date(expiration_date),
      },
    });

    return NextResponse.json({ message: 'Van updated successfully', van: updatedVan });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Failed to update van', error: error.message },
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