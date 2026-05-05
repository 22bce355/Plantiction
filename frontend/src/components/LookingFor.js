import React from 'react';
import { useNavigate } from 'react-router-dom';
import machine1 from '../Images/machine-1.jpeg'
import machine2 from '../Images/machine-2.jpeg'
import machine3 from '../Images/machine-3.jpeg'
import cropimg from '../Images/crops-image.jpeg'

function LookingFor() {
  const navigate = useNavigate(); 
  const openFlaskApp = () => {
    window.open("http://127.0.0.1:5000", "_blank"); // Open Flask app in new tab
  };
  return (
    <div className="looking-for">
      <div className="card" onClick={() => navigate('/buy-machines')} style={{ cursor: 'pointer' }}>
        <div className="img">
          <img src={machine1} alt="Machine 1" />
        </div>
        <div className="description">
          <p>Looking to buy a machine? <span>&nbsp;&rarr;</span></p>
        </div>
      </div>

      <div className="card" onClick={() => navigate('/rent-machines')}>
        <div className="img">
          <img src={machine2} alt="Machine 2" />
        </div>
        <div className="description">
          <p>Looking "Rent-to-Own" machine? <span>&nbsp;&rarr;</span></p>
        </div>
      </div>

      <div className="card" onClick={() => navigate('/sell-machines')}>
        <div className="img">
          <img src={machine3} alt="Machine 3" />
        </div>
        <div className="description">
          <p>Looking to sell a machine? <span id="arrow">&nbsp;&rarr;</span></p>
        </div>
      </div>

      <div className="card" onClick={openFlaskApp} style={{ cursor: "pointer" }}>
        <div className="img">
          <img src={cropimg} alt="Crops" />
        </div>
        <div className="description">
          <p>Predict Disease<span>&nbsp;&rarr;</span></p>
        </div>
      </div>
    </div>
   
  );
}

export default LookingFor;
