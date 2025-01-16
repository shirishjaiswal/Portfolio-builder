"use client";

import fetchData from "@/endpoints/next";
import { UserInfoGroup_OP } from "@/components/app/user/profile-configuration/type";
import PUT from "@/endpoints/next/user-info/group/put";

const putUserInfoGroup = async (payload : UserInfoGroup_OP) => {
  let fetchResponse;
  try {
    fetchResponse = await fetchData({
      connection: PUT(payload),
    });
  } catch (error) {
    console.log(error);
  }
  return fetchResponse;
};

export default putUserInfoGroup;