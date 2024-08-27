import React, { useState } from 'react';
import './Create.css';

const Create = () => {
  const [textContent, setTextContent] = useState('');
  const [files, setFiles] = useState([]);

  const handleFileUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles([...files, ...selectedFiles]);
  };

  const handleSubmit = () => {
    // Handle submission logic here
    console.log('Text Content:', textContent);
    console.log('Files:', files);
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
          accept=".txt,.pdf,.zip,.jpg,.jpeg,.png,.gif,.mp4,.mov" // Adjust this to include the types of files you want
          multiple
          onChange={handleFileUpload}
        />
      </div>
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default Create;
