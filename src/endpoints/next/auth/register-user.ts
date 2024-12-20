import { Connection } from "@/endpoints/next";

export type REGISTER_USER_PAYLOAD_TYPE = {
  email: string;
  password: string;
  confirmPassword: string;
};

const REGISTER_USER = (payload: REGISTER_USER_PAYLOAD_TYPE) : Connection => {
  return {
    method: "POST",
    endpoint: "/api/auth/register-user",
    payload: {
      email: payload.email,
      password: payload.password,
      confirmPassword: payload.confirmPassword,
    },
  };
};

export default REGISTER_USER;
