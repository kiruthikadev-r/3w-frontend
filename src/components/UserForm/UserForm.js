import React, { useState } from 'react';
import axios from 'axios'; 
import './index.css';

const UserForm = () => {
  const [name, setName] = useState('');
  const [socialMediaHandle, setSocialMediaHandle] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState(''); 
  const [imageInputKey, setImageInputKey] = useState(Date.now()); 

  const CLOUDINARY_UPLOAD_PRESET = 'ml_default';
  const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dk2gfawgg/upload';

  const uploadImagesToCloudinary = async (imageFiles) => { 
    const uploadedImageUrls = [];

    for (const file of imageFiles) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      const customImageName = `${name}-${socialMediaHandle}-${Date.now()}`; 
      formData.append('public_id', customImageName);

      try {
        const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData);
        const imageLink = response.data.secure_url;
        uploadedImageUrls.push(imageLink);
      } catch (error) {
        console.error('Error uploading image:', error);
        throw new Error('Image upload failed');
      }
    }

    return uploadedImageUrls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    try {
      const uploadedImages = await uploadImagesToCloudinary(images); 

      const data = {
        name: name,
        handle: socialMediaHandle,
        imageUrls: uploadedImages 
      };

      const response = await axios.post('http://localhost:5000/api/upload', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data) {
        alert('Submission successful!');
        setName(''); 
        setSocialMediaHandle(''); 
        setImages([]); 

        setImageInputKey(Date.now());
      } else {
        setError('Failed to submit data');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      setError('Error submitting data. Please try again.');
    }
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <div className="form-field">
        <label className="form-label">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="form-input"
        />
      </div>
      <div className="form-field">
        <label className="form-label">Social Media Handle:</label>
        <input
          type="text"
          value={socialMediaHandle}
          onChange={(e) => setSocialMediaHandle(e.target.value)}
          required
          className="form-input"
        />
      </div>
      <div className="form-field">
        <label className="form-label">Upload Images:</label>
        <input
          key={imageInputKey}
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          required
          className="form-input"
        />
      </div>
      {error && <p className="form-error" style={{ color: 'red' }}>{error}</p>} 
      <button type="submit" className="form-submit-button">Submit</button>
    </form>
  );
};

export default UserForm;
