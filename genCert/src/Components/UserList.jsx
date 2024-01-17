// UserList.jsx
import React, { useState, useEffect } from 'react';
import CertificateGenerator from './CertificateGenerator';

function UserList() {
  const [users, setUsers] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [scrollVisible, setScrollVisible] = useState(false);

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
    if (instructorId !== undefined) {
      const instructor = instructors.find(inst => inst.instructorID === instructorId);
      return instructor ? instructor.full_name : 'Unknown Instructor';
    }
  };

  const filteredUsers = users.filter(user =>
    user.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Show the button when the user scrolls down 200 pixels
    if (scrollY > 200) {
      setScrollVisible(true);
    } else {
      setScrollVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredUsers.map(user => (
          <li key={user.userID}>
            {user.full_name} - {user.username} - {user.email}
            {instructors.map((instructor, idx) => (
              <div key={idx}>
                Instructor: {getInstructorName(instructor.instructorID)}
                <CertificateGenerator
                  name={user.full_name}
                  course="HTML and CSS" // You may need to get the course data from your API
                  instructor={getInstructorName(instructor.instructorID)}
                />
              </div>
            ))}
          </li>
        ))}
      </ul>
      
      {/* Back-to-top arrow icon */}
      {scrollVisible && (
        <div
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '10px',
            cursor: 'pointer',
            backgroundColor: '#ffffff',
            borderRadius: '50%',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 20V4"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18 10L12 4L6 10"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

export default UserList;
