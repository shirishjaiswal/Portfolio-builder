import { Connection } from "@/endpoints/next";

const DELETE_ACCOUNT = (password: string): Connection => {
  return {
    method: "PUT",
    endpoint: "/api/user-account/delete-account",
    payload: password,
  };
};

export default DELETE_ACCOUNT;
