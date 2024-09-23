// src/app/api/queueVan/route.ts
import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export async function POST(req: NextRequest) {
  const { vanId } = await req.json();

  try {
    await pool.query('UPDATE assignments SET status = "queued" WHERE van_id = ?', [vanId]);
    return NextResponse.json({ message: 'Van queued successfully' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: 'Failed to queue van', error: errorMessage }, { status: 500 });
  }
}
