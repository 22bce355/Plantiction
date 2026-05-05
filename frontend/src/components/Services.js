import React from 'react';
import BuyImg from '../Images/buy (2).png'
import SellImg from '../Images/sell (2).png'
import RentImg from '../Images/rent (2).png'

function Services() {
  return (
    <div className="services">
      <div className="heading">
        <p>Our Services</p>
      </div>

      <div className="service-image"></div>

      <div className="cards">
        <div className="actual-card">
          <div className="card-image">
            <img src={BuyImg} alt="Buy Service" />
          </div>
          <div className="content">
            <div className="head"></div>
            <p id="para">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Repudiandae, voluptates vel, non eius possimus?
            </p>
            <p id="more">Learn More</p>
          </div>
        </div>

        <div className="actual-card">
          <div className="card-image">
            <img src={SellImg} alt="Sell Service" />
          </div>
          <div className="content">
            <div className="head"></div>
            <p id="para">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Repudiandae, voluptates vel, non eius possimus?
            </p>
            <p id="more">Learn More</p>
          </div>
        </div>

        <div className="actual-card">
          <div className="card-image">
            <img src={RentImg} alt="Rent Service" />
          </div>
          <div className="content">
            <div className="head"></div>
            <p id="para">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Repudiandae, voluptates vel, non eius possimus?
            </p>
            <p id="more">Learn More</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
