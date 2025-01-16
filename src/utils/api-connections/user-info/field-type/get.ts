"use client";

import fetchData from "@/endpoints/next";
import GET from "@/endpoints/next/user-info/field-type/get";

const getUserInfoFieldTypes = async () => {
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

export default getUserInfoFieldTypes;
