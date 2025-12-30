import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if it's an admin route
  if (pathname.startsWith("/admin")) {
    // Allow login page
    if (pathname === "/admin/login") {
      // If already logged in, redirect to dashboard
      const session = request.cookies.get("session")?.value;
      if (session) {
        const verified = await verifySession(session);
        if (verified) {
          return NextResponse.redirect(
            new URL("/admin/dashboard", request.url)
          );
        }
      }
      return NextResponse.next();
    }

    // Check authentication for all other admin routes
    const session = request.cookies.get("session")?.value;

    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const verified = await verifySession(session);

    if (!verified) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
