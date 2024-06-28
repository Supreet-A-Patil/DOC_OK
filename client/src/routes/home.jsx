import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.userId }),
      });

      if (response.ok) {
        // Logout successful
        localStorage.removeItem('user');
        setUser(null);
        navigate('/'); // Redirect to homepage after successful logout
      } else {
        // Logout failed
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div>
      <nav id="home-nav">
        <div id="logo">DOC-OK</div>
        <div id="nav-links">
          <Link to="/book-appointment">
            <button className="nav-button">Book Appointment</button>
          </Link>
          <Link to="/appointment-status">
            <button className="nav-button">Appointment Status</button>
          </Link>
        </div>
        <div id="auth-links">
          {user ? (
            <>
              <p>Welcome, {user.username || 'User'}</p>
              <button className="auth-button" onClick={handleLogout}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="auth-button">Login</button>
              </Link>
              <Link to="/signup">
                <button className="auth-button">Signup</button>
              </Link>
            </>
          )}
        </div>
      </nav>

      <div id="center-content">
        <h1>Dcotor Appointement System</h1>
        <p>Book appointments with ease and manage your schedule.</p>
      </div>
    </div>
  );
};

export default HomePage;
