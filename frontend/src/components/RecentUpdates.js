import React, { useEffect } from 'react';
import recent1 from '../Images/recent-img1.jpg';
import recent2 from '../Images/recent-img2.jpg';
import recent3 from '../Images/recent-img3.jpg';
// import './RecentUpdates.css';

function RecentUpdates() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show');
        }
      });
    });

    document.querySelectorAll('.recent-pics > div').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="recent-updates">
      <h1>Check out our recent news and updates</h1>
      <div className="recent-pics">
        <div className="recent-img">
          <img src={recent1} alt="Recent Update 1" />
          <div className="flex">
            <div className="date">
              <span className="date-number">30</span>
              <span className="year">December 2022</span>
            </div>
            <div className="img-description">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        </div>
        <div className="recent-img">
          <img src={recent2} alt="Recent Update 2" />
          <div className="flex">
            <div className="date">
              <span className="date-number">5</span>
              <span className="year">October 2022</span>
            </div>
            <div className="img-description">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        </div>
        <div className="recent-img">
          <img src={recent3} alt="Recent Update 3" />
          <div className="flex">
            <div className="date">
              <span className="date-number">18</span>
              <span className="year">September 2022</span>
            </div>
            <div className="img-description">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RecentUpdates;
