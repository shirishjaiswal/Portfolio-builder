import { Connection } from "@/endpoints/spring-boot";

const GET_USER_PROFILE_DATA = (
  userProfileId : Number
): Connection => {
  return {
    method: "GET",
    endpoint: `/user/user-profile-data/${userProfileId}`,
  };
};

export default GET_USER_PROFILE_DATA;
