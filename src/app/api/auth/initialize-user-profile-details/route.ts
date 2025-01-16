import { NextResponse } from "next/server";
import fetchData from "@/endpoints/spring-boot";
import { UserInfoField_I, UserInfoGroup_I, UserInfoParent_I } from "@/components/app/user/profile-configuration/type";
import { getUniqueFieldKey, getUniqueGroupKey, getUniqueParentKey } from "@/components/app/user/profile/helper";
import { UserProfileDetailsField, UserProfileDetailsGroup, UserProfileDetailsParent } from "@/components/app/user/profile-details/types";
import { UserDetailsType } from "@/context/user-settings-context";
import INITIALIZE_USER_PROFILE_DETAILS from "@/endpoints/spring-boot/auth/initialize-profile-details";

export async function POST(request: Request) {
  try {
    const userData : UserDetailsType = await request.json();

    console.log("userData", userData);
    const serverResponse_UserProfileDetails = await fetchData({
      connection: INITIALIZE_USER_PROFILE_DETAILS(userData.id),
    });

    if (!serverResponse_UserProfileDetails?.data) {
      return NextResponse.json(
        { error: serverResponse_UserProfileDetails?.error || "Request failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: serverResponse_UserProfileDetails.data }, { status: 200 });

  } catch (error) {
    console.error("Error in POST /api/user-details/put:", error);

    return NextResponse.json(
      { error: "An internal server error occurred" },
      { status: 500 }
    );
  }
}


