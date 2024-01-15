// UserList.jsx
import React, { useState, useEffect } from 'react';
import CertificateGenerator from './CertificateGenerator';

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

  return (
    <div>
      <h1>User List</h1>
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
    </div>
  );
}

export default UserList;
