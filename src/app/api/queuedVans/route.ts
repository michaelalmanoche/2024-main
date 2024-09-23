import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

export async function GET() {
    try {
        const [rows] = await pool.query(`
            SELECT a.id, v.plate_number, o.firstname, o.lastname
            FROM assignments a
            JOIN vans v ON a.van_id = v.id
            JOIN operators o ON a.operator_id = o.id
            WHERE a.status = 'queued'
        `);
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ message: 'Failed to fetch queued vans', error: (error as Error).message }, { status: 500 });
    }
}
