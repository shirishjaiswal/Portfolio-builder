import { NextResponse } from "next/server";
import fetchData from "@/endpoints/spring-boot";
import Payload from "@/utils/api-connections/Payload";
import LOGIN, { LOGIN_PAYLOAD_TYPE } from "@/endpoints/spring-boot/auth/login";
import { createSession } from "@/lib/session";
import GET_USER_BY_EMAIL from "@/endpoints/spring-boot/user/get-user-by-mail";

export async function POST(request: Request) {
  try {
    const { username, password }: LOGIN_PAYLOAD_TYPE = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }
    const response = await fetchData({
      connection: LOGIN(Payload.login(username, password)),
    });

    if (!response?.data) {
      return NextResponse.json(
        { error: response?.error || "Authentication failed" },
        { status: 500 }
      );
    }

    const userDetails = await fetchData({
      connection: GET_USER_BY_EMAIL(username),
      token: response.data.accessToken,
    });

    if (!userDetails?.data) {
      return NextResponse.json(
        { error: response?.error || "Authentication failed" },
        { status: 500 }
      );
    }

    await createSession(response.data.accessToken, response.data.refreshToken);

    const res = NextResponse.json({ data: userDetails.data }, { status: 200 });

    return res;
  } catch (error) {
    return NextResponse.json(
      { error: "An internal server error occurred" },
      { status: 500 }
    );
  }
}
