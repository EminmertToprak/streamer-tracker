import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  console.log("Middleware triggered"); // Test output

  const token = await getToken({ req });

  if (!token) {
    console.log("No token found, redirecting to sign in");
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  console.log("User authenticated, proceeding");
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/protected/:path*"], // Ensure this matches the API route structure
};
