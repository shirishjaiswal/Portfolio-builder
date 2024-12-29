import { Connection } from "@/endpoints/spring-boot";

const DELETE_USER_INFO_GROUP = (userInfoGroupId: number): Connection => {
  return {
    method: "DELETE",
    endpoint: `/admin/user-info-group/${userInfoGroupId}`,
  };
};

export default DELETE_USER_INFO_GROUP;