// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
// import "./BuyMachines.css"; // Ensure CSS is linked
// import axios from "axios";

// function BuyMachines() {
//   const [machines, setMachines] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate(); // Navigation hook

//   useEffect(() => {
//     fetch("http://localhost:5000/api/buy-machines") // Backend API endpoint
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed to fetch machines");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setMachines(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching machines:", error);
//         setError(error.message);
//         setLoading(false);
//       });
//   }, []);

//   // Function to handle Buy Now button click
//   const handleBuyNow = async (machine) => {
//     const token = localStorage.getItem("token");
  
//     if (!token) {
//       alert("You need to log in first!");
//       navigate("/login"); // Redirect to login
//       return;
//     }
  
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/cart/add", // Ensure this is the correct API
//         { machineId: machine._id }, // Send the machine ID to backend
//         { headers: { Authorization: `Bearer ${token}` } } // Send token for authentication
//       );
  
//       alert(`${machine.name} added to cart!`);
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       alert(error.response?.data?.message || "Server Error! Please try again.");
//     }
//   };
  

//   if (loading) {
//     return <div>Loading machines...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="buy-machines">
//       <h1>Buy Agricultural Machines</h1>
//       <div className="machine-list">
//         {machines.map((machine) => (
//           <div key={machine._id} className="machine-card">
//             <div className="machine-img">
//               <img src={machine.image} alt={machine.name} style={{ width: "200px", height: "auto" }} />
//             </div>
//             <div className="machine-info">
//               <h2>{machine.name}</h2>
//               <p className="price">{machine.price}</p>
//               <p className="description">{machine.description}</p>
//               <button className="buy-button" onClick={() => handleBuyNow(machine)}>Buy Now</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default BuyMachines;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

function BuyMachines() {
  const navigate = useNavigate();
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch machines data from the backend API
    fetch("http://localhost:5000/api/buy-machines")
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

  const handleBuyNow = async (machine) => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      alert("You need to log in first!");
      navigate("/login");
      return;
    }
    
    try {
      const response = await axios.post(
        "http://localhost:5000/api/cart/add",
        { machineId: machine._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      alert(`${machine.name} added to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
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
          Agricultural Machines
        </h1>
        
        <div className="search-container" style={{ maxWidth: "600px", margin: "0 auto 40px" }}>
          <input
            type="text"
            placeholder="Search machines..."
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
            <p>Loading machines data...</p>
          </div>
        ) : error ? (
          <div style={{ textAlign: "center", padding: "50px", color: "red" }}>
            <p>Error: {error}</p>
          </div>
        ) : filteredMachines.length === 0 ? (
          <div style={{ textAlign: "center", padding: "50px" }}>
            <p>No machines found matching your search.</p>
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
                  <p style={{ marginBottom: "15px", fontSize: "14px" }}>{machine.description}</p>
                  
                  {machine.features && (
                    <div style={{ marginBottom: "15px" }}>
                      <strong>Key Features:</strong>
                      <ul style={{ paddingLeft: "20px", marginTop: "5px" }}>
                        {machine.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ fontWeight: "bold", fontSize: "18px" }}>{machine.price}</p>
                    <button 
                      onClick={() => handleBuyNow(machine)}
                      style={{
                        backgroundColor: "#036e3a",
                        color: "white",
                        border: "none",
                        padding: "8px 15px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        transition: "background-color 0.3s"
                      }}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="tips-section" style={{ 
        backgroundColor: "#f5f5f5", 
        padding: "50px 20px",
        marginBottom: "50px"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ color: "#036e3a", textAlign: "center", marginBottom: "30px" }}>
            Farm Machinery Tips & Best Practices
          </h2>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "30px"
          }}>
            <div className="tip-card" style={{ 
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "10px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
            }}>
              <h3 style={{ color: "#036e3a", marginBottom: "15px" }}>Regular Maintenance</h3>
              <p>Keep your agricultural machinery in top condition by following regular maintenance schedules. This extends equipment lifespan and prevents costly breakdowns.</p>
            </div>
            <div className="tip-card" style={{ 
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "10px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
            }}>
              <h3 style={{ color: "#036e3a", marginBottom: "15px" }}>Proper Storage</h3>
              <p>When not in use, store your machinery in dry, covered areas to protect from weather damage. Clean equipment thoroughly before storage.</p>
            </div>
            <div className="tip-card" style={{ 
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "10px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
            }}>
              <h3 style={{ color: "#036e3a", marginBottom: "15px" }}>Operator Training</h3>
              <p>Ensure that everyone who uses the machinery is properly trained on operation and safety procedures to prevent accidents and equipment damage.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default BuyMachines;
