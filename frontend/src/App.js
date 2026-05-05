import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';  
import ChatWidget from './components/ChatWidjet';
import BuyMachines from './pages/BuyMachines';
import SellMachine from './pages/SellMachines';
import RentMachines from './pages/RentMachine';
import Login from './pages/Login.js';
import Registration from './pages/Registration.js';
import  Cart from './components/Cart.js'
import Fertilizers from './components/Fertilizers.js';
import Cultivation from './components/Cultivation.js';
import Contactus from './components/Contactus.js';
function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/buy-machines" element={<BuyMachines />} />
        <Route path="/rent-machines" element={<RentMachines />} />
        <Route path="/sell-machines" element={<SellMachine />}/>
        <Route path="/login" element={<Login/>}/> 
        <Route path="/create-account" element={<Registration/>}/>
        <Route path="/fertilizers" element={<Fertilizers/>}/>
        <Route path="/cultivation" element={<Cultivation/>}/>
        <Route path="/contactus"  element={<Contactus/>}/>
       </Routes>
       <ChatWidget/>
    </Router>
  );
}

export default App;
