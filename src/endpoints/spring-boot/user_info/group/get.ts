import { Connection } from "@/endpoints/spring-boot";

const GET_USER_INFO_GROUP = (): Connection => {
  return {
    method: "GET",
    endpoint: "/user-info-group/get",
  };
};

export default GET_USER_INFO_GROUP;
