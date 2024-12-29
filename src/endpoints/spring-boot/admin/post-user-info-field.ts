import { UserInfoField_OP } from "@/components/app/user/profile-configuration/type";
import { Connection } from "@/endpoints/spring-boot";

export type POST_USER_INFO_FIELD_TYPE = UserInfoField_OP & {
  userInfoParent: {
    id: number;
  };
};

const POST_USER_INFO_FIELD = (payload : POST_USER_INFO_FIELD_TYPE): Connection => {
  return {
    method: "POST",
    endpoint: "/admin/user-info-field",
    payload: payload
  };
};

export default POST_USER_INFO_FIELD;