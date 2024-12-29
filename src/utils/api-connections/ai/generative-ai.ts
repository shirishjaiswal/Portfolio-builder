"use client";

import fetchData from "@/endpoints/next";
import GENERATIVE_AI, { HistoryItem } from "@/endpoints/next/ai/generative-ai";
import Payload from "@/utils/api-connections/Payload";

const askGenerativeAi = async (
  inputText: string,
  history: HistoryItem[],
  responseType: "text/plain" | "application/json"
) => {
  let fetchResponse;
  try {
    fetchResponse = await fetchData({
      connection: GENERATIVE_AI(
        Payload.generativeAi(inputText, history, responseType)
      ),
    });
  } catch (error) {
    console.log("Log the error");
  }
  return fetchResponse;
};

export default askGenerativeAi;
