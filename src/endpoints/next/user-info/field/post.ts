import { Connection } from "@/endpoints/next";
import { POST_USER_INFO_FIELD_TYPE } from "@/endpoints/spring-boot/user_info/field/post";

const POST_USER_INFO_FIELD = (
  payload: POST_USER_INFO_FIELD_TYPE
): Connection => {
  return {
    method: "POST",
    endpoint: "/api/user-info/field/post",
    payload: payload,
  };
};

export default POST_USER_INFO_FIELD;