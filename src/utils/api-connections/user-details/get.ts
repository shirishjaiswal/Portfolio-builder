"use client";

import fetchData from "@/endpoints/next";
import GET from "@/endpoints/next/user-details/get";

const getUserDetails = async () => {
  let fetchResponse;
  try {
    fetchResponse = await fetchData({
      connection: GET(),
    });
  } catch (error) {
    console.log(error);
  }
  return fetchResponse;
};

export default getUserDetails;