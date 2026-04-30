import slide1 from "../images/slide1.jpg";
import slide2 from "../images/slide2.jpg";
import slide3 from "../images/slide3.jpg";

function Carousel() {
  const slides = [slide1, slide2, slide3];

  return (
    <div className="container-fluid p-0 mb-4">
      <div
        id="heroCarousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <div className="carousel-indicators">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide-to={i}
              className={i === 0 ? "active" : ""}
              aria-current={i === 0 ? "true" : "false"}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <div className="carousel-inner">

          {slides.map((img, i) => (
            <div
              key={i}
              className={`carousel-item ${i === 0 ? "active" : ""}`}
              data-bs-interval="3000"
            >
              <img
                src={img}
                className="d-block w-100"
                alt={`Slide ${i + 1}`}
                style={{
                  height: "450px",
                  objectFit: "cover"
                }}
              />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
                <h5>Welcome to Tinkoy Shop</h5>
                <p>Discover amazing products at great prices!</p>
              </div>
            </div>
          ))}

        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon bg-dark rounded-circle p-3" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon bg-dark rounded-circle p-3" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>

      </div>
    </div>
  );
}

export default Carousel;