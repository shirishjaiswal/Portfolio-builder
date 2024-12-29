import { UserInfoGroup_OP } from "@/components/app/user/profile-configuration/type";
import { Connection } from "@/endpoints/next";

const PUT_USER_INFO_GROUP = (payload : UserInfoGroup_OP): Connection => {
  return {
    method: "PUT",
    endpoint: "/api/admin/put-user-info-group",
    payload: payload
  };
};

export default PUT_USER_INFO_GROUP;