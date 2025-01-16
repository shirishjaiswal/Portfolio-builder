"use client";

import fetchData from "@/endpoints/next";
import { UserInfoParent_OP } from "@/components/app/user/profile-configuration/type";
import Payload from "@/utils/api-connections/Payload";
import POST from "@/endpoints/next/user-info/parent/post";
import { POST_USER_INFO_PARENT_TYPE } from "@/endpoints/spring-boot/user_info/parent/post";

const postUserInfoParent = async (userInfoParent : UserInfoParent_OP, userInfoGroupId : number) => {

  const payload : POST_USER_INFO_PARENT_TYPE = Payload.postUserInfoParent(userInfoParent, userInfoGroupId);
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

export default postUserInfoParent;