import { useEffect, useRef } from 'react';

// ── Color palette (emerald/teal financial theme) ──────────────────────
const PALETTE = [
  { r: 16, g: 185, b: 129, w: 0.40 },   // emerald-500
  { r: 20, g: 184, b: 166, w: 0.25 },   // teal-500
  { r: 52, g: 211, b: 153, w: 0.20 },   // emerald-400
  { r: 255, g: 255, b: 255, w: 0.15 },  // white accent
];

function pickColor() {
  let r = Math.random();
  for (const c of PALETTE) {
    r -= c.w;
    if (r <= 0) return { r: c.r, g: c.g, b: c.b };
  }
  return PALETTE[0];
}

// ── Particle ──────────────────────────────────────────────────────────
class Particle {
  constructor(w, h, layer) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.layer = layer;

    const speed = 0.08 + layer * 0.05;
    this.vx = (Math.random() - 0.5) * speed * 2;
    this.vy = (Math.random() - 0.5) * speed * 2;
    this.maxSpeed = speed * 2;

    this.radius = 0.6 + layer * 0.3;
    this.baseRadius = this.radius;
    this.opacity = 0.08 + layer * 0.06;
    this.color = pickColor();
  }

  update(w, h, mx, my, hasMouse) {
    if (hasMouse && mx > -500) {
      const dx = mx - this.x;
      const dy = my - this.y;
      const distSq = dx * dx + dy * dy;
      const attractRadiusSq = 140 * 140;

      if (distSq < attractRadiusSq && distSq > 1) {
        const dist = Math.sqrt(distSq);
        const force = (1 - dist / 140) * 0.015;
        this.vx += (dx / dist) * force;
        this.vy += (dy / dist) * force;
      }
    }

    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.995;
    this.vy *= 0.995;

    // Wrap boundaries smoothly
    const buf = 20;
    if (this.x < -buf) this.x = w + buf;
    else if (this.x > w + buf) this.x = -buf;
    if (this.y < -buf) this.y = h + buf;
    else if (this.y > h + buf) this.y = -buf;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color.r},${this.color.g},${this.color.b},${this.opacity})`;
    ctx.fill();
  }
}

// ── Responsive config ─────────────────────────────────────────────────
function getConfig(width, isTouch = false) {
  if (isTouch || width < 768) return { count: 0, dist: 0 }; // Completely disabled on mobile for zero lag
  if (width < 1200) return { count: 32, dist: 110 };
  return { count: 48, dist: 125 }; // High-performance desktop constellation
}

// ── Component ─────────────────────────────────────────────────────────
export default function ParticleNetwork() {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    raf: null,
    particles: [],
    mouse: { x: -1000, y: -1000 },
    hasMouse: false,
    lastFrameTime: 0,
    isActive: true,
  });

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouch) return; // Exit early on mobile devices

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    const st = stateRef.current;
    st.hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    const applySize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };

    const initParticles = () => {
      const { count } = getConfig(w, isTouch);
      const particles = [];
      for (let i = 0; i < count; i++) {
        const layer = i < count * 0.4 ? 0 : 1;
        particles.push(new Particle(w, h, layer));
      }
      st.particles = particles;
    };

    applySize();
    initParticles();

    // Mouse tracking with throttling
    const onMouseMove = (e) => {
      st.mouse.x = e.clientX;
      st.mouse.y = e.clientY;
    };
    const onMouseLeave = () => {
      st.mouse.x = -1000;
      st.mouse.y = -1000;
    };

    if (st.hasMouse) {
      window.addEventListener('mousemove', onMouseMove, { passive: true });
      document.body.addEventListener('mouseleave', onMouseLeave);
    }

    // Tab visibility handling: pause when user is in another tab
    const onVisibilityChange = () => {
      st.isActive = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    // Optimized render loop (capped at ~60fps)
    const TARGET_FPS = 60;
    const FRAME_TIME = 1000 / TARGET_FPS;

    const animate = (timestamp) => {
      if (!st.isActive) {
        st.raf = requestAnimationFrame(animate);
        return;
      }

      if (timestamp - st.lastFrameTime >= FRAME_TIME) {
        st.lastFrameTime = timestamp;

        ctx.clearRect(0, 0, w, h);
        const particles = st.particles;
        const { dist } = getConfig(w);
        const distSq = dist * dist;
        const mx = st.mouse.x;
        const my = st.mouse.y;

        // Update particles
        for (let i = 0; i < particles.length; i++) {
          particles[i].update(w, h, mx, my, st.hasMouse);
        }

        // Draw connection lines
        ctx.lineWidth = 0.5;
        for (let i = 0; i < particles.length; i++) {
          const pi = particles[i];
          for (let j = i + 1; j < particles.length; j++) {
            const pj = particles[j];
            const dx = pi.x - pj.x;
            const dy = pi.y - pj.y;
            const dSq = dx * dx + dy * dy;

            if (dSq < distSq) {
              const alpha = (1 - Math.sqrt(dSq) / dist) * 0.12;
              ctx.beginPath();
              ctx.moveTo(pi.x, pi.y);
              ctx.lineTo(pj.x, pj.y);
              ctx.strokeStyle = `rgba(16,185,129,${alpha})`;
              ctx.stroke();
            }
          }
        }

        // Draw particle nodes
        for (let i = 0; i < particles.length; i++) {
          particles[i].draw(ctx);
        }
      }

      st.raf = requestAnimationFrame(animate);
    };

    st.raf = requestAnimationFrame(animate);

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        applySize();
        initParticles();
      }, 200);
    };
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      if (st.raf) cancelAnimationFrame(st.raf);
      window.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ opacity: 0.85 }}
    />
  );
}
