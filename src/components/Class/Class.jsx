import React, { useState } from 'react';
import './Class.css'; 
import Create from '../../components/Create/Create'
const Class = () => {

  const [isCreateVisible, setIsCreateVisible] = useState(false);

  // Toggle the visibility of the Create component
  const handleCreateButtonClick = () => {
    setIsCreateVisible(!isCreateVisible);
  };

  return (
    <div className="class-container">
      <aside className="sidebar">
        <ul>
          <li>Maths</li>
          <li>Arts</li>
          <li>English</li>
          <li>Chemistry</li>
        </ul>
      </aside>
      <main className="content">
        <section className="notice">
          <h2>Notice</h2>
          <p>This is a notice area where important information is displayed.</p>
        </section>
        <section className="assignment">
          <h3>Assignment</h3>
          <p>This is a random text that defines the assignment or work given by a teacher.</p>
        </section>
      </main>
      <div className="create">
        <button className='create-button' onClick={handleCreateButtonClick}>
          Create
        </button>
      </div>
      {isCreateVisible && <Create />} 
    </div>
  );
}

export default Class;
