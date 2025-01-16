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

    const springResponse = await fetchData({
      connection: REGISTER_USER(
        Payload.register(email, password, confirmPassword)
      ),
    });

    if (!springResponse?.data) {
      return NextResponse.json(
        { error: springResponse?.error || "Authentication failed" },
        { status: 500 }
      );
    }

    const response = NextResponse.json({ data: springResponse.data }, { status: 200 });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "An internal server error occurred" },
      { status: 500 }
    );
  }
}
