"use client";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useRef, useId, useEffect, useCallback } from "react";

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
  registerSlideRef: (index: number, el: HTMLLIElement | null) => void;
  handleSlideClick: (index: number) => void;
  handlePreviousClick: () => void;
  handleNextClick: () => void;
  onBusyChange?: (index: number, busy: boolean) => void;
}

const Slide = ({
  slide,
  index,
  current,
  registerSlideRef,
  handleSlideClick,
  handlePreviousClick,
  handleNextClick,
  onBusyChange,
}: SlideProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Pause video when slide is no longer active
  useEffect(() => {
    if (current !== index && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [current, index]);

  // Notify carousel when user is playing or enlarging video
  useEffect(() => {
    onBusyChange?.(index, isPlaying || isExpanded);
  }, [index, isPlaying, isExpanded, onBusyChange]);

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

  const { src, title } = slide;
  const isVideo = src.toLowerCase().endsWith('.mp4');

  return (
    <div>
      <li
        ref={(el) => registerSlideRef(index, el)}
        className="group flex flex-1 flex-col items-center justify-center relative text-center text-white w-[72vw] sm:w-[315px] h-[128vw] sm:h-[560px] mx-[4vmin] sm:mx-[20px] z-10 will-change-transform"
        onClick={() => handleSlideClick(index)}
        style={{
          transform: current === index ? "scale3d(1, 1, 1)" : "scale3d(0.86, 0.86, 1)",
          opacity: current === index ? 1 : 0.45,
          transformOrigin: "center",
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-zinc-900 rounded-2xl overflow-hidden transition-colors duration-300 border-2 border-zinc-300/60 dark:border-red-900/30 shadow-lg group-hover:border-red-600/80"
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
              preload="metadata"
            />
          ) : (
            <img
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              alt={title}
              src={src}
              onLoad={imageLoaded}
              loading="eager"
              decoding="async"
            />
          )}

          {current === index && !isPlaying && (
            <div className="absolute inset-0 bg-black/25 pointer-events-none" />
          )}

          {/* Custom Play Button Overlay */}
          {current === index && isVideo && !isPlaying && (
            <div
              className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
              onClick={togglePlay}
            >
              <div className="w-16 h-16 bg-red-800/90 rounded-full flex items-center justify-center hover:bg-red-700 hover:scale-105 transition-transform shadow-lg">
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
              className="absolute top-4 right-4 z-30 cursor-pointer hover:scale-110 transition-transform bg-black/80 hover:bg-red-800 p-3 rounded-full border border-white/30 shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(true);
                if (videoRef.current && isPlaying) togglePlay(e);
              }}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              title="Enlarge Video"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l5-5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </div>
          )}
        </div>
      </li>

      {/* Expanded Modal (Lightbox) */}
      {isExpanded && isVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
          onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
        >
          <div
            className="relative w-full max-w-lg mx-auto h-[90vh] sm:h-[80vh] flex flex-col items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              className="w-full h-full object-contain rounded-xl shadow-2xl border border-red-900/50"
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
      className={`w-10 h-10 flex items-center mx-2 justify-center bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full focus:outline-none hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors shadow-sm ${
        type === "previous" ? "rotate-180" : ""
      }`}
      title={title}
      onClick={handleClick}
    >
      <IconArrowNarrowRight className="text-zinc-700 dark:text-zinc-200" />
    </button>
  );
};

interface CarouselProps {
  slides: SlideData[];
}

export default function Carousel({ slides }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [startX, setStartX] = useState<number | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [busySlides, setBusySlides] = useState<Record<number, boolean>>({});
  const [animNonce, setAnimNonce] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);
  const slideRefs = useRef<(HTMLLIElement | null)[]>([]);

  const posRef = useRef(0);
  const currentRef = useRef(0);
  const dirRef = useRef<1 | -1>(1);
  const targetRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  const isPausedByMedia = Object.values(busySlides).some(Boolean);

  const registerSlideRef = useCallback((index: number, el: HTMLLIElement | null) => {
    slideRefs.current[index] = el;
  }, []);

  const handleBusyChange = useCallback((index: number, busy: boolean) => {
    setBusySlides((prev) => {
      if (!!prev[index] === busy) return prev;
      return { ...prev, [index]: busy };
    });
  }, []);

  // Snap smoothly to active slide center when user plays or enlarges video
  useEffect(() => {
    if (isPausedByMedia) {
      targetRef.current = Math.round(posRef.current);
    }
  }, [isPausedByMedia]);

  // Observe whether the carousel is scrolled into view
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // GPU-accelerated DOM animation loop (zero React re-renders per frame)
  useEffect(() => {
    if (slides.length <= 1) return;

    let rafId: number;
    const maxIdx = slides.length - 1;
    const speed = 0.22; // ~4.5s per slide, silky continuous motion

    const applyDOMTransform = (pos: number) => {
      if (ulRef.current) {
        const pct = (pos * 100) / slides.length;
        ulRef.current.style.transform = `translate3d(-${pct}%, 0, 0)`;
      }
      for (let i = 0; i < slides.length; i++) {
        const li = slideRefs.current[i];
        if (!li) continue;
        const dist = Math.min(Math.abs(pos - i), 1);
        const scale = 1 - 0.14 * dist;
        const opacity = 1 - 0.55 * dist;
        li.style.transform = `scale3d(${scale}, ${scale}, 1)`;
        li.style.opacity = `${opacity}`;
      }
      const rounded = Math.round(pos);
      if (rounded !== currentRef.current) {
        currentRef.current = rounded;
        setCurrent(rounded);
      }
    };

    const tick = (now: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = now;
      }
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = now;

      let updated = false;

      if (targetRef.current !== null) {
        const diff = targetRef.current - posRef.current;
        if (Math.abs(diff) < 0.002) {
          posRef.current = targetRef.current;
          targetRef.current = null;
        } else {
          posRef.current += diff * Math.min(1, dt * 8);
        }
        updated = true;
      } else if (isInView && !isHovered && !isPausedByMedia && startX === null) {
        posRef.current += dirRef.current * speed * dt;
        if (posRef.current >= maxIdx) {
          posRef.current = maxIdx;
          dirRef.current = -1; // Mentok kanan -> balik kiri
        } else if (posRef.current <= 0) {
          posRef.current = 0;
          dirRef.current = 1; // Mentok kiri -> balik kanan
        }
        updated = true;
      }

      if (updated) {
        applyDOMTransform(posRef.current);
      }

      if (targetRef.current !== null || (isInView && !isHovered && !isPausedByMedia && startX === null)) {
        rafId = requestAnimationFrame(tick);
      } else {
        lastTimeRef.current = null;
      }
    };

    const shouldRun = targetRef.current !== null || (isInView && !isHovered && !isPausedByMedia && startX === null);
    if (shouldRun) {
      rafId = requestAnimationFrame(tick);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lastTimeRef.current = null;
    };
  }, [isInView, isHovered, isPausedByMedia, startX, slides.length, animNonce]);

  const goToSlide = (targetIdx: number) => {
    const maxIdx = slides.length - 1;
    const clamped = Math.max(0, Math.min(maxIdx, targetIdx));
    dirRef.current = clamped >= posRef.current ? 1 : -1;
    targetRef.current = clamped;
    setAnimNonce((n) => n + 1);
  };

  const handlePreviousClick = () => {
    const base = targetRef.current !== null ? targetRef.current : Math.round(posRef.current);
    const previous = base - 1;
    if (previous < 0) {
      dirRef.current = 1;
      goToSlide(slides.length - 1);
    } else {
      goToSlide(previous);
    }
  };

  const handleNextClick = () => {
    const base = targetRef.current !== null ? targetRef.current : Math.round(posRef.current);
    const next = base + 1;
    if (next >= slides.length) {
      dirRef.current = -1;
      goToSlide(0);
    } else {
      goToSlide(next);
    }
  };

  const handleSlideClick = (index: number) => {
    if (Math.round(posRef.current) !== index) {
      goToSlide(index);
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
      ref={containerRef}
      className="relative w-[72vw] sm:w-[315px] h-[128vw] sm:h-[560px] mx-auto cursor-grab active:cursor-grabbing"
      aria-labelledby={`carousel-heading-${id}`}
      onPointerEnter={(e) => {
        if (e.pointerType === 'mouse') setIsHovered(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === 'mouse') setIsHovered(false);
      }}
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onMouseLeave={(e) => {
        if (startX !== null) handleDragEnd(e);
      }}
      onTouchStart={handleDragStart}
      onTouchEnd={handleDragEnd}
    >
      <ul
        ref={ulRef}
        className="absolute flex mx-[-4vmin] sm:mx-[-20px] will-change-transform"
        style={{
          transform: "translate3d(0%, 0, 0)",
        }}
      >
        {slides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            index={index}
            current={current}
            registerSlideRef={registerSlideRef}
            handleSlideClick={handleSlideClick}
            handlePreviousClick={handlePreviousClick}
            handleNextClick={handleNextClick}
            onBusyChange={handleBusyChange}
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
