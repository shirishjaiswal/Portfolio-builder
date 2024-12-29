"use client";

import fetchData from "@/endpoints/next";
import DELETE_USER_INFO_GROUP from "@/endpoints/next/admin/delete-user-info-group";

const deleteUserInfoGroup = async (userInfoGroupId : number) => {
  let fetchResponse;
  try {
    fetchResponse = await fetchData({
      connection: DELETE_USER_INFO_GROUP(userInfoGroupId),
    });
  } catch (error) {
    console.log(error);
  }
  return fetchResponse;
};

export default deleteUserInfoGroup;