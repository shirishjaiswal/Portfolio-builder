"use server";

import fetchData from "@/endpoints/spring-boot";
import FORGOT_PASSWORD from "@/endpoints/spring-boot/auth/forgot-password";

const forgotPasswordRequest = async (email: string) => {
  let fetchResponse;
  try {
    fetchResponse = await fetchData({
      connection: FORGOT_PASSWORD(email),
    });
  } catch (error) {
    console.error("Log the error");
  }
  return fetchResponse;
};

export default forgotPasswordRequest;