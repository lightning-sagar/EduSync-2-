import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Class.css'; 
import Create from '../../components/Create/Create';
import { useRecoilState, useRecoilValue } from 'recoil';
import noticeAtom from '../../atom/NoticeAtom.js';
import userAtom from '../../atom/UserAtom.js';
import subjectAtom from '../../atom/SubjectAtom.js';

const Class = () => {
  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const navigate = useNavigate();
  const { id: subjectId } = useParams(); 
  const [Notice,SetNotice] = useRecoilState(noticeAtom);
  const user = useRecoilValue(userAtom);
  const [Subjects, setSubjects] = useRecoilState(subjectAtom);

  useEffect(() => {
    if (!subjectId) {
      navigate('/');
    }
    const getNotice = async () => {
      try {
        const response = await fetch(`/api/s/subject/${subjectId}`);
        const data = await response.json();
        SetNotice(data);
      } catch (error) {
        console.error(error);
      }
    };
    getNotice();
  },[subjectId])

  useEffect(() => {
    const getsubject = async () => {
      try {
        const response = await fetch(`/api/s/${user._id}`);
        const data = await response.json();
        console.log(data,"datas");
        setSubjects(data);
      } catch (error) {
        console.error(error);
      }
    }
    getsubject();
  },[subjectId])
   
  const handleCreateButtonClick = () => {
    setIsCreateVisible(!isCreateVisible);
  };

  const handleBookClick = (id) => {
    navigate(`/ebook/${id}`);  
  };

  return (
    <div className="class-container">
      <aside className="sidebar">
        <div className="classes-section">
          <h3>Classes</h3>
          {Subjects.map((subject) => (
            <ul>
              <li>{subject.sname}</li>
            </ul>
          ))}
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
          </ul>
        </div>
      </aside>
      <main className="content">
        {Notice.map((notice) => (
          <section className="notice">
            <h2>{notice.NoticeText}</h2>
            <img src={notice.img} height={200} width={200} alt={notice.title} />
          </section>
        ))}
      </main>
      <div className="create">
        <button className='create-button' onClick={handleCreateButtonClick}>
          Create
        </button>
      </div>
      {isCreateVisible && <Create subjectId={subjectId} />}  
    </div>
  );
}

export default Class;
