import { PAYLOAD } from "@/app/api/user-details/put/route";
import { Connection } from "@/endpoints/next";

const PUT = (firstName: string, lastName: string, phoneNumber: string) : Connection => {

  console.log(firstName, lastName, phoneNumber);
  const payload : PAYLOAD = {
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber
  }

  console.log("payload", payload);

  return {
    method: "PUT",
    endpoint: `/api/user-details/put`,
    payload: payload
  };
};

export default PUT;