import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Donate = () => {
  const [formData, setFormData] = useState({
    donorName: '',
    foodName: '',
    quantity: '',
    location: '',
    contact: '',
    latitude: null,   // Initially set as null
    longitude: null,  // Initially set as null
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // Get user's location if allowed
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prevData) => ({
            ...prevData,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
          setSuccess('✅ Location fetched successfully!');
          setError(null);
        },
        (error) => {
          console.error('Geolocation Error:', error);
          setError('❌ Location access is required to donate.');
        }
      );
    } else {
      setError('❌ Geolocation is not supported by your browser.');
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if location data is missing and handle the case
    if (!formData.latitude || !formData.longitude) {
      setError('❌ Location access is required to donate.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/donate', formData);
      console.log('Server Response:', response.data);

      if (response.data.success) {
        setSuccess(response.data.message || '✅ Donation submitted successfully!');
        alert('🎉 Thank you for your donation! Your details have been submitted.');

        // Reset form
        setFormData({
          donorName: '',
          foodName: '',
          quantity: '',
          location: '',
          contact: '',
          latitude: null,  // Reset latitude and longitude after form submission
          longitude: null, 
        });
      } else {
        setError(response.data.message || '❌ Failed to submit donation. Please try again.');
      }
    } catch (err) {
      console.error('Submission Error:', err.response?.data);
      setError(err.response?.data?.message || '❌ Error submitting donation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <h2>Donate Food</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          name="donorName"
          placeholder="Donor Name"
          value={formData.donorName}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="text"
          name="foodName"
          placeholder="Food Name"
          value={formData.foodName}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact Info"
          value={formData.contact}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? 'Submitting...' : 'Donate'}
        </button>
      </form>
    </div>
  );
};

// Inline Styles
const containerStyle = {
  textAlign: 'center',
  padding: '20px',
  maxWidth: '400px',
  margin: '0 auto',
  border: '1px solid #ddd',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const inputStyle = {
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  padding: '10px',
  backgroundColor: '#303481',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default Donate;