import React from 'react';

// Demo data for contributors
const contributors = [
  { id: 1, name: 'Rohan Sharma' },
  { id: 2, name: 'Priya Verma' },
  { id: 3, name: 'Amit Kumar' },
  { id: 4, name: 'Sunita Devi' },
  { id: 5, name: 'Vikram Singh' },
];

export default function Contributors() {
  return (
    <div className="page-container">
      <h1>Our Valued Contributors</h1>
      <p>We are immensely grateful to everyone who supports our mission.</p>
      <ul className="contributors-list">
        {contributors.map(c => (
          <li key={c.id} className="contributor-item">{c.name}</li>
        ))}
      </ul>
    </div>
  );
}
