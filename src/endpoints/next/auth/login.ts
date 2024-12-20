import { Connection } from "@/endpoints/next";

export type LOGIN_PAYLOAD_TYPE = {
  username: string;
  password: string;
}

const LOGIN = (payload: LOGIN_PAYLOAD_TYPE) : Connection => {
  return {
    method: "POST",
    endpoint: "/api/auth/login",
    payload: {
      "username": payload.username,
      "password": payload.password
    },
  };
};

export default LOGIN;