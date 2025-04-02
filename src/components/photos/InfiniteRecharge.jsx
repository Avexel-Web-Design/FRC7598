import React from 'react';
import Gallery from './Gallery';
// Import images correctly for React deployment
import starImage from '/Star.png';

const InfiniteRecharge = () => {
  return (
    <Gallery 
      id="infiniterecharge"
      title="Infinite Recharge"
      subtitle="At Home Challenge"
      year="2021"
      description="Photos from our 2021 season participating in the Infinite Recharge at Home Challenge."
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

export default InfiniteRecharge;