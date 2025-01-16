import { UserDetailsType } from "@/context/user-settings-context";
import { Connection } from "@/endpoints/next";

const INITIALIZE_USER_PROFILE_DETAILS = (userEntity: UserDetailsType): Connection => {
  return {
    method: "POST",
    endpoint: "/api/auth/initialize-user-profile-details",
    payload: userEntity
  };
};

export default INITIALIZE_USER_PROFILE_DETAILS;