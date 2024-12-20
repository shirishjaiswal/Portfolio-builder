import { NextResponse } from "next/server";
import fetchData from "@/endpoints/spring-boot";
import { UserInfoField_OP } from "@/components/app/user/profile-configuration/type";
import POST_USER_INFO_GROUP from "@/endpoints/spring-boot/admin/post-user-info-group";

export async function POST(request: Request) {
  try {
    const payload : UserInfoField_OP = await request.json();
    
    const response = await fetchData({
      connection: POST_USER_INFO_GROUP(payload),
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
