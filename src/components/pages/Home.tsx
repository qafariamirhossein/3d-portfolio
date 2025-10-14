import React from 'react';
import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Tech,
  Works,
  StarsCanvas,
} from '../index';

const Home: React.FC = () => {
  return (
    <div className="bg-primary relative z-0">
      <div className="bg-hero-pattern bg-cover bg-center bg-no-repeat">
        <Hero />
      </div>
      <About />
      <Experience />
      <Tech />
      <Works />
      <Feedbacks />
      <div className="relative z-0">
        <Contact />
        <StarsCanvas />
      </div>
    </div>
  );
};

export default Home;
