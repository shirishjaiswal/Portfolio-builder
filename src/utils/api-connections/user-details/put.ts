"use client";

import fetchData from "@/endpoints/next";
import PUT from "@/endpoints/next/user-details/put";

const putUserDetails = async (firstName: string, lastName: string, phoneNumber: string) => {
  let fetchResponse;
  try {
    fetchResponse = await fetchData({
      connection: PUT(firstName, lastName, phoneNumber),
    });
  } catch (error) {
    console.log(error);
  }
  return fetchResponse;
};

export default putUserDetails;