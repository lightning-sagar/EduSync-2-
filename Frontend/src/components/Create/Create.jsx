import React, { useState } from 'react';
import './Create.css';

const Create = () => {
  const [type, setType] = useState('notice');
  const [mediaType, setMediaType] = useState('text');

  return (
    <div className="create-container">
      <h2>Create</h2>
      <div className="form-group">
        <label htmlFor="type">Type:</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="notice">Notice</option>
          <option value="assignment">Assignment</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="media-type">Media Type:</label>
        <select
          id="media-type"
          value={mediaType}
          onChange={(e) => setMediaType(e.target.value)}
        >
          <option value="text">Text</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="content">Content:</label>
        <input
          type="text"
          id="content"
          placeholder={`Enter ${mediaType}`}
        />
      </div>
      {mediaType === 'image' && (
        <div className="form-group">
          <label htmlFor="image-upload">Upload Image:</label>
          <input type="file" id="image-upload" accept="image/*" />
        </div>
      )}
      {mediaType === 'video' && (
        <div className="form-group">
          <label htmlFor="video-upload">Upload Video:</label>
          <input type="file" id="video-upload" accept="video/*" />
        </div>
      )}
      <button className="submit-button">Submit</button>
    </div>
  );
}

export default Create;
