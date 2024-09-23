// src/app/api/assignedVans/route.ts
import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export async function GET(req: NextRequest) {
  try {
    const [rows] = await pool.query('SELECT v.id, v.plate_number, o.firstname, o.lastname FROM vans v JOIN assignments a ON v.id = a.van_id JOIN operators o ON a.operator_id = o.id WHERE a.status = "idle"');
    return NextResponse.json(rows);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: 'Failed to fetch assigned vans', error: errorMessage }, { status: 500 });
  }
}
