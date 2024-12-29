"use client";

import fetchData from "@/endpoints/next";
import PARSE_PDF from "@/endpoints/next/ai/parse-pdf";
import Payload from "@/utils/api-connections/Payload";

const parsePDF = async (file: File) => {
  let fetchResponse;

  try {
    fetchResponse = await fetchData({
      connection: PARSE_PDF(Payload.parsePDF(file)),
    });
  } catch (error) {
    console.log("Log the error");
  }
  return fetchResponse;
};

export default parsePDF;
