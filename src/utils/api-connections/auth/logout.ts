"use client";

import fetchData from "@/endpoints/next";
import LOGOUT from "@/endpoints/next/auth/logout";
import { toast } from "sonner";

const logout = async () => {
  let fetchResponse;

  try {
    fetchResponse = await fetchData({
      connection: LOGOUT(),
    });
  } catch (error) {
    toast.error("Logout error:");
  }
  return fetchResponse;
};

export default logout;
