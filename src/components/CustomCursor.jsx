import { useState, useEffect, useRef } from 'react';

export default function CustomCursor() {
  const [isMobile, setIsMobile] = useState(false);
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const outer = useRef({ x: -100, y: -100 });
  const visible = useRef(false);
  const raf = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      const match = window.matchMedia('(pointer: coarse)');
      setIsMobile(match.matches || window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (isMobile) return () => window.removeEventListener('resize', checkMobile);

    const onMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      // Inner dot follows instantly
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
        innerRef.current.style.opacity = '1';
      }
      if (!visible.current) {
        visible.current = true;
        if (outerRef.current) outerRef.current.style.opacity = '1';
      }

      // Check for custom cursor states
      const hoverEl = e.target.closest('[data-cursor]');
      if (hoverEl && outerRef.current && innerRef.current) {
        const cursorType = hoverEl.getAttribute('data-cursor');
        if (cursorType === 'view') {
          outerRef.current.style.width = '64px';
          outerRef.current.style.height = '64px';
          outerRef.current.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
          outerRef.current.style.backdropFilter = 'blur(2px)';
          outerRef.current.innerHTML = '<span style="font-size: 10px; font-weight: bold; letter-spacing: 0.1em; color: #10b981;">VIEW</span>';
          innerRef.current.style.opacity = '0'; // hide inner dot
        }
      } else {
        if (outerRef.current && innerRef.current) {
          outerRef.current.style.width = '36px';
          outerRef.current.style.height = '36px';
          outerRef.current.style.backgroundColor = 'transparent';
          outerRef.current.style.backdropFilter = 'none';
          outerRef.current.innerHTML = '';
          innerRef.current.style.opacity = '1';
        }
      }
    };

    const onLeave = () => {
      visible.current = false;
      if (outerRef.current) outerRef.current.style.opacity = '0';
      if (innerRef.current) innerRef.current.style.opacity = '0';
    };

    // Outer ring follows with smooth lag (lerp)
    const animate = () => {
      outer.current.x += (pos.current.x - outer.current.x) * 0.12;
      outer.current.y += (pos.current.y - outer.current.y) * 0.12;
      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${outer.current.x}px, ${outer.current.y}px) translate(-50%, -50%)`;
      }
      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.body.addEventListener('mouseleave', onLeave);
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', onMove);
      document.body.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Outer ring — trails cursor with smooth lerp */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 pointer-events-none z-[100] flex items-center justify-center"
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1.5px solid rgba(16, 185, 129, 0.4)',
          boxShadow: '0 0 12px rgba(16, 185, 129, 0.15), inset 0 0 8px rgba(16, 185, 129, 0.05)',
          opacity: 0,
          transition: 'opacity 0.3s, width 0.2s, height 0.2s, background-color 0.2s, backdrop-filter 0.2s',
          willChange: 'transform',
        }}
      />
      {/* Inner dot — follows cursor exactly */}
      <div
        ref={innerRef}
        className="fixed top-0 left-0 pointer-events-none z-[100]"
        style={{
          width: 5,
          height: 5,
          borderRadius: '50%',
          backgroundColor: 'rgba(16, 185, 129, 0.8)',
          boxShadow: '0 0 6px rgba(16, 185, 129, 0.5)',
          opacity: 0,
          transition: 'opacity 0.3s',
          willChange: 'transform',
        }}
      />
    </>
  );
}
