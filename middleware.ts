// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import jwt from 'jsonwebtoken';

// export async function middleware(request: NextRequest) {
//   const token = request.cookies.get('token')?.value;

//   // Allow access to login, register, and public assets
//   if (
//     request.nextUrl.pathname.startsWith("/login") ||
//     request.nextUrl.pathname.startsWith("/register") ||
//     request.nextUrl.pathname.startsWith("/api/auth") ||
//     request.nextUrl.pathname.startsWith("/_next/static") ||
//     request.nextUrl.pathname.startsWith("/_next/image") ||
//     request.nextUrl.pathname === "/favicon.ico"
//   ) {
//     return NextResponse.next();
//   }

//   if (!token) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!);

//     // Optional: Add role-based access control here
//     const { role_id } = decoded as { id: number; role_id: number };

//     if (request.nextUrl.pathname.startsWith("/admin") && role_id !== 1) {
//       return NextResponse.redirect(new URL("/unauthorized", request.url));
//     }

//     if (request.nextUrl.pathname.startsWith("/operator") && role_id !== 2) {
//       return NextResponse.redirect(new URL("/unauthorized", request.url));
//     }

//     // Allow the request to proceed if authentication is successful
//     return NextResponse.next();
//   } catch (error) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }
// }

// export const config = {
//   matcher: [
//     "/((?!_next/static|_next/image|favicon.ico|login|register|api/auth).*)",
//   ],
// };
