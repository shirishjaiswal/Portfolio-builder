import { UserInfoField_OP } from "@/components/app/user/profile-configuration/type";
import { Connection } from "@/endpoints/spring-boot";

const PUT_USER_INFO_GROUP = (userInfoGroup : UserInfoField_OP): Connection => {
  return {
    method: "PUT",
    endpoint: "/user-info-group/update",
    payload: userInfoGroup
  };
};

export default PUT_USER_INFO_GROUP;