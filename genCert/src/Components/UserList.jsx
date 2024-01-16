// UserList.jsx
import React, { useState, useEffect } from 'react';
import CertificateGenerator from './CertificateGenerator';
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> 5d970e5dd9bef3f0896c93433fc6f10bcf9366f8

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log('Fetching users...');
    fetch('http://localhost:8080/api/users/all')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched users:', data);
        setUsers(data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  console.log('Rendering UserList:', users);
<<<<<<< HEAD
>>>>>>> 5d970e5dd9bef3f0896c93433fc6f10bcf9366f8
=======
>>>>>>> 5d970e5dd9bef3f0896c93433fc6f10bcf9366f8

  return (
    <div>
      <h1>User List</h1>
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> 5d970e5dd9bef3f0896c93433fc6f10bcf9366f8
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Profile</th>
            <th>Course</th>
            <th>Instructor</th>
            <th>Download Certificate</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.userID}>
              <td>{user.full_name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.profile}</td>
              <td>{user.course ? user.course.courseName : 'N/A'}</td>
              <td>{user.instructor ? user.instructor.instructorName : 'N/A'}</td>
              <td>
                <CertificateGenerator
                  name={user.full_name}
                  course={user.course ? user.course.courseName : 'N/A'}
                  instructor={user.instructor ? user.instructor.instructorName : 'N/A'}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
<<<<<<< HEAD
>>>>>>> 5d970e5dd9bef3f0896c93433fc6f10bcf9366f8
=======
>>>>>>> 5d970e5dd9bef3f0896c93433fc6f10bcf9366f8
    </div>
  );
}

export default UserList;
