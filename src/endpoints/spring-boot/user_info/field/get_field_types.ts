import { Connection } from "@/endpoints/spring-boot";

const GET_USER_INFO_FIELD_TYPES = () : Connection => {
  return {
    method: "GET",
    endpoint: "/user-info-field/types",
  };
};

export default GET_USER_INFO_FIELD_TYPES;