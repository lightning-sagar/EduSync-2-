import React, { useState, useEffect } from 'react';
import './Class.css';
import profileIcon from '../../assets/profile_icon.png';
import add_icon from '../../assets/add_icon_white.png';

const Class = ({ onNextClassTime }) => {
    const classes = [
        { subject: 'Math', teacher: 'Mr. Smith', description: 'Algebra and Geometry basics', time: '10:00 AM', id: 1 },
        { subject: 'Science', teacher: 'Ms. Johnson', description: 'Physics and Chemistry fundamentals', time: '11:00 AM', id: 2 },
        { subject: 'History', teacher: 'Mr. Brown', description: 'World War II overview hey its good to have students like you i will be very happed to teach you', time: '01:00 PM', id: 3 },
        { subject: 'English', teacher: 'Mrs. Davis', description: 'Grammar and Composition', time: '02:00 PM', id: 4 },
        { subject: 'Geography', teacher: 'Mr. Wilson', description: 'Maps and Earth structure', time: '03:00 PM', id: 5 },
        { subject: 'Arts', teacher: 'Ms. Taylor', description: 'Creative drawing and painting', time: '04:00 PM', id: 6 },
        { subject: 'Physical Education', teacher: 'Mr. White', description: 'Fitness and health', time: '11:00 PM', id: 7 },
        { subject: 'Computer', teacher: 'Ms. Green', description: 'Basics of programming', time: '06:00 PM', id: 8 }
    ];

    const [expanded, setExpanded] = useState({});

    const handleToggleDescription = (id) => {
        setExpanded((prevExpanded) => ({
            ...prevExpanded,
            [id]: !prevExpanded[id]
        }));
    };

    const getNextClassTime = () => {
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes(); 
        console.log(`Current Time in Minutes: ${currentTime}`);

        // Find the first class that is after the current time
        const upcomingClass = classes.find((classItem) => {
            const [time, period] = classItem.time.split(' ');
            let [hours, minutes] = time.split(':').map(Number);
            if (period === 'PM' && hours < 12) hours += 12;
            if (period === 'AM' && hours === 12) hours = 0;
            const classTime = hours * 60 + minutes;
            console.log(`Class Time for ${classItem.subject} in Minutes: ${classTime}`);
            return classTime > currentTime;
        });

        return upcomingClass ? upcomingClass.time : 'No upcoming classes';
    };

    useEffect(() => {
        if (onNextClassTime) {
            onNextClassTime(getNextClassTime());
        }
    }, [onNextClassTime]);

    return (
        <div className="class-container">
            <div className="class-cards">
                {classes.map((classItem) => {
                    const descriptionWords = classItem.description.split(' ');
                    const isExpanded = expanded[classItem.id];
                    const truncatedDescription = descriptionWords.length > 7
                        ? `${descriptionWords.slice(0, 7).join(' ')}...`
                        : classItem.description;

                    return (
                        <div key={classItem.id} className="class-card">
                            <h3>{classItem.subject}</h3>
                            <div className="class-info">
                                <img src={profileIcon} alt="Profile Icon" className="profile-icon" />
                                <div>
                                    <p className="teacher-name">{classItem.teacher}</p>
                                    <p
                                        className="subject-description"
                                        onClick={() => handleToggleDescription(classItem.id)}
                                    >
                                        {isExpanded ? classItem.description : truncatedDescription}
                                        {descriptionWords.length > 7 && (
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
            <div className="add-icon">
                <img src={add_icon} alt="Add Icon" />
            </div>
        </div>
    );
}

export default Class;
