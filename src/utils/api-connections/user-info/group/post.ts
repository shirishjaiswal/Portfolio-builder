"use client";

import fetchData from "@/endpoints/next";
import { UserInfoGroup_OP } from "@/components/app/user/profile-configuration/type";
import POST from "@/endpoints/next/user-info/group/post";

const postUserInfoGroup = async (payload : UserInfoGroup_OP) => {
  let fetchResponse;
  try {
    fetchResponse = await fetchData({
      connection: POST(payload),
    });
  } catch (error) {
    console.log(error);
  }
  return fetchResponse;
};

export default postUserInfoGroup;