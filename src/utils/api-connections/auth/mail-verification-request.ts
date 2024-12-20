"use server";

import fetchData from "@/endpoints/spring-boot";
import MAIL_VERIFICATION_REQUEST from "@/endpoints/spring-boot/auth/mail-verification-request";

const mailVerificationRequest = async (email: string) => {
  let fetchResponse;
  try {
    fetchResponse = await fetchData({
      connection: MAIL_VERIFICATION_REQUEST(email),
    });
  } catch (error) {
    console.error("Login error:", error);
  }
  return fetchResponse;
};

export default mailVerificationRequest;
