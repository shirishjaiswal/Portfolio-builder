import { Connection } from "@/endpoints/next";

const PARSE_PDF = (formData: FormData): Connection => {
  return {
    method: "POST",
    endpoint: "/api/ai/parse-pdf",
    payload: formData,
    stringifyBody: true,
  };
};

export default PARSE_PDF;
