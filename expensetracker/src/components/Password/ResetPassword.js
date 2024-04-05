import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const navigate= useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = async () => {
    try {
      const apiKey = 'AIzaSyAysHuvFXa07LIxOJi5WvSY-OSNV7r2FZA'; // Replace with your Firebase API key
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`;
      const requestData = {
        requestType: 'PASSWORD_RESET',
        email: email,
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const responseData = await response.json();

      if (response.ok) {
        setMessage('Password reset email sent. Please check your inbox.');
        navigate('/login');
        alert('Reset password link send')

      } else {
        setMessage(responseData.error.message);
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={handleInputChange}
          placeholder="Enter your email"
        />
      </div>
      <button onClick={handleResetPassword}>Reset Password</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;