"use client";

import fetchData from "@/endpoints/next";
import REGISTER_USER from "@/endpoints/next/auth/register-user";
import Payload from "@/utils/api-connections/Payload";

const register = async (
  email: string,
  password: string,
  confirmPassword: string
) => {
  let fetchResponse;
  try {
    fetchResponse = await fetchData({
      connection: REGISTER_USER(
        Payload.register(email, password, confirmPassword)
      ),
    });
  } catch (error) {
    console.error("Log the error");
  }
  return fetchResponse;
};

export default register;
