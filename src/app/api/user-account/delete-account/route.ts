import { NextResponse } from "next/server";
import fetchData from "@/endpoints/spring-boot";
import { cookies } from "next/headers";
import { getUserName } from "@/lib/session";
import DELETE_USER, { DELETE_USER_PAYLOAD }  from "@/endpoints/spring-boot/user/delete-user";

export async function DELETE(request: Request) {
  try {
    const cookie = cookies().get("pb_session_token");

    const userName = await getUserName(cookie?.value);

    const { password } = await request.json();

    const payload : DELETE_USER_PAYLOAD = {
      email: userName,
      password: password
    };
    
    const serverResponse = await fetchData({
      connection: DELETE_USER(payload),
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