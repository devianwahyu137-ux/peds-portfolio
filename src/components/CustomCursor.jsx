import { useState, useEffect, useRef } from 'react';

export default function CustomCursor() {
  const [isMobile, setIsMobile] = useState(false);
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const outer = useRef({ x: -100, y: -100 });
  const visible = useRef(false);
  const raf = useRef(null);
  const cursorState = useRef('default');

  useEffect(() => {
    const checkMobile = () => {
      const match = window.matchMedia('(pointer: coarse)');
      setIsMobile(match.matches || window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });

    if (isMobile) return () => window.removeEventListener('resize', checkMobile);

    let isAnimating = false;

    const onMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;

      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
        if (!visible.current) {
          innerRef.current.style.opacity = '1';
        }
      }

      if (!visible.current) {
        visible.current = true;
        if (outerRef.current) outerRef.current.style.opacity = '1';
      }

      if (!isAnimating) {
        isAnimating = true;
        raf.current = requestAnimationFrame(animate);
      }

      // Check for custom cursor state only when target changes
      const hoverEl = e.target && e.target.closest ? e.target.closest('[data-cursor]') : null;
      const targetState = hoverEl ? hoverEl.getAttribute('data-cursor') : 'default';

      if (targetState !== cursorState.current) {
        cursorState.current = targetState;
        if (outerRef.current && innerRef.current) {
          if (targetState === 'view') {
            outerRef.current.style.width = '56px';
            outerRef.current.style.height = '56px';
            outerRef.current.style.backgroundColor = 'rgba(16, 185, 129, 0.15)';
            outerRef.current.innerHTML = '<span style="font-size: 9px; font-weight: 700; letter-spacing: 0.1em; color: #10b981;">VIEW</span>';
            innerRef.current.style.opacity = '0';
          } else {
            outerRef.current.style.width = '32px';
            outerRef.current.style.height = '32px';
            outerRef.current.style.backgroundColor = 'transparent';
            outerRef.current.innerHTML = '';
            innerRef.current.style.opacity = '1';
          }
        }
      }
    };

    const onLeave = () => {
      visible.current = false;
      cursorState.current = 'default';
      if (outerRef.current) outerRef.current.style.opacity = '0';
      if (innerRef.current) innerRef.current.style.opacity = '0';
    };

    const animate = () => {
      const dx = pos.current.x - outer.current.x;
      const dy = pos.current.y - outer.current.y;
      outer.current.x += dx * 0.2;
      outer.current.y += dy * 0.2;

      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${outer.current.x}px, ${outer.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (Math.abs(dx) > 0.3 || Math.abs(dy) > 0.3) {
        raf.current = requestAnimationFrame(animate);
      } else {
        isAnimating = false;
        raf.current = null;
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.body.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', onMove);
      document.body.removeEventListener('mouseleave', onLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
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
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1.5px solid rgba(16, 185, 129, 0.45)',
          boxShadow: '0 0 10px rgba(16, 185, 129, 0.15)',
          opacity: 0,
          transition: 'opacity 0.2s, width 0.15s, height 0.15s, background-color 0.15s',
          willChange: 'transform',
        }}
      />
      {/* Inner dot — follows cursor exactly */}
      <div
        ref={innerRef}
        className="fixed top-0 left-0 pointer-events-none z-[100]"
        style={{
          width: 4,
          height: 4,
          borderRadius: '50%',
          backgroundColor: 'rgba(16, 185, 129, 0.85)',
          boxShadow: '0 0 6px rgba(16, 185, 129, 0.5)',
          opacity: 0,
          transition: 'opacity 0.2s',
          willChange: 'transform',
        }}
      />
    </>
  );
}
