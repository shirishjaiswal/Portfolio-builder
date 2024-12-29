import { Connection } from "@/endpoints/spring-boot";

const REFRESH_TOKEN = () : Connection => {
  return {
    method: "GET",
    endpoint: "/user/refresh-token",
  };
};

export default REFRESH_TOKEN;