import { UserInfoParent_OP } from "@/components/app/user/profile-configuration/type";
import { Connection } from "@/endpoints/spring-boot";

export type POST_USER_INFO_PARENT_TYPE = UserInfoParent_OP & {
  userInfoGroup: {
    id: number;
  };
};

const POST_USER_INFO_PARENT = (userInfoParent: POST_USER_INFO_PARENT_TYPE): Connection => {
  return {
    method: "POST",
    endpoint: "/user-info-parent/save",
    payload: userInfoParent
  };
};

export default POST_USER_INFO_PARENT;
