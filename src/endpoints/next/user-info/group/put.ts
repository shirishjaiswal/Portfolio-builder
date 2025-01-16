import { UserInfoGroup_OP } from "@/components/app/user/profile-configuration/type";
import { Connection } from "@/endpoints/next";

const PUT = (payload : UserInfoGroup_OP): Connection => {
  return {
    method: "PUT",
    endpoint: "/api/user-info/group/put",
    payload: payload
  };
};

export default PUT;