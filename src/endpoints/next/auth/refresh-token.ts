import { Connection } from "@/endpoints/next";

export type REFRESH_TOKEN_PAYLOAD_TYPE = {
  refreshToken: string;
};

const REFRESH_TOKEN = (payload: REFRESH_TOKEN_PAYLOAD_TYPE): Connection => {
  return {
    method: "POST",
    endpoint: "/api/auth/refresh-token",
    payload: {
      refreshToken: payload.refreshToken,
    },
  };
};

export default REFRESH_TOKEN;
