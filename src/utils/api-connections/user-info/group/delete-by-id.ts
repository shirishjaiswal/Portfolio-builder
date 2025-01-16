"use client";

import fetchData from "@/endpoints/next";
import DELETE_BY_ID from "@/endpoints/next/user-info/group/delete-by-id";

const deleteUserInfoGroupById = async (userInfoGroupId : number) => {
  let fetchResponse;
  try {
    fetchResponse = await fetchData({
      connection: DELETE_BY_ID(userInfoGroupId),
    });
  } catch (error) {
    console.log(error);
  }
  return fetchResponse;
};

export default deleteUserInfoGroupById;