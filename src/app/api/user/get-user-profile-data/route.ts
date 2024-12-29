import fetchData from "@/endpoints/spring-boot";
import GET_USER_PROFILE_DATA from "@/endpoints/spring-boot/user/get-user-profile-data";
import { getUserId } from "@/lib/session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {

    const cookie = cookies().get("pb_session_token");

    const userEntityId = await getUserId(cookie?.value);

    if (!userEntityId || userEntityId === -1) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 500 }
      );
    }

    const response = await fetchData({
      connection: GET_USER_PROFILE_DATA(userEntityId),
    });

    if (!response?.data) {
      return NextResponse.json(
        { error: response?.error || "Request failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: response.data }, { status: 200 });
  } catch (error) {
    console.error("Error in PUT /api:", error);

    return NextResponse.json(
      { error: "An internal server error occurred" },
      { status: 500 }
    );
  }
}