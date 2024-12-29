"use client";

import FileUpload from "@/components/app/user/home/pdfUploader";
import GenerativeAI from "./ai";

const Home = () => {
  return (
    <main className="flex flex-col">
      <FileUpload />
      <GenerativeAI />
    </main>
  );
};

export default Home;
