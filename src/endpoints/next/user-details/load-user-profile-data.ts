import { Connection } from "@/endpoints/next";

const LOAD_USER_PROFILE_DATA = () : Connection => {
  return {
    method: "GET",
    endpoint: `/api/user/load-user-profile-data`,
  };
};

export default LOAD_USER_PROFILE_DATA;