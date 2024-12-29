import { Connection } from "@/endpoints/next";
import { POST_USER_INFO_FIELD_TYPE } from "@/endpoints/spring-boot/admin/post-user-info-field";

const POST_USER_INFO_FIELD = (
  payload: POST_USER_INFO_FIELD_TYPE
): Connection => {
  return {
    method: "POST",
    endpoint: "/api/admin/post-user-info-field",
    payload: payload,
  };
};

export default POST_USER_INFO_FIELD;