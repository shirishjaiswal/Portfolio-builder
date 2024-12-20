import { UserInfoGroup_OP } from "@/components/app/user/profile-configuration/type";
import { Connection } from "@/endpoints/next";

const POST_USER_INFO_GROUP = (payload : UserInfoGroup_OP): Connection => {
  return {
    method: "POST",
    endpoint: "/api/admin/post-user-info-group",
    payload: payload
  };
};

export default POST_USER_INFO_GROUP;