import { Connection } from "@/endpoints/next";
import { POST_USER_INFO_PARENT_TYPE } from "@/endpoints/spring-boot/admin/post-user-info-parent";

const POST_USER_INFO_PARENT = (
  payload: POST_USER_INFO_PARENT_TYPE
): Connection => {
  return {
    method: "POST",
    endpoint: "/api/admin/post-user-info-parent",
    payload: payload,
  };
};

export default POST_USER_INFO_PARENT;
