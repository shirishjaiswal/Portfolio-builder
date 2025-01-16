import { Connection } from "@/endpoints/spring-boot";

const INITIALIZE_USER_PROFILE_DETAILS = (userId : number): Connection => {
  return {
    method: "POST",
    endpoint: `/auth/initialize-profile-details/${userId}`,
  };
};

export default INITIALIZE_USER_PROFILE_DETAILS;