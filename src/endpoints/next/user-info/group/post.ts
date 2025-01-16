import { UserInfoGroup_OP } from "@/components/app/user/profile-configuration/type";
import { Connection } from "@/endpoints/next";

const POST = (payload : UserInfoGroup_OP): Connection => {
  return {
    method: "POST",
    endpoint: "/api/user-info/group/post",
    payload: payload
  };
};

export default POST;