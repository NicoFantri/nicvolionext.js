"use client";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useRef, useId, useEffect } from "react";

interface SlideData {
  title: string;
  button: string;
  src: string;
  href?: string;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
  handlePreviousClick: () => void;
  handleNextClick: () => void;
}

const Slide = ({ slide, index, current, handleSlideClick, handlePreviousClick, handleNextClick }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [isExpanded, setIsExpanded] = useState(false);

  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number>();

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;

      const x = xRef.current;
      const y = yRef.current;

      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  // Pause video when slide is no longer active
  useEffect(() => {
    if (current !== index && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [current, index]);

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement | HTMLVideoElement>) => {
    event.currentTarget.style.opacity = "1";
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const { src, button, title, href } = slide;
  const isVideo = src.toLowerCase().endsWith('.mp4');

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d]">
      <li
        ref={slideRef}
        className="group flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[72vw] sm:w-[315px] h-[128vw] sm:h-[560px] mx-[4vmin] sm:mx-[20px] z-10"
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: current !== index ? "scale(0.85)" : "scale(1)",
          opacity: current !== index ? 0.4 : 1,
          transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "center",
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-[#1D1F2F] rounded-2xl overflow-hidden transition-all duration-500 ease-out border-2 border-red-900/30 shadow-[0_0_15px_rgba(153,27,27,0.1)] group-hover:border-red-700/80 group-hover:shadow-[0_0_30px_rgba(153,27,27,0.4)]"
        >
          {isVideo ? (
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              src={src}
              onLoadedData={imageLoaded}
              loop
              playsInline
              muted={false}
            />
          ) : (
            <img
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              alt={title}
              src={src}
              onLoad={imageLoaded}
              loading="eager"
              decoding="sync"
            />
          )}

          {current === index && !isPlaying && (
            <div className="absolute inset-0 bg-black/30 transition-all duration-1000 pointer-events-none" />
          )}

          {/* Custom Play Button Overlay */}
          {current === index && isVideo && !isPlaying && (
            <div 
              className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
              onClick={togglePlay}
            >
              <div className="w-16 h-16 bg-red-800/80 rounded-full flex items-center justify-center hover:bg-red-700/90 hover:scale-110 transition-all backdrop-blur-sm shadow-[0_0_20px_rgba(153,27,27,0.5)]">
                <svg className="w-8 h-8 text-white ml-1 pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}

          {/* Invisible overlay to pause when playing */}
          {current === index && isVideo && isPlaying && (
            <div 
              className="absolute inset-0 z-10 cursor-pointer"
              onClick={togglePlay}
            />
          )}

          {/* Side click zones for Next/Prev Navigation */}
          {current === index && (
            <>
              <div 
                className="absolute top-0 left-0 w-[25%] h-full z-20 cursor-pointer"
                onClick={(e) => { e.stopPropagation(); handlePreviousClick(); }}
                title="Previous Slide"
              />
              <div 
                className="absolute top-0 right-0 w-[25%] h-full z-20 cursor-pointer"
                onClick={(e) => { e.stopPropagation(); handleNextClick(); }}
                title="Next Slide"
              />
            </>
          )}

          {/* Fullscreen Enlarge Button */}
          {current === index && isVideo && (
            <div 
              className="absolute top-4 right-4 z-30 cursor-pointer hover:scale-110 transition-transform bg-black/80 hover:bg-red-800/90 p-3 rounded-full border border-white/30 shadow-[0_0_15px_rgba(0,0,0,0.7)] backdrop-blur-md"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(true);
                // Pause the small video if it's playing
                if (videoRef.current && isPlaying) togglePlay(e);
              }}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              title="Enlarge Video"
            >
              <svg className="w-6 h-6 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l5-5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </div>
          )}
        </div>
      </li>

      {/* Expanded Modal (Lightbox) */}
      {isExpanded && isVideo && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
          onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
        >
          <div 
            className="relative w-full max-w-lg mx-auto h-[90vh] sm:h-[80vh] flex flex-col items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              className="w-full h-full object-contain rounded-xl shadow-[0_0_40px_rgba(153,27,27,0.4)] border border-red-900/50"
              src={src}
              autoPlay
              controls
              loop
              playsInline
            />
            <button 
              className="absolute top-4 right-4 sm:-right-4 sm:-top-4 bg-red-800 text-white rounded-full p-2.5 hover:bg-red-700 transition-colors shadow-lg border border-red-500 z-50 hover:scale-110"
              onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
              title="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

interface CarouselControlProps {
  type: string;
  title: string;
  handleClick: () => void;
}

const CarouselControl = ({
  type,
  title,
  handleClick,
}: CarouselControlProps) => {
  return (
    <button
      className={`w-10 h-10 flex items-center mx-2 justify-center bg-neutral-200 dark:bg-neutral-800 border-3 border-transparent rounded-full focus:border-[#6D64F7] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 ${
        type === "previous" ? "rotate-180" : ""
      }`}
      title={title}
      onClick={handleClick}
    >
      <IconArrowNarrowRight className="text-neutral-600 dark:text-neutral-200" />
    </button>
  );
};

interface CarouselProps {
  slides: SlideData[];
}

export default function Carousel({ slides }: CarouselProps) {
  const [current, setCurrent] = useState(Math.floor(slides.length / 2));

  const [startX, setStartX] = useState<number | null>(null);

  const handlePreviousClick = () => {
    const previous = current - 1;
    setCurrent(previous < 0 ? slides.length - 1 : previous);
  };

  const handleNextClick = () => {
    const next = current + 1;
    setCurrent(next === slides.length ? 0 : next);
  };

  const handleSlideClick = (index: number) => {
    if (current !== index) {
      setCurrent(index);
    }
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if ('touches' in e) {
      setStartX(e.touches[0].clientX);
    } else {
      setStartX((e as React.MouseEvent).clientX);
    }
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (startX === null) return;
    
    let endX = 0;
    if ('changedTouches' in e) {
      endX = e.changedTouches[0].clientX;
    } else {
      endX = (e as React.MouseEvent).clientX;
    }

    const deltaX = endX - startX;
    
    // Threshold for swipe detection
    if (deltaX > 50) {
      handlePreviousClick();
    } else if (deltaX < -50) {
      handleNextClick();
    }
    
    setStartX(null);
  };

  const id = useId();

  return (
    <div
      className="relative w-[72vw] sm:w-[315px] h-[128vw] sm:h-[560px] mx-auto cursor-grab active:cursor-grabbing"
      aria-labelledby={`carousel-heading-${id}`}
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onMouseLeave={(e) => {
        if (startX !== null) handleDragEnd(e);
      }}
      onTouchStart={handleDragStart}
      onTouchEnd={handleDragEnd}
    >
      <ul
        className="absolute flex mx-[-4vmin] sm:mx-[-20px] transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${current * (100 / slides.length)}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
            handlePreviousClick={handlePreviousClick}
            handleNextClick={handleNextClick}
          />
        ))}
      </ul>

      <div className="absolute flex justify-center w-full top-[calc(100%+2rem)] pointer-events-none">
        <div className="pointer-events-auto flex gap-4">
          <CarouselControl
            type="previous"
            title="Go to previous slide"
            handleClick={handlePreviousClick}
          />

          <CarouselControl
            type="next"
            title="Go to next slide"
            handleClick={handleNextClick}
          />
        </div>
      </div>
    </div>
  );
}
