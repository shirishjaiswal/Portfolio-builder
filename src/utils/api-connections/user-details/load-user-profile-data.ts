"use client";

import fetchData from "@/endpoints/next";
import LOAD_USER_PROFILE_DATA from "@/endpoints/next/user-details/load-user-profile-data";

const loadUserProfileData = async () => {
  let fetchResponse;
  try {
    fetchResponse = await fetchData({
      connection: LOAD_USER_PROFILE_DATA(),
    });
  } catch (error) {
    console.log(error);
  }
  return fetchResponse;
};

export default loadUserProfileData;