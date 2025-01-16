"use client";

import fetchData from "@/endpoints/next";
import RESET_PASSWORD from "@/endpoints/next/user-account/reset-password";

const resetPassword = async (
  oldPassword: string,
  newPassword: string,
  confirmPassword: string
) => {
  let fetchResponse;
  try {
    fetchResponse = await fetchData({
      connection: RESET_PASSWORD(oldPassword, newPassword, confirmPassword),
    });
  } catch (error) {
    console.error("Log the error");
  }
  return fetchResponse;
};

export default resetPassword;
