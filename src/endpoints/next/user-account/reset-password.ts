import { Connection } from "@/endpoints/next";
import { PAYLOAD } from "@/app/api/user-account/reset-password/route";

const RESET_PASSWORD = (
  oldPassword: string,
  newPassword: string,
  confirmPassword: string
): Connection => {
  const payload: PAYLOAD = {
    oldPassword: oldPassword,
    newPassword: newPassword,
    confirmPassword: confirmPassword,
  };
  return {
    method: "PUT",
    endpoint: "/api/user-account/reset-password",
    payload: payload,
  };
};

export default RESET_PASSWORD;
