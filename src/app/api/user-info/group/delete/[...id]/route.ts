import fetchData from "@/endpoints/spring-boot";
import DELETE_USER_INFO_GROUP_BY_ID from "@/endpoints/spring-boot/user_info/group/delete_by_group_id";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const id = req.url.split("/").pop();

    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { error: "Invalid or missing ID" },
        { status: 400 }
      );
    }

    const response = await fetchData({
      connection: DELETE_USER_INFO_GROUP_BY_ID(Number(id)),
    });

    if (!response?.data) {
      return NextResponse.json(
        { error: response?.error || "Request failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: response.data }, { status: 200 });
  } catch (error) {
    console.error("Error in DELETE /api/admin/delete-user-info-group:", error);

    return NextResponse.json(
      { error: "An internal server error occurred" },
      { status: 500 }
    );
  }
}
