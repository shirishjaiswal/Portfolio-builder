"use client";

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

  try {
    const DOMAIN = "";

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

    const data = await response.json();

    console.log("data", data);
    result = { data: data?.data ?? null, error: data?.error ?? null };
  } catch (error) {
    console.log("error", error);
    result = { data: null, error: error ?? "Something went wrong" };
  }

  return result;
};

export default fetchData;
