import React from 'react';
import Aboutplantiction from '../Images/about-agzone.jpeg'

function About() {
  return (
    <div className="about-agzone">
      <div className="about">
        <div className="image">
          <p id="inc">About Plantiction, Inc.</p>
          <img src={Aboutplantiction} alt="About AgZone" />
        </div>
        <div className="about-para">
          <p>
            At <span>Plantiction</span>, based in Kandy, we offer expert advice with a wide variety of specialist
            products. We are fortunate to be able to offer our clients the opportunity to test drive machines at our
            farm, allowing you to make a fully informed choice. We have great people all over the country working
            towards producing the world’s finest products, and we’re always on the lookout for great talent.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
