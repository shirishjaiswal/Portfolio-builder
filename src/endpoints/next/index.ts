"use client";

interface Config {
  method: string;
  url: string;
  headers: Headers;
  body?: unknown;
}

export type Connection = {
  method: string;
  endpoint: string;
  payload?: unknown;
  stringifyBody?: boolean;
};

type Headers = {
  [key: string]: string;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Response = {
  data: any | null;
  error: any | null;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
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
    const DOMAIN = ""; // Specify your domain or API base URL here
    const ENDPOINT = `${DOMAIN}/${connection.endpoint.replace(/^\//, "")}`;

    // Default headers, allowing for overrides
    const finalHeaders: Headers = {
      "Content-Type": "application/json",
      ...headers,
    };

    // Add the Authorization header if a token is provided
    if (token) {
      finalHeaders["Authorization"] = `Bearer ${token}`;
    }

    // Prepare the request config
    const config: Config = {
      method: connection.method,
      url: ENDPOINT,
      headers: finalHeaders,
    };

    // Handle file upload (FormData)
    if (connection.payload instanceof FormData) {
      // If the payload is FormData, we don't set Content-Type manually
      delete config.headers["Content-Type"];
      config.body = connection.payload;
    } else if (connection.payload) {
      // If the payload is JSON, stringify it
      config.body = JSON.stringify(connection.payload);
    } else if (connection.payload) {
      // If there's a payload and we don't stringify it, pass it directly
      config.body = connection.payload;
    }

    console.log("Request config:", config);

    // Send the request
    const response = await fetch(config.url, {
      method: config.method,
      headers: config.headers,
      body: config.body as RequestInit["body"],
    });

    // Handle JSON responses
    const contentType = response.headers.get("Content-Type");

    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();

      result = { data: data?.data ?? null, error: data?.error ?? null };
    } else {
      // Handle non-JSON responses 
      const text = await response.text();
      result = { data: text, error: null };
    }
  } catch (error) {
    console.error("Request failed:", error);
    result = { data: null, error: error instanceof Error ? error.message : "Something went wrong" };
  }

  return result;
};

export default fetchData;
