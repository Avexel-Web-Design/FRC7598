import React from 'react';
import Gallery from './Gallery';
// Import images correctly for React deployment
import starImage from '/Star.png';

const DeepSpace = () => {
  return (
    <Gallery 
      id="deepspace"
      title="Deep Space"
      subtitle="Our Founding Year"
      year="2019"
      description="Photos from our founding year competing in the Deep Space challenge."
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

export default DeepSpace;