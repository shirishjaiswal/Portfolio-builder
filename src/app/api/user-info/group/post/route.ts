import { NextResponse } from "next/server";
import fetchData from "@/endpoints/spring-boot";
import { UserInfoField_OP } from "@/components/app/user/profile-configuration/type";
import POST_USER_INFo_GROUP from "@/endpoints/spring-boot/user_info/group/post";

export async function POST(request: Request) {
  try {
    const payload: UserInfoField_OP = await request.json();
    const response = await fetchData({
      connection: POST_USER_INFo_GROUP(payload),
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