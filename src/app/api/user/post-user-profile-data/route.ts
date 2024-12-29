import { NextResponse } from "next/server";
import fetchData from "@/endpoints/spring-boot";
import { UserProfileDetails, UserProfileDetailsField, UserProfileDetailsParent, UserProfileDetilsGroup, UserProfileFields, UserProfileParents } from "@/components/app/user/profile/types";
import POST_USER_PROFILE_DATA from "@/endpoints/spring-boot/user/post-user-profile-data";
import { cookies } from "next/headers";
import { getUserId } from "@/lib/session";

const saveUserProfileData = (userProfileData : UserProfileDetilsGroup[], userEntityId : Number) => {
  const userProfileDetails : UserProfileDetails[] = []

  userProfileData.forEach((userInfoGroup: UserProfileDetilsGroup) => {
    userProfileDetails.push({
      configKey: userInfoGroup.configKey,
      uniqueKey: userInfoGroup.uniqueKey,
      userProfileParents: userInfoGroup.userInfoParents.map((parent: UserProfileDetailsParent) : UserProfileParents => ({
        configKey: parent.configKey,
        uniqueKey: parent.uniqueKey,
        userProfileFields: parent.userInfoFields.map((field: UserProfileDetailsField) : UserProfileFields => ({
          configKey: field.configKey,
          uniqueKey: field.uniqueKey,
          input: field.input,
          label: field.label,
          value: field.value
        }))
      }))
    })
  })
 
  return {
    userProfileDataJSON: JSON.stringify(userProfileDetails),
    userEntity: {
      id: userEntityId
    }
  };
};

export async function POST(request: Request) {
  try {
    const userProfileData: UserProfileDetilsGroup[] = await request.json();

    const cookie = cookies().get("pb_session_token");

    const userEntityId = await getUserId(cookie?.value);

    if (!userEntityId || userEntityId === -1) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 500 }
      );
    }

    const payload = saveUserProfileData(userProfileData, userEntityId);

    const response = await fetchData({
      connection: POST_USER_PROFILE_DATA(payload),
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