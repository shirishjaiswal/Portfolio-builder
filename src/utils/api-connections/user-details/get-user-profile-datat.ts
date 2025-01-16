"use client";

import fetchData from "@/endpoints/next";
import GET_USER_PROFILE_DATA from "@/endpoints/next/user-details/get-user-profile-data";

const getUserProfileData = async () => {
  let fetchResponse;
  try {
    fetchResponse = await fetchData({
      connection: GET_USER_PROFILE_DATA(),
    });
  } catch (error) {
    console.log(error);
  }
  return fetchResponse;
};

export default getUserProfileData;