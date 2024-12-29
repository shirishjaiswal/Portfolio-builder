"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export async function createSession(
  accessToken: string,
  refreshToken: string
): Promise<void> {
  try {
    const decryptedAccessToken = jwtDecode(accessToken);
    const decryptedRefreshToken = jwtDecode(refreshToken);

    const accessTokenExpiry = decryptedAccessToken.exp;
    const refreshTokenExpiry = decryptedRefreshToken.exp;

    const cookieStore = cookies();
    cookieStore.set("pb_session_token", accessToken, {
      httpOnly: true,
      secure: true,
      expires: accessTokenExpiry,
      sameSite: true,
      path: "/",
      maxAge: accessTokenExpiry,
    });

    cookieStore.set("pb_refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      expires: refreshTokenExpiry,
      sameSite: true,
      path: "/",
      maxAge: refreshTokenExpiry,
    });

  } catch (error) {
    throw new Error("Failed to create session");
  }
}

export async function deleteSession(): Promise<void> {
  try {
    const cookieStore = cookies();

    cookieStore.set("pb_session_token", "", {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
      sameSite: false,
      path: "/",
    });

    cookieStore.set("pb_refresh_token", "", {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
      sameSite: false,
      path: "/",
    });
  } catch (error) {
    throw new Error("Failed to log out user");
  }
}

export async function validateToken(
  accessToken: string | undefined
): Promise<boolean> {
  try {
    if (!accessToken) return false;
    const decryptedAccessToken = jwtDecode(accessToken);
    const accessTokenExpiry = decryptedAccessToken.exp;
    const currentTime = Date.now() / 1000;
    if (accessTokenExpiry) return accessTokenExpiry > currentTime;
    return false;
  } catch (error) {
    return false;
  }
}

export async function getRole(
  accessToken: string | undefined
): Promise<string> {
  try {
    if (!accessToken) return "";
    const decryptedAccessToken = jwtDecode(accessToken);
    return decryptedAccessToken?.roles[0];
  } catch (error) {
    return "";
  }
}

export async function getUserId(accessToken: string | undefined): Promise<number> {
  try {
    if (!accessToken) return -1;
    const decryptedAccessToken = jwtDecode(accessToken);
    return decryptedAccessToken?.id;
  } catch (error) {
    return -1;
  }
}