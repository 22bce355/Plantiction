import React , {useEffect,useState} from 'react';
import whattheysay from '../Images/what-they-img.png'

function CustomerReviews() {
  const [slidePosition, setSlidePosition] = useState(0);

  useEffect(() => {
    const sliders = document.querySelectorAll('.review');
    const totalSlides = sliders.length;

    const updatePosition = () => {
      sliders.forEach((slide) => {
        slide.classList.remove('active');
        slide.classList.add('hidden');
      });
      sliders[slidePosition].classList.add('active');
    };

    const interval = setInterval(() => {
      setSlidePosition((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    }, 5000);

    updatePosition();

    return () => clearInterval(interval);
  }, [slidePosition]);
  return (
    <section className="what-they-say">
      <h1>What Our Customers Say About Us</h1>
      <div className="div">
        <div className="what-they-say-image">
          <img src={whattheysay} alt="Customer Reviews" />
        </div>

        <div className="reviews">
          <div className="review active">
            <p>"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero corrupti,!"</p>
            <div className="img-review">
              <div className="user-profile1"></div>
              <h3>Hizbullah Razik</h3>
            </div>
            <div className="review-rating">
              <span className="star-div">&#9733;</span>
              <span className="star-div">&#9733;</span>
              <span className="star-div">&#9733;</span>
              <span className="star-div">&#9733;</span>
              <span className="star-div-none">&#9734;</span>
              <span className="review-rating-text">4/5</span>
            </div>
          </div>

          <div className="review">
            <p>"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero corrupti,!"</p>
            <div className="img-review">
              <div className="user-profile2"></div>
              <h3>Janrthan Manojkumar</h3>
            </div>
            <div className="review-rating">
              <span className="star-div">&#9733;</span>
              <span className="star-div">&#9733;</span>
              <span className="star-div">&#9733;</span>
              <span className="star-div-none">&#9734;</span>
              <span className="star-div-none">&#9734;</span>
              <span className="review-rating-text">3/5</span>
            </div>
          </div>

          <div className="review">
            <p>"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero corrupti,!"</p>
            <div className="img-review">
              <div className="user-profile3"></div>
              <h3>Meshith Ariyanawansa</h3>
            </div>
            <div className="review-rating">
              <span className="star-div">&#9733;</span>
              <span className="star-div">&#9733;</span>
              <span className="star-div">&#9733;</span>
              <span className="star-div">&#9733;</span>
              <span className="star-div-none">&#9734;</span>
              <span className="review-rating-text">4/5</span>
            </div>
          </div>

          <div className="review">
            <p>"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero corrupti,!"</p>
            <div className="img-review">
              <div className="user-profile4"></div>
              <h3>Jayasinghe</h3>
            </div>
            <div className="review-rating">
              <span className="star-div">&#9733;</span>
              <span className="star-div">&#9733;</span>
              <span className="star-div">&#9733;</span>
              <span className="star-div">&#9733;</span>
              <span className="star-div">&#9733;</span>
              <span className="review-rating-text">5/5</span>
            </div>
          </div>

          <div className="review">
            <p>
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere placeat laudantium facilis ullam iure numquam
              quidem amet doloremque, maiores, ad modi veritatis ea aliquam nisi pariatur, architecto voluptas omnis labore."
            </p>
            <div className="img-review">
              <div className="user-profile5"></div>
              <h3>Alex Lee</h3>
            </div>
            <div className="review-rating">
              <span className="star-div">&#9733;</span>
              <span className="star-div">&#9733;</span>
              <span className="star-div">&#9733;</span>
              <span className="star-div">&#9733;</span>
              <span className="star-div-none">&#9734;</span>
              <span className="review-rating-text">4/5</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CustomerReviews;
