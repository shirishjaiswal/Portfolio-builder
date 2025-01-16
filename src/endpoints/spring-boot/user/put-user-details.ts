import { Connection } from "@/endpoints/spring-boot";

export type PUT_USER_DETAILS_PAYLOAD = {
  email: string;
  username : string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

const PUT_USER_DETAILS = (
  payload: PUT_USER_DETAILS_PAYLOAD
): Connection => {
  return {
    method: "PUT",
    endpoint: `/user/update`,
    payload: payload,
  };
};

export default PUT_USER_DETAILS;