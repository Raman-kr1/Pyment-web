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
    backgroundColor: '#ffffff',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1000,
    boxSizing: 'border-box',
    height: '70px',
  };

  const linkStyle = {
    color: '#34495e',
    textDecoration: 'none',
    padding: '0 15px',
    fontWeight: 'bold',
    transition: 'color 0.3s',
  };

  return (
    <nav style={navStyle}>
      <div>
        <Link to="/" style={{...linkStyle, color: '#4a90e2', fontSize: '1.5rem'}}>Pyment</Link>
      </div>
      <div>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/donate" style={linkStyle}>Donate</Link>
        <Link to="/gallery" style={linkStyle}>Gallery</Link>
        <Link to="/contributors" style={linkStyle}>Contributors</Link>
        <Link to="/contact" style={linkStyle}>Contact</Link>
      </div>
      <div>
        {user ? (
          <>
            <span style={{ marginRight: '1rem', color: '#555' }}>Hello, {user.email}</span>
            <button onClick={handleLogout} style={{margin: 0, padding: '10px 15px'}}>Logout</button>
          </>
        ) : (
          <Link to="/login" style={{...linkStyle, fontWeight: 'bold'}}>Login</Link>
        )}
      </div>
    </nav>
  );
}
