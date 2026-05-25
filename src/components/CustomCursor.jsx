import React, { useState, useEffect } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile or touch
    const checkMobile = () => {
      const match = window.matchMedia('(pointer: coarse)');
      setIsMobile(match.matches || window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    if (!isMobile) {
      window.addEventListener('mousemove', onMouseMove);
      document.body.addEventListener('mouseleave', onMouseLeave);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible, isMobile]);

  if (isMobile) return null;

  return (
    <div 
      className="fixed pointer-events-none z-[100] transition-opacity duration-300 mix-blend-difference"
      style={{
        left: position.x,
        top: position.y,
        opacity: isVisible ? 0.25 : 0,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="relative flex items-center justify-center">
        {/* Horizontal Line */}
        <div className="absolute w-8 h-[1px] bg-white border-dashed border-t border-white"></div>
        {/* Vertical Line */}
        <div className="absolute h-8 w-[1px] bg-white border-dashed border-l border-white"></div>
      </div>
    </div>
  );
}
