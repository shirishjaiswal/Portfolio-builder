"use client";

import fetchData from "@/endpoints/next";
import { UserInfoField_OP } from "@/components/app/user/profile-configuration/type";
import Payload from "@/utils/api-connections/Payload";
import { POST_USER_INFO_FIELD_TYPE } from "@/endpoints/spring-boot/admin/post-user-info-field";
import POST_USER_INFO_FIELD from "@/endpoints/next/admin/post-user-info-field";

const postUserInfoField = async (userInfoField : UserInfoField_OP, userInfoParentId : number, userInfoGroupId : number) => {

  const payload : POST_USER_INFO_FIELD_TYPE = Payload.postUserInfoField(userInfoField, userInfoParentId);

  let fetchResponse;

  try {
    fetchResponse = await fetchData({
      connection: POST_USER_INFO_FIELD(payload),
    });
  } catch (error) {
    console.log(error);
  }
  return fetchResponse;
};

export default postUserInfoField;