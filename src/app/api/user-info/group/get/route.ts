import { NextResponse } from "next/server";
import fetchData from "@/endpoints/spring-boot";
import GET_USER_INFO_GROUP from "@/endpoints/spring-boot/user_info/group/get";

export async function GET() {
  try {
    const response = await fetchData({
      connection: GET_USER_INFO_GROUP(),
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
    console.log(error);
    return NextResponse.json(
      { error: "An internal server error occurred" },
      { status: 500 }
    );
  }
}
