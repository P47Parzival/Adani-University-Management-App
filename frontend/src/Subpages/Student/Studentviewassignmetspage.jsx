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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Assignments</h1>
      {assignments.length > 0 ? (
        <ul className="list-disc pl-5">
          {assignments.map((file, index) => (
            <li key={index}>
              <a href={`http://localhost:3000/uploads/${file}`} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                {file}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No assignments available.</p>
      )}
    </div>
  );
};

export default Studentviewassignmetspage;
