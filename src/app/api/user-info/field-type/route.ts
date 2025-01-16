import { NextResponse } from "next/server";
import fetchData from "@/endpoints/spring-boot";
import GET_USER_INFO_FIELD_TYPES from "@/endpoints/spring-boot/user_info/field/get_field_types";

export async function GET() {
  try {
    const serverResponse = await fetchData({
      connection: GET_USER_INFO_FIELD_TYPES(),
    });

    if (!serverResponse?.data) {
      return NextResponse.json(
        { error: serverResponse?.error || "Authentication failed" },
        { status: 500 }
      );
    }
    const response = NextResponse.json(
      { data: serverResponse.data },
      { status: 200 }
    );

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "An internal server error occurred" },
      { status: 500 }
    );
  }
}
