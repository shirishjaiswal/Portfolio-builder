"use server";

import fetchData from "@/endpoints/spring-boot";
import VERIFY_EMAIL from "@/endpoints/spring-boot/auth/verify-email";

const verifyMail = async (email: string, token: string) => {
  let fetchResponse;
  try {
    fetchResponse = await fetchData({
      connection: VERIFY_EMAIL(email, token),
    });
  } catch (error) {
    console.error("Log the error");
  }
  return fetchResponse;
};

export default verifyMail;
