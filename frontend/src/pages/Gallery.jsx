import React from 'react';

// Using placeholder images for the gallery
const images = [
  'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070',
  'https://images.unsplash.com/photo-1542810634-71277d9520a3?q=80&w=2070',
  'https://images.unsplash.com/photo-1618423414922-cb11b4a034ac?q=80&w=1925',
  'https://images.unsplash.com/photo-1591590453911-0797b1652814?q=80&w=2070',
  'https://images.unsplash.com/photo-1617454800268-a4891122a65a?q=80&w=1964',
  'https://images.unsplash.com/photo-1620932934086-a0391bf3ee22?q=80&w=1964',
];

export default function Gallery() {
  return (
    <div className="page-container">
      <h1>Our Gallery</h1>
      <p>A glimpse into the lives we're changing together.</p>
      <div className="gallery-grid">
        {images.map((src, index) => (
          <img key={index} src={src} alt={`Gallery item ${index + 1}`} className="gallery-item" />
        ))}
      </div>
    </div>
  );
}
