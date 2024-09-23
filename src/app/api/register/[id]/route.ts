import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Handle GET request for fetching a user by ID
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop(); // Extract the ID from the URL

  if (!id) {
    return NextResponse.json({ message: 'ID is required' }, { status: 400 });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    const users = rows as Array<{ id: number; username: string; password: string; role_id: string }>;

    if (users.length > 0) {
      return NextResponse.json(users[0]);
    } else {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to retrieve user', error: error.message }, { status: 500 });
  }
}

// Handle PUT request for updating a user by ID
export async function PUT(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop(); // Extract the ID from the URL

  if (!id) {
    return NextResponse.json({ message: 'ID is required' }, { status: 400 });
  }

  const { username, password, role_id } = await req.json();

  try {
    const [result] = await pool.query(
      'UPDATE users SET username = ?, password = ?, role_id = ? WHERE id = ?',
      [username, password, role_id, id]
    );

    const updateResult = result as mysql.ResultSetHeader;

    if (updateResult.affectedRows > 0) {
      return NextResponse.json({ message: 'User updated successfully' });
    } else {
      return NextResponse.json({ message: 'User not found or no changes made' }, { status: 404 });
    }
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to update user', error: error.message }, { status: 500 });
  }
}

// Handle DELETE request for archiving a user by ID
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
