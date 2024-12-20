"use client";

import fetchData from "@/endpoints/next";
import GET_USER_DETAILS_FIELD_INPUT_TYPE from "@/endpoints/next/admin/get-user-details-field-input-type";

const userDetailsFieldInputType = async () => {
  let fetchResponse;

  try {
    fetchResponse = await fetchData({
      connection: GET_USER_DETAILS_FIELD_INPUT_TYPE(),
    });
  } catch (error) {
    console.log(error);
  }
  console.log(fetchResponse);
  return fetchResponse;
};

export default userDetailsFieldInputType;
