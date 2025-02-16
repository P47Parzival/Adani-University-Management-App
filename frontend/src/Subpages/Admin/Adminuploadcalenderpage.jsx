// import React, { useState } from "react";
// import axios from "axios";

// const AdminUploadCalendar = () => {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState("");

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setMessage("Please select a file.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await axios.post("http://localhost:3000/calender", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setMessage(`File uploaded successfully: ${response.data.filePath}`);
//     } catch (error) {
//       setMessage("Error uploading file");
//     }
//   };

//   return (
//     <div>
//       <h2>Admin Upload Calendar</h2>
//       <input type="file" accept=".xlsx" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
//       <p>{message}</p>
//     </div>
//   );
// };

// export default AdminUploadCalendar;

import React, { useState } from "react";
import axios from "axios";

const AdminUploadCalendarPage = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("⚠ Please select a file to upload!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:3000/calender", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("✅ File uploaded successfully!");
    } catch (error) {
      setMessage("❌ Error uploading file.");
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="max-h-screen flex flex-col items-center justify-center  p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">📤 Upload Academic Calendar</h2>

        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:border file:rounded-lg file:text-sm file:font-semibold file:bg-blue-500 file:text-white cursor-pointer"
        />

        <button
          onClick={handleUpload}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
        >
          Upload 📁
        </button>

        {message && <p className="mt-3 text-gray-700">{message}</p>}
      </div>
    </div>
  );
};

export default AdminUploadCalendarPage;
