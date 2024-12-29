import { Connection } from "@/endpoints/spring-boot";

type POST_USER_PROFILE_DATA_PAYLOAD = {
  userProfileDataJSON: string;
  userEntity: {
    id: Number;
  };
};
const POST_USER_PROFILE_DATA = (
  payload: POST_USER_PROFILE_DATA_PAYLOAD
): Connection => {
  return {
    method: "POST",
    endpoint: `/user/user-profile-data`,
    payload: payload,
  };
};

export default POST_USER_PROFILE_DATA;
