import { Connection } from "@/endpoints/spring-boot";

export type REFRESH_TOKEN_PAYLOAD_TYPE = {
  refreshToken: string
}

const REFRESH_TOKEN = (payload: REFRESH_TOKEN_PAYLOAD_TYPE) : Connection => {
  return {
    method: "POST",
    endpoint: "/auth/refresh-token",
    payload: {
      refreshToken: payload.refreshToken,
    },
  };
};

export default REFRESH_TOKEN;