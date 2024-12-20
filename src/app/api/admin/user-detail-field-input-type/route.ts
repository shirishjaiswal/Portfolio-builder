import { NextResponse } from "next/server";
import fetchData from "@/endpoints/spring-boot";
import GET_USER_DETAILS_FIELD_INPUT_TYPE from "@/endpoints/spring-boot/admin/get-user-detail-field-input-type";

export async function GET() {
  try {
    const response = await fetchData({
      connection: GET_USER_DETAILS_FIELD_INPUT_TYPE(),
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
