"use client";

import fetchData from "@/endpoints/next";
import GET_USER_INFO_GROUP from "@/endpoints/next/admin/get-user-info-group";

const getUserInfoGroup = async () => {
  let fetchResponse;

  try {
    fetchResponse = await fetchData({
      connection: GET_USER_INFO_GROUP(),
    });
  } catch (error) {
    console.log(error);
  }
  return fetchResponse;
};

export default getUserInfoGroup;
