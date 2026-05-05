import React from 'react';
import nestle from '../Images/Nestle-Logo.png'
import department from '../Images/Department-LOGO.png'
import prima from '../Images/prima-ceylon.jpg'
import ruhunu from '../Images/ruhunu_logo.png'

function Partners() {
  return (
    <section className="our-partners">
      <h3>-- Our Partners --</h3>
      <div className="partners-sub-heading">
        <h1>We Partner With Highly Professionals</h1>
      </div>
      <div className="partners">
        <div className="img1 partners-img">
          <img src={nestle} alt="Nestle Logo" />
        </div>
        <div className="img2 partners-img">
          <img src={department} alt="Department Logo" />
        </div>
        <div className="img3 partners-img">
          <img src={prima} alt="Prima Ceylon Logo" />
        </div>
        <div className="img4 partners-img">
          <img src={ruhunu} alt="Ruhunu Logo" />
        </div>
      </div>
    </section>
  );
}

export default Partners;
