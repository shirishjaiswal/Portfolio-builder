import { Connection } from "@/endpoints/next";

const DELETE_USER_INFO_GROUP = (userInfoGroupId : number) : Connection => {
  return {
    method: "DELETE",
    endpoint: `/api/admin/delete-user-info-group/${userInfoGroupId}`,
  };
}

export default DELETE_USER_INFO_GROUP;