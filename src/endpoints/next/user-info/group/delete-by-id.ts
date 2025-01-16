import { Connection } from "@/endpoints/next";

const DELETE_BY_ID = (userInfoGroupId : number) : Connection => {
  return {
    method: "DELETE",
    endpoint: `/api/user-info/group/delete/${userInfoGroupId}`,
  };
}

export default DELETE_BY_ID;