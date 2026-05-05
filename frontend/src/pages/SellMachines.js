import React, { useState } from "react";
import "./SellMachines.css";

function SellMachine() {
  const [formData, setFormData] = useState({
    type: "sell",
    machineName: "",
    description: "",
    price: "",
    location: "",
    image: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("type", formData.type);
    formDataToSend.append("machineName", formData.machineName);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("location", formData.location);
    
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const response = await fetch("http://localhost:5000/api/machines/sell-rent", {
        method: "POST",
        body: formDataToSend, // Do NOT set Content-Type manually!
      });

      const result = await response.json();
      console.log("Server Response:", result);

      if (response.ok) {
        alert("Machine listed successfully!");
        setFormData({
          type: "sell",
          machineName: "",
          description: "",
          price: "",
          location: "",
          image: null,
        });

        document.getElementById("imageInput").value = ""; // Clear file input
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to list machine.");
    }
  };

  return (
    <div className="sell-machine-container">
      <h2>Sell or Rent Your Machine</h2>
      <form onSubmit={handleSubmit} className="sell-machine-form" encType="multipart/form-data">
        <label>Choose an option:</label>
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="sell">Sell</option>
          <option value="rent">Rent</option>
        </select>

        <label>Machine Name:</label>
        <input type="text" name="machineName" value={formData.machineName} onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>

        <label>Expected Price (₹):</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />

        <label>Location:</label>
        <input type="text" name="location" value={formData.location} onChange={handleChange} required />

        <label>Upload Image:</label>
        <input id="imageInput" type="file" accept="image/*" onChange={handleFileChange} required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SellMachine;
