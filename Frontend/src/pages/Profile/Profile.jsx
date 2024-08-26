import React from 'react';
import './Profile.css';

const Profile = ({ user }) => {
  if (!user) {
    return <div className="profile-container loading">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={user.profilePicture} alt="Profile" className="profile-picture" />
        <h1>{user.name}</h1>
        <p className="profile-role">{user.role}</p>
      </div>

      <div className="profile-details">
        <section className="profile-info">
          <h2>Personal Information</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Location:</strong> {user.location}</p>
        </section>

        {user.role === 'Teacher' && (
          <section className="profile-teacher">
            <h2>Classes Taught</h2>
            <ul>
              {user.classesTaught.map((subject, index) => (
                <li key={index}>{subject}</li>
              ))}
            </ul>
            <h2>Years of Experience</h2>
            <p>{user.experience} years</p>
          </section>
        )}

        {user.role === 'Student' && (
          <section className="profile-student">
            <h2>Enrolled Classes</h2>
            <ul>
              {user.enrolledClasses.map((subject, index) => (
                <li key={index}>{subject}</li>
              ))}
            </ul>
            <h2>Grade Level</h2>
            <p>{user.gradeLevel}</p>
          </section>
        )}
      </div>
    </div>
  );
};

export default Profile;
