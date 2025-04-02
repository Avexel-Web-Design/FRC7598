import React from 'react';
import Gallery from './Gallery';
// Import images correctly for React deployment
import starImage from '/Star.png';

const AtHome = () => {
  return (
    <Gallery 
      id="athome"
      title="Infinite Recharge: At Home"
      subtitle="Virtual Learning"
      year="2020"
      description="Photos from our 2020 season participating in virtual at-home challenges during the pandemic."
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

export default AtHome;