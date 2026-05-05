// import React, { useEffect, useState } from "react";
// import "./RentMachine.css";

// function RentMachines() {
//     const [machines, setMachines] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         fetch("http://localhost:5000/api/rent-machines") // Backend API endpoint
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error("Failed to fetch machines");
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 setMachines(data);
//                 setLoading(false);
//             })
//             .catch((error) => {
//                 console.error("Error fetching machines:", error);
//                 setError(error.message);
//                 setLoading(false);
//             });
//     }, []);

//     if (loading) {
//         return <div>Loading machines...</div>;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     return (
//         <div className="rent-machines">
//             <h1>Rent Agricultural Machines</h1>
//             <div className="machine-list">
//                 {machines.map((machine) => (
//                     <div key={machine._id} className="machine-card">
//                         <div className="machine-img">
//                             <img src={machine.image} alt={machine.name} />
//                         </div>
//                         <div className="machine-info">
//                             <h2>{machine.name}</h2>
//                             <p className="rent">{machine.rent}</p>
//                             <p className="description">{machine.description}</p>
//                             <button className="rent-button">Rent Now</button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default RentMachines;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

function RentMachines() {
  const navigate = useNavigate();
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch("http://localhost:5000/api/rent-machines")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch machines");
        }
        return response.json();
      })
      .then((data) => {
        setMachines(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching machines:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleRentNow = async (machine) => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      alert("You need to log in first!");
      navigate("/login");
      return;
    }
    
    try {
      // You can adjust this endpoint to match your backend
      const response = await axios.post(
        "http://localhost:5000/api/rentals/add",
        { machineId: machine._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      alert(`${machine.name} rental request submitted!`);
    } catch (error) {
      console.error("Error processing rental:", error);
      alert(error.response?.data?.message || "Server Error! Please try again.");
    }
  };

  const filteredMachines = machines.filter(machine => 
    machine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (machine.description && machine.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <Navbar />
      
      <div className="machines-container" style={{ padding: "120px 20px 50px" }}>
        <h1 style={{ color: "#036e3a", textAlign: "center", marginBottom: "30px" }}>
          Rent Agricultural Machines
        </h1>
        
        <div className="search-container" style={{ maxWidth: "600px", margin: "0 auto 40px" }}>
          <input
            type="text"
            placeholder="Search rental machines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "20px",
              border: "2px solid #036e3a",
              fontSize: "16px"
            }}
          />
        </div>
        
        {loading ? (
          <div style={{ textAlign: "center", padding: "50px" }}>
            <p>Loading rental machines...</p>
          </div>
        ) : error ? (
          <div style={{ textAlign: "center", padding: "50px", color: "red" }}>
            <p>Error: {error}</p>
          </div>
        ) : filteredMachines.length === 0 ? (
          <div style={{ textAlign: "center", padding: "50px" }}>
            <p>No rental machines found matching your search.</p>
          </div>
        ) : (
          <div className="machines-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "30px",
            marginBottom: "50px"
          }}>
            {filteredMachines.map(machine => (
              <div key={machine._id} className="machine-card" style={{
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease",
                backgroundColor: "white"
              }}>
                <div className="machine-image" style={{ height: "200px" }}>
                  <img 
                    src={machine.image || "https://via.placeholder.com/300x200"} 
                    alt={machine.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div className="machine-details" style={{ padding: "20px" }}>
                  <h3 style={{ color: "#036e3a", marginBottom: "10px" }}>{machine.name}</h3>
                  <p style={{ 
                    color: "#e67e22", 
                    fontWeight: "bold", 
                    fontSize: "16px", 
                    marginBottom: "10px" 
                  }}>
                    Rental Rate: {machine.rent}
                  </p>
                  <p style={{ marginBottom: "15px", fontSize: "14px" }}>{machine.description}</p>
                  
                  {machine.specifications && (
                    <div style={{ marginBottom: "15px" }}>
                      <strong>Specifications:</strong>
                      <ul style={{ paddingLeft: "20px", marginTop: "5px" }}>
                        {machine.specifications.map((spec, index) => (
                          <li key={index}>{spec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center", 
                    marginTop: "15px" 
                  }}>
                   
                      <span style={{ color: "green", fontWeight: "500" }}>Available</span>
                   
                    <button 
                      onClick={() => handleRentNow(machine)}
                    //   disabled={!machine.availability}
                      style={{
                        backgroundColor:  "#036e3a" ,
                        color: "white",
                        border: "none",
                        padding: "8px 15px",
                        borderRadius: "5px",
                        cursor:  "pointer" ,
                        transition: "background-color 0.3s"
                      }}
                    >
                      Rent Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rental-guide-section" style={{ 
        backgroundColor: "#f5f5f5", 
        padding: "50px 20px",
        marginBottom: "50px"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ color: "#036e3a", textAlign: "center", marginBottom: "30px" }}>
            Machine Rental Guide
          </h2>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "30px"
          }}>
            <div className="guide-card" style={{ 
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "10px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
            }}>
              <h3 style={{ color: "#036e3a", marginBottom: "15px" }}>How Rental Works</h3>
              <p>Browse our selection of agricultural machines, select your rental period, and submit your request. We'll confirm availability and arrange delivery or pickup options.</p>
            </div>
            <div className="guide-card" style={{ 
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "10px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
            }}>
              <h3 style={{ color: "#036e3a", marginBottom: "15px" }}>Rental Terms</h3>
              <p>Our standard rental period is daily, but weekly and monthly rates are available for longer projects. A security deposit is required and will be refunded upon return of the equipment in good condition.</p>
            </div>
            <div className="guide-card" style={{ 
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "10px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
            }}>
              <h3 style={{ color: "#036e3a", marginBottom: "15px" }}>Support & Maintenance</h3>
              <p>All rented equipment comes with basic operational training. We provide 24/7 technical support and emergency maintenance services during your rental period.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default RentMachines;
