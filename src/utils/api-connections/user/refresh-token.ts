"use server";

import fetchData from "@/endpoints/spring-boot";
import REFRESH_TOKEN from "@/endpoints/spring-boot/user/refresh-token";
import { cookies } from "next/headers";

const refreshCookies = async () => {
  let fetchResponse;
  try {
    fetchResponse = await fetchData({
      connection: REFRESH_TOKEN(),
      token: cookies().get("pb_refresh_token")?.value,
    });
  } catch (error) {
    console.log(error);
  }
  return fetchResponse;
};

export default refreshCookies;
