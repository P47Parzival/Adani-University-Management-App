// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Studentviewassignmetspage = () => {
//   const [assignments, setAssignments] = useState([]);

//   useEffect(() => {
//     const fetchAssignments = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/student/assignments');
//         setAssignments(response.data.files);
//       } catch (error) {
//         console.error("Error fetching assignments:", error);
//       }
//     };

//     fetchAssignments();
//   }, []);

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Assignments</h1>
//       {assignments.length > 0 ? (
//         <ul className="list-disc pl-5">
//           {assignments.map((file, index) => (
//             <li key={index}>
//               <a href={`http://localhost:3000/uploads/${file}`} target="_blank" rel="noopener noreferrer" className="text-blue-500">
//                 {file}
//               </a>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No assignments available.</p>
//       )}
//     </div>
//   );
// };

// export default Studentviewassignmetspage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Studentviewassignmetspage = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/student/assignments');
        setAssignments(response.data.files);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchAssignments();
  }, []);

  return (
    <div className="min-h-scree p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Assignments</h1>
        {assignments.length > 0 ? (
          <ul className="space-y-4">
            {assignments.map((file, index) => (
              <li key={index} className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition duration-200">
                <a
                  href={`http://localhost:3000/uploads/${file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  {file}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No assignments available.</p>
        )}
      </div>
    </div>
  );
};

export default Studentviewassignmetspage;