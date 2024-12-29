import { Connection } from "@/endpoints/next";

const GET_USER_PROFILE_DATA = () : Connection => {
  return {
    method: "GET",
    endpoint: `/api/user/get-user-profile-data`,
  };
};

export default GET_USER_PROFILE_DATA;