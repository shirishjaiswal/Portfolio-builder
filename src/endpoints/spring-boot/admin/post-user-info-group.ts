import { UserInfoField_OP } from "@/components/app/user/profile-configuration/type";
import { Connection } from "@/endpoints/spring-boot";

const POST_USER_INFO_GROUP = (userInfoGroup : UserInfoField_OP): Connection => {
  return {
    method: "PUT",
    endpoint: "/admin/user-info-group",
    payload: userInfoGroup
  };
};

export default POST_USER_INFO_GROUP;