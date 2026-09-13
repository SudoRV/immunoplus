import React, { useState, useRef } from 'react';

const cardsData = [
  {
    id: 1,
    title: 'Pure',
    subtitle: 'Quality',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=400&q=80',
  },
  {
    id: 2,
    title: 'Healthier',
    subtitle: 'Lives',
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b909?w=400&q=80',
  },
  {
    id: 3,
    title: 'Premium Technology',
    subtitle: 'for a Healthier Tomorrow',
    image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=400&q=80',
  },
  {
    id: 4,
    title: 'For Homes',
    subtitle: '& Businesses',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&q=80',
  },
  {
    id: 5,
    title: 'A Cleaner',
    subtitle: 'Greener Future',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80',
  },
];

const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState(2); // Centers item #3 initially
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollTimeout = useRef(null);

  const total = cardsData.length;

  // Move carousel back or forward
  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : total - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < total - 1 ? prev + 1 : 0));
  };

  // Wheel scroll with throttle
  const handleWheel = (e) => {
    if (scrollTimeout.current) return;
    if (e.deltaY > 20 || e.deltaX > 20) {
      handleNext();
    } else if (e.deltaY < -20 || e.deltaX < -20) {
      handlePrev();
    }
    scrollTimeout.current = setTimeout(() => {
      scrollTimeout.current = null;
    }, 250);
  };

  // Touch & drag handlers
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const diff = e.clientX - startX.current;
    if (diff > 50) {
      handlePrev();
      isDragging.current = false;
    } else if (diff < -50) {
      handleNext();
      isDragging.current = false;
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    const diff = e.touches[0].clientX - startX.current;
    if (diff > 50) {
      handlePrev();
      startX.current = e.touches[0].clientX;
    } else if (diff < -50) {
      handleNext();
      startX.current = e.touches[0].clientX;
    }
  };

  // Calculates 3D coordinates based on relative position to the active card
  const getCardStyle = (index) => {
    let offset = index - activeIndex;

    // Handle wrapping around boundaries
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;

    const absOffset = Math.abs(offset);
    const isCenter = offset === 0;

    // Smooth drop-off beyond visible range (±2 cards)
    const isHidden = absOffset > 2;

    const translateX = offset * 135;
    const translateZ = isCenter ? 120 : absOffset === 1 ? 0 : -120;
    const rotateY = offset * -18;
    const opacity = isHidden ? 0 : absOffset === 2 ? 0.75 : 1;
    const zIndex = 10 - absOffset;

    return {
      transform: `translate(-50%, -50%) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
      zIndex,
      opacity,
      pointerEvents: isHidden ? 'none' : 'auto',
    };
  };

  return (
    <div className="w-full flex flex-col items-center select-none font-sans text-white">
      <div
        className="relative w-full h-40 md:h-90 flex justify-center items-center cursor-grab active:cursor-grabbing"
        style={{ perspective: '1400px' }}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div
          className="relative w-full h-full"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {cardsData.map((card, index) => {
            let offset = index - activeIndex;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isCenter = offset === 0;

            return (
              <div
                key={card.id}
                onClick={() => setActiveIndex(index)}
                className={`absolute left-1/2 top-1/2 w-[90%] md:w-[60%] aspect-video rounded-2xl bg-cover bg-center overflow-hidden flex flex-col justify-end text-center p-2 md:p-4 cursor-pointer border transition-all duration-500 ease-out shadow-[0_15px_35px_rgba(0,0,0,0.7)] ${
                  isCenter
                    ? 'border-[#00f0ffcc] shadow-[0_0_30px_rgba(0,240,255,0.3)]'
                    : 'border-[#00f0ff33]'
                }`}
                style={{
                  ...getCardStyle(index),
                  backgroundImage: `url(${card.image})`,
                }}
              >
                {/* Gradient shade */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent from-30% via-black/40 to-black/95 z-[1]" />
                    
                {/* Text info */}
                <div className="relative z-[2] transition-opacity duration-300">
                  <h3
                    className={`font-bold leading-tight transition-all duration-300 ${
                      isCenter ? 'text-sm md:text-lg text-white' : 'text-sm text-neutral-200'
                    }`}
                  >
                    {card.title}
                  </h3>
                  <p
                    className={`font-light leading-snug transition-all duration-300 ${
                      isCenter
                        ? 'text-[11px] md:text-sm text-sky-200'
                        : 'text-[10px] text-neutral-400'
                    }`}
                  >
                    {card.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Slide dots */}
      <div className="flex gap-2 mt-4 z-20">
        {cardsData.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              activeIndex === idx
                ? 'w-7 bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]'
                : 'w-2 bg-neutral-600 hover:bg-neutral-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;