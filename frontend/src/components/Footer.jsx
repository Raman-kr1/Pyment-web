import React from 'react';

export default function Footer() {
  const footerStyle = {
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    padding: '40px 20px',
    textAlign: 'center',
  };

  const formStyle = {
    maxWidth: '500px',
    margin: '20px auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  };

  const handleFeedback = (e) => {
    e.preventDefault();
    alert('Thank you for your feedback!');
    e.target.reset();
  };

  return (
    <footer style={footerStyle}>
      <h3>Suggestions & Feedback</h3>
      <p>We'd love to hear from you. Let us know how we can improve.</p>
      <form onSubmit={handleFeedback} style={formStyle}>
        <textarea placeholder="Your suggestions..." style={{color: '#333'}} required></textarea>
        <button type="submit">Submit Feedback</button>
      </form>
      <p style={{marginTop: '30px', fontSize: '0.9rem'}}>© 2024 Pyment-Web. All Rights Reserved.</p>
    </footer>
  );
}
