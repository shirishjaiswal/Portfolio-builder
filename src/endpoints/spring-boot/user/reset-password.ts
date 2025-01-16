import { Connection } from "@/endpoints/spring-boot";

export type RESET_PASSWORD_PAYLOAD = {
  email : string
  oldPassword: string
  newPassword: string
  confirmPassword: string
};

const RESET_PASSWORD = (payload : RESET_PASSWORD_PAYLOAD) : Connection => {
  return {
    method: "POST",
    endpoint: "/user/reset-password",
    payload: payload
  };
};

export default RESET_PASSWORD;