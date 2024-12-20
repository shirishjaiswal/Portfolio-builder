"use client";

import Payload from "@/utils/api-connections/Payload";
import LOGIN from "@/endpoints/next/auth/login";
import fetchData from "@/endpoints/next";

const login = async (email: string, password: string) => {
  let fetchResponse;

  try {
    fetchResponse = await fetchData({
      connection: LOGIN(Payload.login(email, password)),
    });
  } catch (error) {
    console.log("Log the error");
  }
  return fetchResponse;
};

export default login;
