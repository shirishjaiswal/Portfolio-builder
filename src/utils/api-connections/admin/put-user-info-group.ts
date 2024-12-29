"use client";

import fetchData from "@/endpoints/next";
import { UserInfoGroup_OP } from "@/components/app/user/profile-configuration/type";
import PUT_USER_INFO_GROUP from "@/endpoints/next/admin/put-user-info-group";

const putUserInfoGroup = async (payload : UserInfoGroup_OP) => {
  let fetchResponse;
  try {
    fetchResponse = await fetchData({
      connection: PUT_USER_INFO_GROUP(payload),
    });
  } catch (error) {
    console.log(error);
  }
  return fetchResponse;
};

export default putUserInfoGroup;