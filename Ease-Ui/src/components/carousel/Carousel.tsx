import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

export interface CarouselProps {
  items: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  loop?: boolean;
  showArrows?: boolean;
  showDots?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}

export const Carousel: React.FC<CarouselProps> = ({
  items,
  autoPlay = true,
  interval = 3500,
  loop = true,
  showArrows = true,
  showDots = true,
  pauseOnHover = true,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const touchStartX = useRef<number | null>(null);

  const hasSlides = items.length > 0;

  const goTo = useCallback(
    (index: number) => {
      if (!hasSlides) return;
      if (loop) {
        setCurrentIndex((index + items.length) % items.length);
      } else {
        setCurrentIndex(Math.max(0, Math.min(index, items.length - 1)));
      }
    },
    [hasSlides, items.length, loop]
  );

  const nextSlide = useCallback(() => {
    if (!hasSlides) return;
    if (!loop && currentIndex === items.length - 1) return;
    goTo(currentIndex + 1);
  }, [currentIndex, goTo, hasSlides, items.length, loop]);

  const prevSlide = useCallback(() => {
    if (!hasSlides) return;
    if (!loop && currentIndex === 0) return;
    goTo(currentIndex - 1);
  }, [currentIndex, goTo, hasSlides, loop]);

  useEffect(() => {
    setCurrentIndex((index) => Math.min(index, Math.max(items.length - 1, 0)));
  }, [items.length]);

  useEffect(() => {
    if (!autoPlay || !isPlaying || isPaused || items.length < 2) return;
    const timer = window.setInterval(nextSlide, Math.max(1500, interval));
    return () => window.clearInterval(timer);
  }, [autoPlay, interval, isPaused, isPlaying, items.length, nextSlide]);

  useEffect(() => {
    if (!autoPlay) setIsPlaying(false);
  }, [autoPlay]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") prevSlide();
      if (event.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [nextSlide, prevSlide]);

  if (!hasSlides) {
    return (
      <div className={`carousel-empty ${className}`}>No slides available.</div>
    );
  }

  return (
    <div
      className={`carousel ${className}`}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Content carousel"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      onTouchStart={(event) => {
        touchStartX.current = event.changedTouches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStartX.current === null) return;
        const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
        const distance = endX - touchStartX.current;
        if (Math.abs(distance) > 45) {
          distance > 0 ? prevSlide() : nextSlide();
        }
        touchStartX.current = null;
      }}
    >
      <div className="carousel-viewport">
        <div
          className="carousel-track"
          style={{ transform: `translate3d(-${currentIndex * 100}%, 0, 0)` }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="carousel-slide"
              aria-hidden={currentIndex !== index}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {showArrows && items.length > 1 && (
        <>
          <button
            type="button"
            onClick={prevSlide}
            className="carousel-arrow carousel-arrow--left"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="carousel-arrow carousel-arrow--right"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      <div className="carousel-controls">
        {showDots && items.length > 1 && (
          <div className="carousel-dots" aria-label="Choose slide">
            {items.map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => goTo(index)}
                className={`carousel-dot ${currentIndex === index ? "is-active" : ""}`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={currentIndex === index ? "true" : undefined}
              />
            ))}
          </div>
        )}

        {items.length > 1 && (
          <button
            type="button"
            className="carousel-play"
            onClick={() => setIsPlaying((value) => !value)}
            aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
            title={isPlaying ? "Pause autoplay" : "Play autoplay"}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Carousel;
