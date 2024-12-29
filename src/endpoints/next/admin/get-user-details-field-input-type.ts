import { Connection } from "@/endpoints/next";

const GET_USER_DETAILS_FIELD_INPUT_TYPE = () : Connection => {
  return {
    method: "GET",
    endpoint: "/api/admin/user-detail-field-input-type",
  };
};

export default GET_USER_DETAILS_FIELD_INPUT_TYPE;