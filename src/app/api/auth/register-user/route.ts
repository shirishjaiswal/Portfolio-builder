import { NextResponse } from "next/server";
import fetchData from "@/endpoints/spring-boot";
import Payload from "@/utils/api-connections/Payload";
import REGISTER_USER, {
  REGISTER_USER_PAYLOAD_TYPE,
} from "@/endpoints/spring-boot/auth/register-user";

export async function POST(request: Request) {
  try {
    const { email, password, confirmPassword }: REGISTER_USER_PAYLOAD_TYPE =
      await request.json();

    if (!email || !password || !confirmPassword) {
      return NextResponse.json(
        { error: "email, password and confirm password are required" },
        { status: 400 }
      );
    }

    const response = await fetchData({
      connection: REGISTER_USER(
        Payload.register(email, password, confirmPassword)
      ),
    });

    if (!response?.data) {
      return NextResponse.json(
        { error: response?.error || "Authentication failed" },
        { status: 500 }
      );
    }

    const res = NextResponse.json({ data: response.data }, { status: 200 });

    return res;
  } catch (error) {
    return NextResponse.json(
      { error: "An internal server error occurred" },
      { status: 500 }
    );
  }
}
