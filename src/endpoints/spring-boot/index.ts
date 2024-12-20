"use server";

import { validateToken } from "@/lib/session";
import { cookies } from "next/headers";

interface Config {
  method: string;
  url: string;
  headers: Headers;
  body?: string;
}

export type Connection = {
  method: string;
  endpoint: string;
  payload?: object;
};

type Headers = {
  [key: string]: string;
};

export type Response = {
  data: any | null;
  error: any | null;
};

const fetchData = async ({
  connection,
  headers = {},
  token,
}: {
  connection: Connection;
  headers?: Headers;
  token?: string;
}): Promise<Response> => {
  let result: Response;

  if(!connection.endpoint.includes("auth") && !token) {
    const accessToken = cookies().get("pb_session_token")?.value;
    const isAccessTokenValid = await validateToken(accessToken);

    if (isAccessTokenValid) token = accessToken;
  }
  try {
    // Determine the base domain
    const DOMAIN = process.env.SERVER_ENDPOINT?.replace(/\/$/, "");

    if (!DOMAIN) {
      throw new Error(
        `Server endpoint is missing in environment variables for requests`
      );
    }

    const ENDPOINT = `${DOMAIN}/${connection.endpoint.replace(/^\//, "")}`;

    const finalHeaders: Headers = {
      "Content-Type": "application/json",
      ...headers,
    };

    if (token) {
      finalHeaders["Authorization"] = `Bearer ${token}`;
    }

    const config: Config = {
      method: connection.method,
      url: ENDPOINT,
      headers: finalHeaders,
      ...(connection.payload && { body: JSON.stringify(connection.payload) }),
    };
    console.log("config", config);
    const response = await fetch(config.url, {
      method: config.method,
      headers: config.headers,
      body: config.body,
    });
    // Parse JSON response
    const data = await response.json();
    
    result = { data: data?.data ?? null, error: data?.error?.message ?? null };
    console.log("result", result);
  } catch (error) {
    result = { data: null, error: error ?? "Something went wrong" };
  }

  return result;
};

export default fetchData;
