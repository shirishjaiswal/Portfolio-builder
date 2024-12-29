"use client";

import { UserProfileDetilsGroup } from "@/components/app/user/profile/types";
import fetchData from "@/endpoints/next";
import POST_USER_PROFILE_DATA from "@/endpoints/next/user/post-user-profile-data";

const postUserProfileData = async (userProfileDetilsGroup : UserProfileDetilsGroup[]) => {
  let fetchResponse;
  try {
    fetchResponse = await fetchData({
      connection: POST_USER_PROFILE_DATA(userProfileDetilsGroup),
    });
  } catch (error) {
    console.log(error);
  }
  return fetchResponse;
};

export default postUserProfileData;