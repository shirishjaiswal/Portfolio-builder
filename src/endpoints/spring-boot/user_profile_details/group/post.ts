import { UserProfileDetailsGroup } from "@/components/app/user/profile-details/types";
import { Connection } from "@/endpoints/spring-boot";

const POST_USER_PROFILE_DETAILS_GROUP = (payload: UserProfileDetailsGroup): Connection => {
  return {
    method: "POST",
    endpoint: `/user-profile-details-group/save`,
    payload: payload
  };
};

export default POST_USER_PROFILE_DETAILS_GROUP;