// src/app/api/updateVanStatus/route.ts
import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export async function POST(req: NextRequest) {
  const { vanId, status } = await req.json();

  try {
    await pool.query('UPDATE assignments SET status = ? WHERE van_id = ?', [status, vanId]);
    return NextResponse.json({ message: 'Van status updated successfully' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: 'Failed to update van status', error: errorMessage }, { status: 500 });
  }
}
