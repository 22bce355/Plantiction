// src/pages/Home.js
import React, {useEffect} from 'react';
import Navbar from '../components/Navbar';
import "../styles.css"
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import LookingFor from '../components/LookingFor';
import About from '../components/About';
import Services from '../components/Services';
import Partners from '../components/Partners';
import CustomerReviews from '../components/CustomerReviews';
import Footer from '../components/Footer';

function Home() {
  useEffect(() => {
    const slideObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show');
        }
      });
    });

    document.querySelectorAll('.actual-card').forEach((el) => slideObserver.observe(el));
    document.querySelectorAll('#partners-img').forEach((el) => slideObserver.observe(el));
    document.querySelectorAll('.recent-pics').forEach((el) => slideObserver.observe(el));

    return () => slideObserver.disconnect();
  }, []);
  return (
    <>
    <div className='home'>
     <Navbar />
     <Hero /> 
     <SearchBar />
     </div>
   
      
      
      
      <div className='sub-home'>
      <LookingFor />
      </div>
      <div className="sub-hero-image" id="sub-hero-image">

    </div>
      <About />
      <Services />
      <Partners />
      
      <CustomerReviews />
      <Footer />
    </>
  );
}

export default Home;