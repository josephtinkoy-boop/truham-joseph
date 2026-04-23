import slide1 from "../images/slide1.jpg";
import slide2 from "../images/slide2.jpg";
import slide3 from "../images/slide3.jpg";

function Carousel() {
  const slides = [slide1, slide2, slide3];

  return (
    <div className="container-fluid p-0 mb-4">
      <div
        id="heroCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="2000"
      >
        <div className="carousel-inner">

          {slides.map((img, i) => (
            <div
              key={i}
              className={`carousel-item ${i === 0 ? "active" : ""}`}
            >
              <img
                src={img}
                className="d-block w-100"
                alt={`slide-${i}`}
                style={{
                  height: "400px",
                  objectFit: "cover"
                }}
              />
            </div>
          ))}

        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" />
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" />
        </button>

      </div>
    </div>
  );
}

export default Carousel;