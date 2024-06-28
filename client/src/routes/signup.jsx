import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (event) => {
    event.preventDefault();

    try {
      // Make an API call to your backend for signup
      const response = await fetch('http://localhost:8000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Signup successful
        console.log('Signup successful');
        // Redirect or perform other actions on successful signup
      } else {
        // Signup failed
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Signup</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default SignupPage;
