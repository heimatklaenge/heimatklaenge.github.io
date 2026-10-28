import { useEffect, useState } from "react";
import "./ChoirGallery.css";

const images = [
  `${import.meta.env.BASE_URL}images/gallery/gallery1.jpg`,
  `${import.meta.env.BASE_URL}images/gallery/gallery2.jpg`,
  `${import.meta.env.BASE_URL}images/gallery/gallery3.jpg`,
  `${import.meta.env.BASE_URL}images/gallery/gallery4.jpg`,
  `${import.meta.env.BASE_URL}images/gallery/gallery5.jpg`,
  `${import.meta.env.BASE_URL}images/gallery/gallery6.jpg`,
  `${import.meta.env.BASE_URL}images/gallery/gallery7.jpg`,
  `${import.meta.env.BASE_URL}images/gallery/gallery8.jpg`,
  `${import.meta.env.BASE_URL}images/gallery/gallery9.jpg`,
  `${import.meta.env.BASE_URL}images/gallery/gallery10.jpg`,
];

type ChoirGalleryProps = {
  title: string;
  text: string;
  labels: {
    prev: string;
    next: string;
    photo: string;
    show: string;
  };
};

export function ChoirGallery({ title, text, labels }: ChoirGalleryProps) {
  const carouselImages = [
    images[images.length - 1],
    ...images,
    images[0],
  ];

  const [currentImage, setCurrentImage] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth <= 900
  );

  const realCurrentImage =
    (currentImage - 1 + images.length) % images.length;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
  const interval = window.setInterval(() => {
    if (!isPaused) {
      setTransitionEnabled(true);
      setCurrentImage((current) => current + 1);
    }
  }, 4000);

  return () => window.clearInterval(interval);
}, [isPaused]);

  const showPreviousImage = () => {
    setTransitionEnabled(true);
    setCurrentImage((current) => current - 1);
  };

  const showNextImage = () => {
    setTransitionEnabled(true);
    setCurrentImage((current) => current + 1);
  };

  // Доехали до одной из копий (клонов) на краю ленты — беззвучно
  // прыгаем на настоящий слайд, чтобы петля выглядела бесконечной.
  const resetLoopBoundary = () => {
    if (currentImage === images.length + 1) {
      setTransitionEnabled(false);
      setCurrentImage(1);

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setTransitionEnabled(true);
        });
      });
    }

    if (currentImage === 0) {
      setTransitionEnabled(false);
      setCurrentImage(images.length);

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setTransitionEnabled(true);
        });
      });
    }
  };

  const handleTransitionEnd = () => {
    resetLoopBoundary();
  };

  // Страховка: если `transitionend` не сработает (например, вкладка
  // была в фоне и браузер приостановил анимации/отрисовку), сбрасываем
  // позицию каруселей сами — иначе currentImage будет бесконечно расти
  // с каждым тиком интервала, и карусель "улетит" в пустоту.
  useEffect(() => {
    if (currentImage !== images.length + 1 && currentImage !== 0) {
      return;
    }

    const timeout = window.setTimeout(resetLoopBoundary, 850);

    return () => window.clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentImage]);

  const selectImage = (index: number) => {
    setTransitionEnabled(true);
    setCurrentImage(index + 1);
  };

  return (
    <section className="choir-gallery" id="gallery">
      <div className="choir-gallery__container">
        <h2 className="choir-gallery__title">{title}</h2>

        <p className="choir-gallery__text">{text}</p>

        <div
  className="choir-gallery__carousel"
  onMouseEnter={() => setIsPaused(true)}
  onMouseLeave={() => setIsPaused(false)}
>
          <button
            type="button"
            className="choir-gallery__button choir-gallery__button--left"
            onClick={showPreviousImage}
            aria-label={labels.prev}
          >
            ‹
          </button>

          <div className="choir-gallery__viewport">
            <div
              className="choir-gallery__track"
              onTransitionEnd={handleTransitionEnd}
              style={{
  transform: isMobile
  ? `translateX(-${currentImage * 100}%)`
  : `translateX(calc(
      15% - ${currentImage * 70}% - ${currentImage * 2}rem
    ))`,
  transition: transitionEnabled
    ? "transform 0.8s ease"
    : "none",
}}
            >
              {carouselImages.map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className={`choir-gallery__slide ${
                    index === currentImage
                      ? "choir-gallery__slide--active"
                      : ""
                  }`}
                >
                  <img
                    src={image}
                    alt={`${labels.photo} ${
                      ((index - 1 + images.length) % images.length) + 1
                    }`}
                    className="choir-gallery__image"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="choir-gallery__button choir-gallery__button--right"
            onClick={showNextImage}
            aria-label={labels.next}
          >
            ›
          </button>
        </div>

        <div className="choir-gallery__dots">
          {images.map((_, index) => (
            <button
              type="button"
              key={index}
              className={`choir-gallery__dot ${
                index === realCurrentImage
                  ? "choir-gallery__dot--active"
                  : ""
              }`}
              onClick={() => selectImage(index)}
              aria-label={`${labels.show} ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}