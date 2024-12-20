import { Connection } from "@/endpoints/next";

const LOGOUT = () : Connection => {
  return {
    method: "POST",
    endpoint: "/api/auth/logout",
  };
};

export default LOGOUT;