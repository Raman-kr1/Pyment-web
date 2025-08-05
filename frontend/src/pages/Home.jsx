import React from 'react';

export default function Home() {
  const containerStyle = {
    textAlign: 'center',
    padding: '50px 20px',
  };

  const headingStyle = {
    color: '#2c3e50',
    fontSize: '2.5rem',
    marginBottom: '20px',
  };

  const paragraphStyle = {
    color: '#34495e',
    fontSize: '1.2rem',
    lineHeight: '1.6',
    maxWidth: '600px',
    margin: '0 auto 20px auto',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Welcome to Pyment-Web</h1>
      <p style={paragraphStyle}>
        This is your central dashboard. From here, you can manage your account,
        view your transaction history, and explore other features.
      </p>
      <p style={paragraphStyle}>
        We are proud to support great causes. Please consider making a
        donation to help make a difference.
      </p>
    </div>
  );
}