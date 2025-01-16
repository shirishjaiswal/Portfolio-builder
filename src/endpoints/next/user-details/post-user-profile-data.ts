import { UserProfileDetilsGroup } from "@/components/app/user/profile/types";
import { Connection } from "@/endpoints/next";

const POST_USER_PROFILE_DATA = (userProfileDetilsGroup : UserProfileDetilsGroup[]) : Connection => {
  return {
    method: "POST",
    endpoint: "/api/user/post-user-profile-data",
    payload: userProfileDetilsGroup
  };
};

export default POST_USER_PROFILE_DATA;