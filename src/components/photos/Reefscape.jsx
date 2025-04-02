import React from 'react';
import Gallery from './Gallery';
// Import images correctly for React deployment
import starImage from '/Star.png';

const Reefscape = () => {
  return (
    <Gallery 
      id="reefscape"
      title="Reefscape"
      subtitle="First Blue Banner"
      year="2025"
      description="Photos from our 2025 season where we had our first competition victory."
      photos={[
        {
          src: starImage,
          alt: 'Description of image',
          caption: 'Optional caption'
        },
        {
          src: starImage,
          alt: 'Description of image',
          caption: 'Optional caption'
        },
        {
          src: starImage,
          alt: 'Description of image',
          caption: 'Optional caption'
        },
      ]}
    />
  );
};

export default Reefscape;