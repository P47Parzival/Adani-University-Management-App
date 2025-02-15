import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

const StudentCalendarPage = () => {
  const [data, setData] = useState([]);
  const [fileUrl, setFileUrl] = useState("");

  useEffect(() => {
    fetchLatestFile();
  }, []);

  const fetchLatestFile = async () => {
    try {
      const response = await axios.get("http://localhost:3000/calender/latest-file");
      const filePath = `http://localhost:3000${response.data.filePath}`;
      setFileUrl(filePath);
      fetchAndParseExcel(filePath);
    } catch (error) {
      console.error("Error fetching file:", error);
    }
  };

  const fetchAndParseExcel = async (fileUrl) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.arrayBuffer();
      const workbook = XLSX.read(blob, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      setData(parsedData);
    } catch (error) {
      console.error("Error parsing Excel file:", error);
    }
  };

  return (
    <div className="max-h-screen flex flex-col items-center justify-center p-6">
      <div className="bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">📅 Student Calendar</h2>

        {fileUrl && (
          <p className="mb-4 text-blue-600 underline">
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
              🔗 Download Latest File
            </a>
          </p>
        )}

        {data.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 shadow-md">
              <thead className="bg-blue-500 text-white">
                <tr>
                  {data[0].map((col, index) => (
                    <th key={index} className="px-4 py-2 border">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex} className="bg-white hover:bg-gray-100">
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="px-4 py-2 border text-center">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">⚠ No calendar uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default StudentCalendarPage;
