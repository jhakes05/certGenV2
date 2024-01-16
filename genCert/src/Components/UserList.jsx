// UserList.jsx
import React, { useState, useEffect } from 'react';
import CertificateGenerator from './CertificateGenerator';
function UserList() {
  const [users, setUsers] = useState([]);
  const [instructors, setInstructors] = useState([]);
console.log(instructors)
  useEffect(() => {
    // Fetch user data from your Spring Boot API endpoint
    fetch('http://localhost:8080/GUsers')
      .then(response => response.json())
      .then(data => setUsers(data));
    
    // Fetch instructor data from your Spring Boot API endpoint
    fetch('http://localhost:8080/GInstructor')
      .then(response => response.json())
      .then(data => setInstructors(data));
  }, []);

  const getInstructorName = (instructorId) => {
    // Check if instructorId is defined
    if (instructorId !== undefined) {
      const instructor = instructors.find(inst => inst.instructorID === instructorId);
      console.log('Instructors array:', instructors);
      console.log(`InstructorID: ${instructorId}, Instructor:`, instructor);

      return instructor ? instructor.full_name : 'Unknown Instructor';
    } 
  };

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user.userID}>
            {user.full_name} - {user.username} - {user.email}
            {/* certificate generator is not in the right map */}
            {instructors.map((instructor, idx) => {
                return (
                    <div key={idx}>

                    {/* Fetch instructor name using the getInstructorName function */}
                    Instructor: {getInstructorName(instructor.instructorID)}
                    {/* Add a button to generate the certificate for this user */}

                    <CertificateGenerator
                    
                    name={user.full_name}
                    course="HTML and CSS" // You may need to get the course data from your API
                    instructor={getInstructorName(instructor.instructorID)}
                    />
                    </div>
                )
            })}
          </li>
        ))}
        
      </ul>
    </div>
  );
}

export default UserList;
