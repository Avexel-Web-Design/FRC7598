import React from 'react';
import Gallery from './Gallery';
// Import images correctly for React deployment
import starImage from '/Star.png';

const RapidReact = () => {
  return (
    <Gallery 
      id="rapidreact"
      title="Rapid React"
      subtitle="Our First Competition"
      year="2022"
      description="Photos from our 2022 season competing in the Rapid React challenge."
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

export default RapidReact;