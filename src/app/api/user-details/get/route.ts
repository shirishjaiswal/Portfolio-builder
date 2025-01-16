import fetchData from "@/endpoints/spring-boot";
import GET_USER_BY_EMAIL from "@/endpoints/spring-boot/user/get-user-by-mail";
import { getUserName } from "@/lib/session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookie = cookies().get("pb_session_token");

    const useEmailId = await getUserName(cookie?.value);

    if (!useEmailId || useEmailId === "") {
      return NextResponse.json({ error: "User not found" }, { status: 500 });
    }

    const response = await fetchData({
      connection: GET_USER_BY_EMAIL(useEmailId),
    });

    if (!response?.data) {
      return NextResponse.json(
        { error: response?.error || "Request failed" },
        { status: 500 }
      );
    }

    const data = {
      id: response?.data?.id,
      firstName: response?.data?.firstName,
      lastName: response?.data?.lastName,
      email: response?.data?.email,
      role: response?.data?.roles,
      status: response?.data?.status,
      phoneNumber: response?.data?.phoneNumber,
      emailVerified: response?.data?.emailVerified,
      phoneNumberVerified: response?.data?.phoneNumberVerified,
    };

    return NextResponse.json({ data: data }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/user-details/get:", error);

    return NextResponse.json(
      { error: "An internal server error occurred" },
      { status: 500 }
    );
  }
}
