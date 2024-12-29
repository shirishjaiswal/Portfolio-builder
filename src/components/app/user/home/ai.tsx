import { HistoryItem } from "@/endpoints/next/ai/generative-ai";
import askGenerativeAi from "@/utils/api-connections/ai/generative-ai";
import { LoaderPinwheel, Send } from "lucide-react";
import { useState } from "react";

const GenerativeAI = () => {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<HistoryItem[]>([]); // Chat history with 'role' and 'parts'

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const res = await askGenerativeAi(inputText, chatHistory, "text/plain");

      if (!res?.data) throw new Error(res?.error);

      setChatHistory((prevHistory) => [
        ...prevHistory,
        { role: "user", parts: [{ text: inputText }] },
        { role: "model", parts: [{ text: res.data }] },
      ]);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center bg-slate-500 rounded-2xl drop-shadow-2xl h-90p">
      <h1 className="text-2xl font-bold mb-4">Generative AI Chat</h1>

      <div className="w-90p h-90p max-h-80 overflow-y-auto border border-gray-300 rounded-lg p-3">
        <h2>Chat History:</h2>
        {chatHistory.map((entry, index) => (
          <div key={index} className="mb-2">
            <strong>{entry.role === "user" ? "You" : "AI"}:</strong>{" "}
            <span>{entry.parts[0].text}</span>
          </div>
        ))}
      </div>

      {/* Error Handling */}
      {error && <div className="text-red-300">{error}</div>}

      <form onSubmit={handleSubmit} className="flex w-90p justify-center items-center gap-4">
        <textarea
          className="w-90p min-h-5p rounded-lg p-2 mb-4"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter your input here"
          rows={4}
          cols={50}
        />
        <button
          type="submit"
          className="transition-transform duration-300 max-h-min hover:scale-150 hover:rounded-full"
          id="save-button"
        >
          {loading ? (
            <LoaderPinwheel size={26} color="#f1f5f9" />
          ) : (
            <Send size={26} color="#f1f5f9" />
          )}
        </button>
      </form>
    </div>
  );
};

export default GenerativeAI;
