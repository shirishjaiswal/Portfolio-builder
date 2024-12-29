import askGenerativeAi from "@/utils/api-connections/ai/generative-ai";
import parsePDF from "@/utils/api-connections/ai/parse-pdf";
import { UploadCloud } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
const prompt =
  "You are a highly intelligent system trained to extract and organize resume information from unstructured text. Your task is to analyze the given text and segregate it into the following categories in JSON format: Contact Information: Name, Email, Phone, Address, LinkedIn Profile (or other professional links). Summary/Objective: Any summary or career objective statement. Work Experience: For each job, include:Job Title Company Name Start Date and End Date Responsibilities/Achievements (in bullet points). Education: For each education entry, include: Degree Field of Study University/Institute Name Graduation Year. Skills: List of technical and soft skills mentioned. Certifications: Certification Name, Issuing Authority, and Date of Completion. Projects: For each project, include: Project Title Description Technologies Used Role in the Project. Additional Information: Hobbies, Languages, or any other relevant details.";
const PDFUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [parsedText, setParsedText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file to upload");
      return;
    }
    const fileSizeInMB = file.size / (1024 * 1024);

    if (fileSizeInMB > 0.5) {
      setError("File size should be less than 500kb");
      return;
    }

    setLoading(true);
    setError(null);
    setUploadProgress(0);

    try {
      const response = await parsePDF(file);

      if (!response?.data) throw new Error(response?.error);

      setUploadProgress(100);
      setParsedText(response.data);

      const genai = await askGenerativeAi(`prompt : ${prompt} Question : ${response.data}`, [], "application/json");

      if (!genai?.data) throw new Error(genai?.error);
      setParsedText(genai.data);
      console.log("Shirish",JSON.parse(genai.data));
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-50p mx-auto p-4 border rounded-lg bg-gray-50">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex flex-col items-center justify-center p-2 bg-gray-50 rounded-lg shadow-xl">
          <label
            htmlFor="file-input"
            className="flex flex-col items-center justify-center w-11/12 h-1/2 bg-white m-2 hover:bg-blue-50 text-gray-700 rounded-lg cursor-pointer border-2 border-gray-300 border-opacity-50 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <UploadCloud size={40} className="text-sky-500" />
            <span className="text-medium font-medium justify-center text-center">
              {file ? (
                file.name
              ) : error ? (
                <span className="text-red-500">{error}</span>
              ) : (
                "Drag & Drop or Click to Upload PDF"
              )}
            </span>

            <input
              id="file-input"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {/* Optional: Display selected file name */}
          {file && (
            <div className="mt-4 text-gray-700 text-sm font-medium">
              File ready to upload: <strong>{file.name}</strong>
            </div>
          )}
        </div>

        {loading && (
          <div className="mb-4 text-center">
            <progress
              value={uploadProgress}
              max={100}
              className="w-full h-2 mb-2 bg-gray-200 rounded-full"
            />
            <span>{`Uploading: ${uploadProgress}%`}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full px-3 py-2 text-white rounded-md font-semibold focus:outline-none transition transform ${
            loading ? "bg-gray-500 cursor-not-allowed" : " bg-teal-600"
          }`}
        >
          {loading ? "Uploading..." : "Upload Resume"}
        </button>
      </form>
      {parsedText && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Parsed Text:</h3>
          <pre className="bg-gray-100 p-4 rounded-md whitespace-pre-wrap break-words">{parsedText}</pre>
        </div>
      )}
    </div>
  );
};

export default PDFUploader;
