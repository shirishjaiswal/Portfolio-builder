import { NextResponse } from "next/server";
import fetchData from "@/endpoints/spring-boot";
import POST_USER_INFO_PARENT, { POST_USER_INFO_PARENT_TYPE } from "@/endpoints/spring-boot/admin/post-user-info-parent";

export async function POST(request: Request) {
  try {
    const payload : POST_USER_INFO_PARENT_TYPE = await request.json();
    const response = await fetchData({
      connection: POST_USER_INFO_PARENT(payload),
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