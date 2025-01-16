import { NextResponse } from "next/server";
import fetchData from "@/endpoints/spring-boot";
import PUT_USER_DETAILS, { PUT_USER_DETAILS_PAYLOAD } from "@/endpoints/spring-boot/user/put-user-details";
import { cookies } from "next/headers";
import { getUserName } from "@/lib/session";

export type PAYLOAD = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

export async function PUT(request: Request) {
  try {
    const cookie = cookies().get("pb_session_token");

    const userName = await getUserName(cookie?.value);

    const requestBody : PAYLOAD = await request.json();

    const payload : PUT_USER_DETAILS_PAYLOAD = {
      email: userName,
      username : userName,
      firstName: requestBody.firstName,
      lastName: requestBody.lastName,
      phoneNumber: requestBody.phoneNumber
    };
    console.log("payload", payload);
    const serverResponse = await fetchData({
      connection: PUT_USER_DETAILS(payload),
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