import { NextResponse, NextRequest } from "next/server";
import { getRole, validateToken } from "./lib/session";
import refreshCookies from "./utils/api-connections/auth/refresh-token";

export async function middleware(req: NextRequest) {
  const publicRoutes = ["/", "/login", "/register", "/verify", "/auth/refresh-token"];
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

    console.log("isAccessTokenValid", isAccessTokenValid);
    console.log("isRefreshTokenValid", isRefreshTokenValid);

    // Handle token expiration
    if (!isAccessTokenValid) {
      if (isRefreshTokenValid && refreshToken) {
        console.log("Refreshing access token...");

        // Attempt to refresh the access token
        const refreshedResponse = await refreshCookies(refreshToken);

        if (refreshedResponse?.accessToken) {
          console.log("Access token refreshed successfully");

          const response = NextResponse.next();
          response.cookies.set("pb_session_token", refreshedResponse.accessToken, {
            httpOnly: true,
            secure: true,
            path: "/",
          });
          response.cookies.set("pb_refresh_token", refreshedResponse.refreshToken, {
            httpOnly: true,
            secure: true,
            path: "/",
          })
          return response;
        } else {
          console.log("Failed to refresh access token");
          return NextResponse.redirect(new URL("/login", req.url));
        }
      }

      console.log("Access and refresh tokens are invalid");
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
      console.log(`Unauthorized role: ${role} for route ${currentPath}`);
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next(); // Allow access if all checks pass
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Apply middleware to all routes
export const config = {
  matcher: "/:path*",
};
