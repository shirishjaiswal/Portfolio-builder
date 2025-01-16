"use client";
import { useRef } from "react";
// @ts-ignore
import html2pdf from 'html2pdf.js';

const ResumeMain = () => {
  const resumeRef = useRef(null);

  const handleDownloadPDF = () => {
    const element = resumeRef.current;
    const options = {
      margin: [0, 0, 0, 0], // No margins
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 3, // Higher scale for better quality
        useCORS: true, // Allow cross-origin images
      },
      jsPDF: {
        unit: "px",
        format: [element.offsetWidth, element.offsetHeight], // Match dimensions
        orientation: "portrait", // Portrait orientation
      },
    };
  
    html2pdf().set(options).from(element).save();
  };
  

  return (
    <>
      <div className="container mx-auto p-8">
        <button
          onClick={handleDownloadPDF}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Download as PDF
        </button>
        <div
          ref={resumeRef}
          className="bg-white shadow-lg rounded-lg p-8"
          style={{
            width: '794px', // A4 width at 96 DPI
            height: '1123px', // A4 height at 96 DPI
            margin: 0, // Center the div
            overflow: 'hidden', // Prevent content overflow
          }}
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">Shirish Jaiswal</h1>
            <p className="text-gray-600">
              Github | Portfolio | LinkedIn | shirishjaiswal03@gmail.com | +91
              9767006368
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b-2 border-gray-800 inline-block mb-4">
              Experience
            </h2>
            <ul className="list-disc list-inside">
              <li>
                <strong>Software Developer</strong> - Hummingbird Web Solutions,
                India (Nov 2023 - Present)
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b-2 border-gray-800 inline-block mb-4">
              Projects
            </h2>
            <div className="mb-4">
              <strong>FHC (Frameless Hardware Company) - POC</strong>
              <ul className="list-disc list-inside">
                <li>Conducted Proof of Concept (POC) for the FHC project.</li>
                <li>
                  Collaborated with stakeholders for seamless API integration
                  and feature validation.
                </li>
              </ul>
            </div>
            <div className="mb-4">
              <strong>Duke Manufacturing</strong>
              <ul className="list-disc list-inside">
                <li>
                  Full Stack Developer focusing on frontend (Next.js) and
                  backend (Magento).
                </li>
                <li>
                  Optimized website performance and integrated multiple systems.
                </li>
              </ul>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b-2 border-gray-800 inline-block mb-4">
              Responsibilities
            </h2>
            <ul className="list-disc list-inside">
              <li>POC of client requirements to ensure feasibility.</li>
              <li>Documentation of code (Developer Docs).</li>
              <li>Led the Duke project and reviewed team code.</li>
              <li>
                Resolved technical challenges and collaborated with senior
                members.
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b-2 border-gray-800 inline-block mb-4">
              Achievements
            </h2>
            <ul className="list-disc list-inside">
              <li>Performer of the Quarter (April-June 2024).</li>
              <li>Certified in Java through HackerRank.</li>
              <li>Gold Badge in Java on HackerRank.</li>
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b-2 border-gray-800 inline-block mb-4">
              Personal Projects
            </h2>
            <div className="mb-4">
              <strong>QuizzyTron UI</strong>
              <ul className="list-disc list-inside">
                <li>Developed UI designs using Figma.</li>
              </ul>
            </div>
            <div className="mb-4">
              <strong>QuizzyTron - Web Application</strong>
              <ul className="list-disc list-inside">
                <li>Created a web platform with Spring Boot and Java.</li>
              </ul>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b-2 border-gray-800 inline-block mb-4">
              Technical Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-200 px-3 py-1 rounded-full">Java</span>
              <span className="bg-gray-200 px-3 py-1 rounded-full">
                TypeScript
              </span>
              <span className="bg-gray-200 px-3 py-1 rounded-full">
                Javascript
              </span>
              <span className="bg-gray-200 px-3 py-1 rounded-full">HTML</span>
              <span className="bg-gray-200 px-3 py-1 rounded-full">CSS</span>
              <span className="bg-gray-200 px-3 py-1 rounded-full">
                Spring Boot
              </span>
              <span className="bg-gray-200 px-3 py-1 rounded-full">
                Next.js
              </span>
              <span className="bg-gray-200 px-3 py-1 rounded-full">React.js</span>
              <span className="bg-gray-200 px-3 py-1 rounded-full">
                Tailwind CSS
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold border-b-2 border-gray-800 inline-block mb-4">
              Education
            </h2>
            <table className="w-full border border-gray-300 text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Degree</th>
                  <th className="border border-gray-300 px-4 py-2">Institute</th>
                  <th className="border border-gray-300 px-4 py-2">Year</th>
                  <th className="border border-gray-300 px-4 py-2">Grade</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">
                    Bachelor of Technology
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    Maharashtra Institute of Technology, Aurangabad
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    2018-2021
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    GPA: 7.43/10
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Diploma</td>
                  <td className="border border-gray-300 px-4 py-2">
                    T.B. Girwalkar, Ambajogai
                  </td>
                  <td className="border border-gray-300 px-4 py-2">2015-2018</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Percent: 76.18%
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">SSC</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Shri Chintamani Foundation School, Parli
                  </td>
                  <td className="border border-gray-300 px-4 py-2">2015</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Percent: 78.60%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeMain;