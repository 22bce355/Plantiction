import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("You need to log in first!");
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCart(response.data);
      } catch (err) {
        console.error("Error fetching cart:", err);
        setError("Failed to load cart.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [navigate]);

  const removeFromCart = async (machineId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/cart/remove",
        { machineId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update cart UI after removal
      setCart(cart.filter((item) => item.machineId._id !== machineId));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  if (loading) return <div>Loading cart...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div key={item.machineId._id} className="cart-item">
            <img src={item.machineId.image} alt={item.machineId.name} style={{ width: "100px" }} />
            <div className="cart-details">
              <h2>{item.machineId.name}</h2>
              <p>Price: {item.machineId.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => removeFromCart(item.machineId._id)}>Remove</button>
            </div>
          </div>
        ))
      )}
      <button onClick={() => navigate("/")}>Continue Shopping</button>
    </div>
  );
}

export default Cart;
