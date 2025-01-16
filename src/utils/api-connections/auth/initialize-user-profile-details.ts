"use client";

import { UserDetailsType } from "@/context/user-settings-context";
import fetchData from "@/endpoints/next";
import INITIALIZE_USER_PROFILE_DETAILS from "@/endpoints/next/auth/initialize-user-profile-details";

const initializeUserProfileDetails = async (
  userEntity: UserDetailsType
) => {
  let fetchResponse;
  try {
    fetchResponse = await fetchData({
      connection: INITIALIZE_USER_PROFILE_DETAILS(userEntity),
    });
  } catch (error) {
    console.error("Log the error");
  }
  return fetchResponse;
};

export default initializeUserProfileDetails;