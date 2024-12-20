import { Connection } from "@/endpoints/spring-boot";

export type LOGIN_PAYLOAD_TYPE = {
  username: string;
  password: string;
}

const LOGIN = (payload: LOGIN_PAYLOAD_TYPE) : Connection => {
  return {
    method: "POST",
    endpoint: "/auth/login",
    payload: {
      "username": payload.username,
      "password": payload.password
    },
  };
};

export default LOGIN;
