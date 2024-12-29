import { Connection } from "@/endpoints/next";

export type GENERATIVE_AI_PAYLOAD = {
  inputText: string;
  history: HistoryItem[];
  responseType: "text/plain" | "application/json";
};
type MessagePart = {
  text: string;
}
export type HistoryItem = {
  role: "user" | "model";
  parts: MessagePart[];
};

const GENERATIVE_AI = (payload : GENERATIVE_AI_PAYLOAD) : Connection => {
  return {
    method: "POST",
    endpoint: "/api/ai/generative-ai",
    payload: payload
  };
};

export default GENERATIVE_AI;
