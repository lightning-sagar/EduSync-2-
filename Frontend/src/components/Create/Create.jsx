import React, { useState } from 'react';
import './Create.css';
import usePreviewImg from '../../hooks/usePrevImg';

const Create = ({ subjectId }) => {
  const [textContent, setTextContent] = useState('');
  const [files, setFiles] = useState([]); // Added files state
  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Subject ID:", subjectId);
    
    if (!subjectId) {
      console.error('Subject ID not found');
      return;
    }
    console.log(textContent,imgUrl)
    try {
      const response = await fetch(`/api/s/subject/${subjectId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ textContent, imgUrl })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="create-container">
      <h2>Create</h2>
      <div className="form-group">
        <label htmlFor="text-content">Text Content:</label>
        <textarea
          id="text-content"
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
          placeholder="Enter text content"
          rows="4"
        />
      </div>
      <div className="form-group">
        <label htmlFor="file-upload">Upload Files:</label>
        <input
          type="file"
          id="file-upload"
          accept=".jpg,.jpeg,.png"  
          multiple
          onChange={handleImageChange}
        />
      </div>
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default Create;
