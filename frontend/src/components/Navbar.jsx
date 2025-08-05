import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthCtx } from '../context/AuthContext';
import api from '../api/axios';

export default function Navbar() {
  const { user, setUser } = useContext(AuthCtx);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await api.post('/auth/logout');
    setUser(null);
    navigate('/login');
  };

  const navStyle = {
    backgroundColor: '#fff',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    position: 'fixed',
    top: 0,
    width: '100%',
    boxSizing: 'border-box',
  };

  const linkStyle = {
    color: '#333',
    textDecoration: 'none',
    padding: '1.5rem 1rem',
    display: 'inline-block',
    fontWeight: '500',
  };

  return (
    <nav style={navStyle}>
      <div>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/donate" style={linkStyle}>Donate</Link>
      </div>
      <div>
        {user ? (
          <>
            <span style={{ marginRight: '1rem', color: '#555' }}>Hello, {user.email}</span>
            <button onClick={handleLogout} style={{margin: 0}}>Logout</button>
          </>
        ) : (
          <Link to="/login" style={linkStyle}>Login</Link>
        )}
      </div>
    </nav>
  );
}