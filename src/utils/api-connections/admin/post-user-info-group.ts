"use client";

import fetchData from "@/endpoints/next";
import { UserInfoGroup_OP } from "@/components/app/user/profile-configuration/type";
import POST_USER_INFO_GROUP from "@/endpoints/next/admin/post-user-info-group";

const postUserInfoGroup = async (payload : UserInfoGroup_OP) => {
  let fetchResponse;

  try {
    fetchResponse = await fetchData({
      connection: POST_USER_INFO_GROUP(payload),
    });
  } catch (error) {
    console.log(error);
  }
  return fetchResponse;
};

export default postUserInfoGroup;