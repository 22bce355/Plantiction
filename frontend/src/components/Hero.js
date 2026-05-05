import React from 'react';
import videoFile from '../Images/Pexels Videos 2758322.mp4';

function Hero() {
    return (
      <div className="hero-image">
        <video autoPlay muted loop>
          <source src={videoFile} type="video/mp4" />
        </video>
      </div>
    );
  }
export default Hero;