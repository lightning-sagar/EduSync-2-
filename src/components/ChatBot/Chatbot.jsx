import React, { useState } from 'react';
import { TbMessageChatbotFilled } from "react-icons/tb";
import './ChatBoat.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <div className='chatBot-icon' onClick={togglePopup}>
        <TbMessageChatbotFilled />
      </div>
      {isOpen && (
        <div className='chatBot-popup'>
          <div className='chatBot-popup-header'>
            <h3>Chat with us</h3>
            <button className='close-btn' onClick={togglePopup}>×</button>
          </div>
          <div className='chatBot-popup-body'>
            <p>How can we help you today?</p>
            <input type='text' placeholder='Type your message...' />
            <button className='send-btn'>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
