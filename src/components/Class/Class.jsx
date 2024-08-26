import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Class.css'; 
import Create from '../../components/Create/Create';

const Class = () => {
  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleCreateButtonClick = () => {
    setIsCreateVisible(!isCreateVisible);
  };

  const handleBookClick = (id) => {
    navigate(`/ebook/${id}`); // Navigate to eBook route with book id
  };

  return (
    <div className="class-container">
      <aside className="sidebar">
        <div className="classes-section">
          <h3>Classes</h3>
          <ul>
            <li>Maths</li>
            <li>Arts</li>
            <li>English</li>
            <li>Chemistry</li>
          </ul>
        </div>
        <div className="ebooks-section">
          <h3>eBooks</h3>
          <ul>
            <li onClick={() => handleBookClick('1')}>
              <div className="ebook-details">
                <div className="ebook-row">
                  <span className="ebook-name">Algebra</span>
                  <span className="ebook-subject">Maths</span>
                </div>
                <div className="ebook-row">
                  <span className="ebook-teacher">by Mr. Smith</span>
                  <span className="ebook-status">Free</span>
                </div>
              </div>
            </li>
            <li onClick={() => handleBookClick('1')}>
              <div className="ebook-details">
                <div className="ebook-row">
                  <span className="ebook-name">Algebra</span>
                  <span className="ebook-subject">Maths</span>
                </div>
                <div className="ebook-row">
                  <span className="ebook-teacher">by Mr. Smith</span>
                  <span className="ebook-status">Free</span>
                </div>
              </div>
            </li>
            <li onClick={() => handleBookClick('1')}>
              <div className="ebook-details">
                <div className="ebook-row">
                  <span className="ebook-name">Algebra</span>
                  <span className="ebook-subject">Maths</span>
                </div>
                <div className="ebook-row">
                  <span className="ebook-teacher">by Mr. Smith</span>
                  <span className="ebook-status">Free</span>
                </div>
              </div>
            </li>
            <li onClick={() => handleBookClick('2')}>
              <div className="ebook-details">
                <div className="ebook-row">
                  <span className="ebook-name">Algebra</span>
                  <span className="ebook-subject">Maths</span>
                </div>
                <div className="ebook-row">
                  <span className="ebook-teacher">by Mr. Smith</span>
                  <span className="ebook-status">Free</span>
                </div>
              </div>
            </li>
            <li onClick={() => handleBookClick('3')}>
              <div className="ebook-details">
                <div className="ebook-row">
                  <span className="ebook-name">Algebra</span>
                  <span className="ebook-subject">Maths</span>
                </div>
                <div className="ebook-row">
                  <span className="ebook-teacher">by Mr. Smith</span>
                  <span className="ebook-status">Free</span>
                </div>
              </div>
            </li>
            <li onClick={() => handleBookClick('4')}>
              <div className="ebook-details">
                <div className="ebook-row">
                  <span className="ebook-name">Algebra</span>
                  <span className="ebook-subject">Maths</span>
                </div>
                <div className="ebook-row">
                  <span className="ebook-teacher">by Mr. Smith</span>
                  <span className="ebook-status">Free</span>
                </div>
              </div>
            </li>
            <li onClick={() => handleBookClick('5')}>
              <div className="ebook-details">
                <div className="ebook-row">
                  <span className="ebook-name">Algebra</span>
                  <span className="ebook-subject">Maths</span>
                </div>
                <div className="ebook-row">
                  <span className="ebook-teacher">by Mr. Smith</span>
                  <span className="ebook-status">Free</span>
                </div>
              </div>
            </li>
            <li onClick={() => handleBookClick('6')}>
              <div className="ebook-details">
                <div className="ebook-row">
                  <span className="ebook-name">Algebra</span>
                  <span className="ebook-subject">Maths</span>
                </div>
                <div className="ebook-row">
                  <span className="ebook-teacher">by Mr. Smith</span>
                  <span className="ebook-status">Free</span>
                </div>
              </div>
            </li>
            <li onClick={() => handleBookClick('7')}>
              <div className="ebook-details">
                <div className="ebook-row">
                  <span className="ebook-name">Algebra</span>
                  <span className="ebook-subject">Maths</span>
                </div>
                <div className="ebook-row">
                  <span className="ebook-teacher">by Mr. Smith</span>
                  <span className="ebook-status">Free</span>
                </div>
              </div>
            </li>
            <li onClick={() => handleBookClick('8')}>
              <div className="ebook-details">
                <div className="ebook-row">
                  <span className="ebook-name">Algebra</span>
                  <span className="ebook-subject">Maths</span>
                </div>
                <div className="ebook-row">
                  <span className="ebook-teacher">by Mr. Smith</span>
                  <span className="ebook-status">Free</span>
                </div>
              </div>
            </li>
           
          </ul>
        </div>
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
