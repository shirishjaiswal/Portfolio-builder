"use client";

import fetchData from "@/endpoints/next";
import DELETE_ACCOUNT from "@/endpoints/next/user-account/delete-account";

const deleteUser = async (
  password: string
) => {
  let fetchResponse;
  try {
    fetchResponse = await fetchData({
      connection: DELETE_ACCOUNT(password),
    });
  } catch (error) {
    console.error("Log the error");
  }
  return fetchResponse;
};

export default deleteUser;
