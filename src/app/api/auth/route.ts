import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  try {
    // Perform the query
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

    // Type assertion for rows
    const users = rows as { id: number; username: string; password: string; role_id: number }[];

    if (users.length === 0) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const user = users[0];

    // Compare password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, role_id: user.role_id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    return NextResponse.json({ token, role_id: user.role_id }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to authenticate', error: error.message }, { status: 500 });
  }
}
