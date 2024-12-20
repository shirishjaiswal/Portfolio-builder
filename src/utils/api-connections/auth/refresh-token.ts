import Payload from "@/utils/api-connections/Payload";
import fetchData from "@/endpoints/next";
import REFRESH_TOKEN from "@/endpoints/next/auth/refresh-token";

const refreshCookies = async (refreshToken: string) => {
  let fetchResponse;
  try {
    fetchResponse = await fetchData({
      connection: REFRESH_TOKEN(Payload.refreshToken(refreshToken)),
    });
  } catch (error) {
    console.log(error);
  }
  return fetchResponse;
};

export default refreshCookies;
