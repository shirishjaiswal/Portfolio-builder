import { NextResponse } from "next/server";
import fetchData from "@/endpoints/spring-boot";
import Payload from "@/utils/api-connections/Payload";
import { createSession } from "@/lib/session";
import REFRESH_TOKEN, {
  REFRESH_TOKEN_PAYLOAD_TYPE,
} from "@/endpoints/spring-boot/auth/refresh-token";

export async function POST(request: Request) {
  console.log("GET REFRESH");
  try {
    const { refreshToken }: REFRESH_TOKEN_PAYLOAD_TYPE = await request.json();

    if (!refreshToken) {
      return NextResponse.json(
        { error: "Refresh Tokn is required" },
        { status: 400 }
      );
    }
    
    const response = await fetchData({
      connection: REFRESH_TOKEN(Payload.refreshToken(refreshToken)),
    });

    if (!response?.data) {
      return NextResponse.json(
        { error: response?.error || "Authentication failed" },
        { status: 500 }
      );
    }

    await createSession(response.data.accessToken, response.data.refreshToken);

    const res = NextResponse.json({ status: 200 });
    console.log("Refresh Token Called");
    return res;
  } catch (error) {
    return NextResponse.json(
      { error: "An internal server error occurred" },
      { status: 500 }
    );
  }
}
