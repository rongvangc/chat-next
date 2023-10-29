import { TOKEN_KEY } from "@/lib/cookieUtils";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const PUBLIC_PATH: string[] = ["/", "/register-success"];

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get(TOKEN_KEY);

  const path = request.nextUrl.pathname;
  const token = cookie?.value || "";

  const checkPublicPath = PUBLIC_PATH.some((url: string) => url.includes(path));

  if (!token && !checkPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (token && checkPublicPath) {
    return NextResponse.redirect(new URL("/chat", request.url));
  }

  const requestHeaders = new Headers(request.headers);
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });

  return response;
}
