import { Connection } from "@/endpoints/spring-boot";

const DELETE_USER_INFO_GROUP_BY_ID = (userInfoGroupId: number): Connection => {
  return {
    method: "DELETE",
    endpoint: `/user-info-group/delete/${userInfoGroupId}`,
  };
};

export default DELETE_USER_INFO_GROUP_BY_ID;