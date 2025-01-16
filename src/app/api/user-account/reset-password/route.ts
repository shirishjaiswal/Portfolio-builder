import { NextResponse } from "next/server";
import fetchData from "@/endpoints/spring-boot";
import { cookies } from "next/headers";
import { getUserName } from "@/lib/session";
import RESET_PASSWORD, { RESET_PASSWORD_PAYLOAD } from "@/endpoints/spring-boot/user/reset-password";

export type PAYLOAD = {
  oldPassword: string
  newPassword: string
  confirmPassword: string
};

export async function PUT(request: Request) {
  try {
    const cookie = cookies().get("pb_session_token");

    const userName = await getUserName(cookie?.value);

    const requestBody : PAYLOAD = await request.json();

    const payload : RESET_PASSWORD_PAYLOAD = {
      email: userName,
      oldPassword: requestBody.oldPassword,
      newPassword: requestBody.newPassword,
      confirmPassword: requestBody.confirmPassword
    };
    
    const serverResponse = await fetchData({
      connection: RESET_PASSWORD(payload),
    });

    if (!serverResponse?.data) {
      return NextResponse.json(
        { error: serverResponse?.error || "Request failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: serverResponse.data }, { status: 200 });
  } catch (error) {
    console.error("Error in PUT /api/user-details/put:", error);

    return NextResponse.json(
      { error: "An internal server error occurred" },
      { status: 500 }
    );
  }
}