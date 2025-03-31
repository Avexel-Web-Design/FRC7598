import React from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import '../../assets/styles/main.css';

const Lune = () => {
  useScrollReveal();

  return (
    <section id="lune" className="py-12 px-4 sm:px-8" style={{ margin: 0, padding: 0 }}>
      <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div className="w-full">
          <img
            src="../../../public/lune.png"
            alt="Lune Robot"
            className="rounded-lg shadow-lg robot-image hero-animate"
            style={{ transitionDelay: '0.3s' }}
          />
        </div>
        <div className="hero-animate" style={{ transitionDelay: '0.4s' }}>
          <h2 className="text-3xl font-bold mb-4">Lune</h2>
          <p className="mb-4 text-lg">
            Lune is our first robot, setting a new benchmark in robotics performance. Designed with agility and precision, Lune embodies innovative engineering and state-of-the-art technology.
          </p>
          <ul className="list-disc pl-5 text-left text-lg">
            <li>High agility and precise control</li>
            <li>Advanced sensor integration</li>
            <li>Robust and innovative design</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Lune;
