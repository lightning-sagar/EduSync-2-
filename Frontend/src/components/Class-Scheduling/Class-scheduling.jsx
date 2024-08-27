import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import usePreviewImg from '../../hooks/usePrevImg.jsx';
import './Class-scheduling.css';
import profileIcon from '../../assets/profile_icon.png';
import add_icon from '../../assets/add_icon_white.png';
import userAtom from '../../atom/UserAtom.js';
import subjectAtom from '../../atom/SubjectAtom.js';
import { useRecoilValue, useRecoilState } from 'recoil';

const Class = ({ onNextClassTime }) => {
    const [expanded, setExpanded] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [newSubject, setNewSubject] = useState('');
    const [newDescription, setNewDescription] = useState(''); // New state for description
    const navigate = useNavigate();

    const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
    const user = useRecoilValue(userAtom);
    const [subject, setSubject] = useRecoilState(subjectAtom);

    useEffect(() => {
        const getSubjects = async () => {
            if (!user) return;
            try {
                const response = await fetch(`/api/s/${user._id}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await response.json();
                setSubject(data); // Directly setting the fetched data
            } catch (error) {
                console.error(error);
            }
        };

        getSubjects();
    }, [setSubject]);

    const handleToggleDescription = (id) => {
        setExpanded((prevExpanded) => ({
            ...prevExpanded,
            [id]: !prevExpanded[id]
        }));
    };

    const handleAddClick = () => {
        setShowPopup(true);
    };

    const handlePopupClose = () => {
        setShowPopup(false);
        setNewSubject('');
        setNewDescription(''); // Reset description field
        setImgUrl(null);
    };

    const handleSubjectChange = (e) => {
        setNewSubject(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setNewDescription(e.target.value); // Capture the description input
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataToSend = {
                subjectname: newSubject,
                coverImg: imgUrl,
                description: newDescription, // Include the description in the data
            };

            const response = await fetch('/api/s/subject', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
                credentials: 'include',
            });

            const data = await response.json();

            if (data.err) {
                console.error("Failed to add subject");
            } else {
                setSubject((prevSubjects) => [...prevSubjects, data]);
            }
        } catch (error) {
            console.error("Error:", error);
        }
        handlePopupClose();
    };

    const getNextClassTime = () => {
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();

        if (subject.length > 0) {
            const upcomingClass = subject.find((classItem) => {
                if (!classItem.time) return false; // Check if time exists
                const [time, period] = classItem.time.split(' ');
                let [hours, minutes] = time.split(':').map(Number);
                if (period === 'PM' && hours < 12) hours += 12;
                if (period === 'AM' && hours === 12) hours = 0;
                const classTime = hours * 60 + minutes;
                return classTime > currentTime;
            });

            return upcomingClass ? upcomingClass.time : 'No upcoming classes';
        }
    };

    useEffect(() => {
        if (onNextClassTime) {
            onNextClassTime(getNextClassTime());
        }
    }, [onNextClassTime, subject]);

    const handleCardClick = (id) => {
        navigate(`/subject/${id}`);
    };

    return (
        <div className="class-container1">
            <div className="class-cards">
                {subject && subject.length > 0 && subject.map((classItem) => {
                    const isExpanded = expanded[classItem._id];
                    return (
                        <div
                            key={classItem._id}
                            className="class-card"
                            onClick={() => handleCardClick(classItem._id)}
                        >
                            <h3>{classItem.sname}</h3>
                            <div className="class-info">
                                <img src={profileIcon} alt="Profile Icon" className="profile-icon" />
                                <div>
                                    <p className="teacher-name">{classItem.teacher}</p>
                                    <p
                                        className="subject-description"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleToggleDescription(classItem._id);
                                        }}
                                    >
                                        {isExpanded ? classItem.description : `${classItem.description?.slice(0, 7)}... `}
                                        {classItem.description?.length > 7 && (
                                            <span className="show-more">
                                                {isExpanded ? ' Show less' : ' Show more'}
                                            </span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="add-icon" onClick={handleAddClick}>
                <img src={add_icon} alt="Add Icon" />
            </div>
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close-popup" onClick={handlePopupClose}>&times;</span>
                        <h3>Add New Subject</h3>
                        <form onSubmit={handleFormSubmit}>
                            <div className="form-row">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    required
                                />
                                {imgUrl && <img src={imgUrl} alt="Cover Preview" className="cover-preview" />}
                            </div>
                            <input
                                type="text"
                                placeholder="Enter subject name"
                                value={newSubject}
                                onChange={handleSubjectChange}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Add the description here"
                                value={newDescription} // Bind description state to input
                                onChange={handleDescriptionChange}
                                required
                            />
                            <button className="add-subject-btn" type="submit">Add Subject</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Class;
