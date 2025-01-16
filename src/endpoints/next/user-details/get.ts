import { Connection } from "@/endpoints/next";

const GET = () : Connection => {
  return {
    method: "GET",
    endpoint: `/api/user-details/get`,
  };
};

export default GET;