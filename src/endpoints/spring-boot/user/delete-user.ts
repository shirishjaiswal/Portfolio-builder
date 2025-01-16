import { Connection } from "@/endpoints/spring-boot";

export type DELETE_USER_PAYLOAD = {
  email : string
  password : string
}

const DELETE_USER = (
  payload : DELETE_USER_PAYLOAD
): Connection => {
  return {
    method: "DELETE",
    endpoint: `/user/delete`,
    payload: payload
  };
};

export default DELETE_USER;