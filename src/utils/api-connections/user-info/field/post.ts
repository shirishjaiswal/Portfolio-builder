"use client";

import fetchData from "@/endpoints/next";
import { UserInfoField_OP } from "@/components/app/user/profile-configuration/type";
import Payload from "@/utils/api-connections/Payload";
import POST from "@/endpoints/next/user-info/field/post";
import { POST_USER_INFO_FIELD_TYPE } from "@/endpoints/spring-boot/user_info/field/post";

const postUserInfoField = async (userInfoField : UserInfoField_OP, userInfoParentId : number) => {

  const payload : POST_USER_INFO_FIELD_TYPE = Payload.postUserInfoField(userInfoField, userInfoParentId);

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

export default postUserInfoField;