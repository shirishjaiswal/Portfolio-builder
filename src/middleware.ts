import { NextResponse, NextRequest } from "next/server";
import { getRole, validateToken } from "./lib/session";
import refreshCookies from "./utils/api-connections/user/refresh-token";

export async function middleware(req: NextRequest) {
  const publicRoutes = ["/", "/login", "/register", "/verify"];
  const currentPath = req.nextUrl.pathname;

  // Skip middleware for static files and Next.js internal routes
  if (
    publicRoutes.includes(currentPath) ||
    currentPath.startsWith("/_next") ||
    currentPath.startsWith("/api") ||
    currentPath.startsWith("/static") ||
    /\.(.*)$/.test(currentPath)
  ) {
    return NextResponse.next();
  }

  // Retrieve tokens from cookies
  const accessToken = req.cookies.get("pb_session_token")?.value;
  const refreshToken = req.cookies.get("pb_refresh_token")?.value;

  try {
    // Validate access token and refresh token
    const isAccessTokenValid = await validateToken(accessToken);
    const isRefreshTokenValid = await validateToken(refreshToken);

    // Handle token expiration
    if (!isAccessTokenValid) {
      if (isRefreshTokenValid && refreshToken) {

        const refreshedResponse = await refreshCookies();

        if (refreshedResponse?.data.accessToken) {
          const response = NextResponse.next();
          response.cookies.set("pb_session_token", refreshedResponse?.data.accessToken, {
            httpOnly: true,
            secure: true,
            path: "/",
          });
          response.cookies.set("pb_refresh_token", refreshedResponse?.data.refreshToken, {
            httpOnly: true,
            secure: true,
            path: "/",
          })
          return response;
        } else {
          return NextResponse.redirect(new URL("/login", req.url));
        }
      }

      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Role-based route protection
    const role = await getRole(accessToken);

    const roleProtectedRoutes: Record<string, string[]> = {
      "/admin": ["ADMIN", "SUPER_ADMIN"],
      "/user": ["USER", "ADMIN", "SUPER_ADMIN"],
    };

    const allowedRoles = roleProtectedRoutes[currentPath];

    if (allowedRoles && !allowedRoles.includes(role)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next(); // Allow access if all checks pass
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Apply middleware to all routes
export const config = {
  matcher: "/:path*",
};
