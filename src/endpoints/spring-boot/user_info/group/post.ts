import { UserInfoField_OP } from "@/components/app/user/profile-configuration/type";
import { Connection } from "@/endpoints/spring-boot";


const POST_USER_INFo_GROUP = (userInfoGroup : UserInfoField_OP): Connection => {
  return {
    method: "POST",
    endpoint: "/user-info-group/save",
    payload: userInfoGroup
  };
};

export default POST_USER_INFo_GROUP;