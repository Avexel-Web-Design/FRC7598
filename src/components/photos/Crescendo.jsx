import React from 'react';
import Gallery from './Gallery';
// Import images correctly for React deployment
import starImage from '/Star.png';

const Crescendo = () => {
  return (
    <Gallery 
      id="crescendo"
      title="Crescendo"
      subtitle="Engineering Inspiration Award"
      year="2024"
      description="Photos from our 2024 season where we won our first Engineering Inspiration Award."
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

export default Crescendo;