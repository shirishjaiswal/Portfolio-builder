import { Connection } from "@/endpoints/next";

const GET = () : Connection => {
  return {
    method: "GET",
    endpoint: "/api/user-info/field-type",
  };
};

export default GET;