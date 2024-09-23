import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export async function POST(req: NextRequest) {
  const { username, password, role_id } = await req.json();

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    const [result] = await pool.query('INSERT INTO users (username, password, role_id) VALUES (?, ?, ?)', [username, hashedPassword, role_id]);

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error: any) {
    console.error('Error during registration:', error);
    return NextResponse.json({ message: 'Failed to register user', error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    // Fetch all users from the database
    const [users] = await pool.query('SELECT id, username, role_id FROM users WHERE archived = 0 ');

    return NextResponse.json(users, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ message: 'Failed to fetch users', error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const requestBody = await req.json();
    const id = requestBody?.id;

    if (!id) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    const [result] = await pool.query('UPDATE users SET archived = 1 WHERE id = ?', [id]);

    if ((result as mysql.ResultSetHeader).affectedRows > 0) {
      return NextResponse.json({ message: 'User archived successfully' });
    } else {
      return NextResponse.json({ message: 'User not found or already archived' }, { status: 404 });
    }
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to archive user', error: error.message }, { status: 500 });
  }
}