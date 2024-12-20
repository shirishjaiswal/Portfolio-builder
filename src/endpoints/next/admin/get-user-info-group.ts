import { Connection } from "@/endpoints/next";

const GET_USER_INFO_GROUP = (): Connection => {
  return {
    method: "GET",
    endpoint: "/api/admin/get-user-info-group",
  };
};

export default GET_USER_INFO_GROUP;