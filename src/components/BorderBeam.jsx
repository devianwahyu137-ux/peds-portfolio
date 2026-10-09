import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export default function BorderBeam({
  className,
  duration = 7,
  delay = 0,
  colorFrom = '#10b981',
  colorTo = '#38bdf8',
  borderWidth = 1.5,
  size = 140,
}) {
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        'pointer-events-none absolute -inset-[1px] rounded-[inherit] overflow-hidden z-20',
        className
      )}
    >
      {isInView && (
        <motion.div
          className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2"
          style={{
            background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 300deg, ${colorTo} 330deg, ${colorFrom} 360deg)`,
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            padding: `${borderWidth}px`,
            borderRadius: 'inherit',
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration,
            repeat: Infinity,
            ease: 'linear',
            delay,
          }}
        />
      )}
    </div>
  );
}
