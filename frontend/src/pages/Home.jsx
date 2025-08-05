import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="page-container">
      <h1>Empowering Change, Together</h1>
      <p style={{maxWidth: '700px', margin: 'auto', marginBottom: '30px'}}>
        Welcome to Pyment-Web, your platform for secure transactions and meaningful contributions.
        We are proud to partner with organizations like the Anany Pahal Foundation to help build a better tomorrow.
      </p>
      <Link to="/donate">
        <button>Make a Donation</button>
      </Link>
    </div>
  );
}
