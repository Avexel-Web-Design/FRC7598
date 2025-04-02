import React from 'react';
import Gallery from './Gallery';
// Import images correctly for React deployment
import starImage from '/Star.png';

const ChargedUp = () => {
  return (
    <Gallery 
      id="chargedup"
      title="Charged Up"
      subtitle="Building Momentum"
      year="2023"
      description="Photos from our 2023 season competing in the Charged Up challenge."
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

export default ChargedUp;