import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './ResetPassword.css'

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
            <div className="form">
      <div className="title">Reset-Password</div>
      <div className="subtitle">Enter New Password</div>
      <div className="input-container ic1">
        <input  className="input" type="email"
                value={email}
                onChange={handleInputChange}
                placeholder="Enter your email" />
       
      </div>

      <button className="submit" onClick={handleResetPassword}>Reset Password</button>
      {message && <p>{message}</p>}
    </div>
      
    </div>
  );
};

export default ResetPassword;