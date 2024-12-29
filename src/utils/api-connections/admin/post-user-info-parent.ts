"use client";

import fetchData from "@/endpoints/next";
import { UserInfoParent_OP } from "@/components/app/user/profile-configuration/type";
import Payload from "@/utils/api-connections/Payload";
import POST_USER_INFO_PARENT from "@/endpoints/next/admin/post-user-info-parent";
import { POST_USER_INFO_PARENT_TYPE } from "@/endpoints/spring-boot/admin/post-user-info-parent";

const postUserInfoParent = async (userInfoParent : UserInfoParent_OP, userInfoGroupId : number) => {

  const payload : POST_USER_INFO_PARENT_TYPE = Payload.postUserInfoParent(userInfoParent, userInfoGroupId);
  let fetchResponse;
  try {
    fetchResponse = await fetchData({
      connection: POST_USER_INFO_PARENT(payload),
    });
  } catch (error) {
    console.log(error);
  }
  return fetchResponse;
};

export default postUserInfoParent;