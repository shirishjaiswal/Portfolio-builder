import { Connection } from "@/endpoints/spring-boot";

const GET_USER_DETAILS_FIELD_INPUT_TYPE = () : Connection => {
  return {
    method: "GET",
    endpoint: "/admin/user-detail-field-input-type",
  };
};

export default GET_USER_DETAILS_FIELD_INPUT_TYPE;