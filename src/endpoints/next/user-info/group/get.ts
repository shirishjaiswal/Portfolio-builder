import { Connection } from "@/endpoints/next";

const GET = (): Connection => {
  return {
    method: "GET",
    endpoint: "/api/user-info/group/get",
  };
};

export default GET;