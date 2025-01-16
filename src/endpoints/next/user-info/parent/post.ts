import { Connection } from "@/endpoints/next";
import { POST_USER_INFO_PARENT_TYPE } from "@/endpoints/spring-boot/user_info/parent/post";

const POST = (
  payload: POST_USER_INFO_PARENT_TYPE
): Connection => {
  return {
    method: "POST",
    endpoint: "/api/user-info/parent/post",
    payload: payload,
  };
};

export default POST;
