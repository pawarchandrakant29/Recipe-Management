import React, { useState } from 'react';
import axios from 'axios';
import './InputForm.css'; // Ensure the CSS file is included

export default function InputForm({ setIsOpen }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignUp ? 'signUp' : 'login';
    try {
      const res = await axios.post(`http://localhost:5000/${endpoint}`, { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setIsOpen();
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <form className="form1" onSubmit={handleOnSubmit}>
        <h2 className="form-title">{isSignUp ? 'Join Our Foodies Community!' : 'Welcome Back, Food Lover!'}</h2>
        <p className="form-subtitle">
          {isSignUp
            ? 'Create your account and start sharing your favorite recipes today!'
            : 'Log in to explore and share amazing recipes.'}
        </p>
        <div className="form-control">
          <label className="form-label">Your Email Address</label>
          <input
            type="email"
            className="form-input"
            placeholder="example@foodblog.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label className="form-label">Your Secret Password</label>
          <input
            type="password"
            className="form-input"
            placeholder="Enter a secure password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="form-error">{error}</p>}
        <button type="submit" className="form-button">
          {isSignUp ? 'Create My Account' : 'Log Me In'}
        </button>
        <p className="form-switch" onClick={() => setIsSignUp((prev) => !prev)}>
          {isSignUp
            ? 'Already have an account? Click here to log in.'
            : "New here? Click to create your foodie account!"}
        </p>
      </form>
    </div>
  );
}
