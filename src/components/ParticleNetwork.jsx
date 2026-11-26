import { useEffect, useRef } from 'react';

// ── Color palette (emerald/teal/cyan/amber institutional theme) ────────
const PALETTE = [
  { r: 16, g: 185, b: 129, w: 0.38 },  // emerald-500
  { r: 80, g: 250, b: 123, w: 0.22 },  // bullish mint
  { r: 20, g: 184, b: 166, w: 0.16 },  // teal-500
  { r: 56, g: 189, b: 248, w: 0.14 },  // sky-400
  { r: 245, g: 158, b: 11, w: 0.05 },  // amber-500 (BTC/Gold accent)
  { r: 255, g: 255, b: 255, w: 0.05 }, // white accent
];

function pickColor() {
  let r = Math.random();
  for (const c of PALETTE) {
    r -= c.w;
    if (r <= 0) return { r: c.r, g: c.g, b: c.b };
  }
  return PALETTE[0];
}

class Particle {
  constructor(w, h, layer) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.layer = layer;

    const speed = 0.24 + layer * 0.18;
    this.vx = (Math.random() - 0.5) * speed * 2;
    this.vy = (Math.random() - 0.5) * speed * 2;
    this.baseVx = this.vx;
    this.baseVy = this.vy;

    this.radius = 1.4 + layer * 1.0;
    this.opacity = 0.32 + layer * 0.24;
    this.pulsePhase = Math.random() * Math.PI * 2;
    this.color = pickColor();
  }

  update(w, h, mx, my, hasPointer, ripples, time) {
    if (hasPointer && mx > -500) {
      const dx = mx - this.x;
      const dy = my - this.y;
      const distSq = dx * dx + dy * dy;
      const radiusSq = 210 * 210;

      if (distSq < radiusSq && distSq > 9) {
        const dist = Math.sqrt(distSq);
        const force = (1 - dist / 210) * 0.055;
        this.vx += (dx / dist) * force;
        this.vy += (dy / dist) * force;
      }
    }

    for (const rp of ripples) {
      const dx = this.x - rp.x;
      const dy = this.y - rp.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (Math.abs(dist - rp.r) < 35 && dist > 1) {
        const push = (1 - Math.abs(dist - rp.r) / 35) * 0.8;
        this.vx += (dx / dist) * push;
        this.vy += (dy / dist) * push;
      }
    }

    this.vx = this.vx * 0.97 + this.baseVx * 0.03;
    this.vy = this.vy * 0.97 + this.baseVy * 0.03;

    this.x += this.vx;
    this.y += this.vy;
    this.currentOpacity = Math.min(
      0.95,
      Math.max(0.28, this.opacity + Math.sin(time * 0.0025 + this.pulsePhase) * 0.14)
    );

    const buf = 24;
    if (this.x < -buf) this.x = w + buf;
    else if (this.x > w + buf) this.x = -buf;
    if (this.y < -buf) this.y = h + buf;
    else if (this.y > h + buf) this.y = -buf;
  }

  draw(ctx) {
    if (this.layer === 1) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color.r},${this.color.g},${this.color.b},${this.currentOpacity * 0.18})`;
      ctx.fill();
    }

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color.r},${this.color.g},${this.color.b},${this.currentOpacity})`;
    ctx.fill();
  }
}

function getConfig(width, isTouch) {
  if (width < 640) return { count: 20, dist: 115, fps: 30, packets: 4 };
  if (isTouch || width < 1024) return { count: 34, dist: 140, fps: 40, packets: 6 };
  if (width < 1360) return { count: 48, dist: 155, fps: 60, packets: 10 };
  return { count: 56, dist: 165, fps: 60, packets: 12 };
}

export default function ParticleNetwork() {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    raf: null,
    particles: [],
    packets: [],
    pointer: { x: -1000, y: -1000, active: false },
    ripples: [],
    scrollY: 0,
    lastFrameTime: 0,
    isActive: true,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    const st = stateRef.current;
    let w = window.innerWidth;
    let h = window.innerHeight;

    const applySize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };

    const initParticles = () => {
      const { count, packets } = getConfig(w, isTouch);
      const particles = [];
      for (let i = 0; i < count; i++) {
        const layer = i < count * 0.55 ? 0 : 1;
        particles.push(new Particle(w, h, layer));
      }
      st.particles = particles;

      const pktList = [];
      for (let i = 0; i < packets; i++) {
        pktList.push({
          a: Math.floor(Math.random() * count),
          b: Math.floor(Math.random() * count),
          t: Math.random(),
          speed: 0.008 + Math.random() * 0.012,
        });
      }
      st.packets = pktList;
    };

    applySize();
    initParticles();

    const onPointerMove = (e) => {
      st.pointer.x = e.clientX;
      st.pointer.y = e.clientY;
      st.pointer.active = true;
    };

    const onPointerDown = (e) => {
      st.pointer.x = e.clientX;
      st.pointer.y = e.clientY;
      st.pointer.active = true;
      st.ripples.push({ x: e.clientX, y: e.clientY, r: 10, alpha: 0.65 });
      if (st.ripples.length > 6) st.ripples.shift();
    };

    const onPointerLeave = () => {
      st.pointer.active = false;
      st.pointer.x = -1000;
      st.pointer.y = -1000;
    };

    const onScroll = () => {
      st.scrollY = window.scrollY || 0;
    };

    const onVisibilityChange = () => {
      st.isActive = !document.hidden;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.body.addEventListener('mouseleave', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibilityChange);

    const drawWaves = (time) => {
      const waves = [
        { amp: 26, freq: 0.0026, speed: 0.0006, yBase: h * 0.32, color: 'rgba(16, 185, 129, 0.10)' },
        { amp: 34, freq: 0.0019, speed: -0.00045, yBase: h * 0.68, color: 'rgba(56, 189, 248, 0.07)' },
      ];
      const scrollShift = st.scrollY * 0.1;
      const step = w < 640 ? 24 : 18;

      for (const wave of waves) {
        ctx.beginPath();
        for (let x = 0; x <= w + step; x += step) {
          const pointerInfluence =
            st.pointer.active && Math.abs(x - st.pointer.x) < 260
              ? (1 - Math.abs(x - st.pointer.x) / 260) * ((st.pointer.y - wave.yBase) * 0.14)
              : 0;
          const y =
            wave.yBase +
            Math.sin(x * wave.freq + time * wave.speed + scrollShift * 0.01) * wave.amp +
            Math.cos(x * wave.freq * 0.5 - time * wave.speed * 0.7) * (wave.amp * 0.45) +
            pointerInfluence;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }
    };

    const animate = (timestamp) => {
      if (!st.isActive) {
        st.raf = requestAnimationFrame(animate);
        return;
      }

      const { dist, fps } = getConfig(w, isTouch);
      const frameTime = 1000 / fps;

      if (timestamp - st.lastFrameTime >= frameTime) {
        st.lastFrameTime = timestamp;
        ctx.clearRect(0, 0, w, h);

        drawWaves(timestamp);

        for (let i = st.ripples.length - 1; i >= 0; i--) {
          const rp = st.ripples[i];
          rp.r += 5.5;
          rp.alpha *= 0.94;
          if (rp.alpha < 0.02) {
            st.ripples.splice(i, 1);
          } else {
            ctx.beginPath();
            ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(80, 250, 123, ${rp.alpha})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }

        const particles = st.particles;
        const distSq = dist * dist;
        const mx = st.pointer.x;
        const my = st.pointer.y;

        for (let i = 0; i < particles.length; i++) {
          particles[i].update(w, h, mx, my, st.pointer.active, st.ripples, timestamp);
        }

        for (let i = 0; i < particles.length; i++) {
          const pi = particles[i];

          if (st.pointer.active && mx > -500) {
            const pdx = pi.x - mx;
            const pdy = pi.y - my;
            const pdSq = pdx * pdx + pdy * pdy;
            const pointerRadiusSq = (dist * 1.35) * (dist * 1.35);
            if (pdSq < pointerRadiusSq) {
              const pAlpha = (1 - Math.sqrt(pdSq) / (dist * 1.35)) * 0.35;
              ctx.beginPath();
              ctx.moveTo(pi.x, pi.y);
              ctx.lineTo(mx, my);
              ctx.strokeStyle = `rgba(80, 250, 123, ${pAlpha})`;
              ctx.lineWidth = 1.0;
              ctx.stroke();
            }
          }

          for (let j = i + 1; j < particles.length; j++) {
            const pj = particles[j];
            const dx = pi.x - pj.x;
            const dy = pi.y - pj.y;
            const dSq = dx * dx + dy * dy;

            if (dSq < distSq) {
              const ratio = 1 - Math.sqrt(dSq) / dist;
              const alpha = ratio * 0.24;
              ctx.beginPath();
              ctx.moveTo(pi.x, pi.y);
              ctx.lineTo(pj.x, pj.y);
              ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }

        for (const pkt of st.packets) {
          const pa = particles[pkt.a];
          const pb = particles[pkt.b];
          if (!pa || !pb) continue;
          const dx = pb.x - pa.x;
          const dy = pb.y - pa.y;
          const dSq = dx * dx + dy * dy;
          if (dSq < distSq * 1.4 && dSq > 100) {
            pkt.t += pkt.speed;
            if (pkt.t >= 1) {
              pkt.t = 0;
              pkt.a = pkt.b;
              pkt.b = Math.floor(Math.random() * particles.length);
            }
            const px = pa.x + dx * pkt.t;
            const py = pa.y + dy * pkt.t;
            ctx.beginPath();
            ctx.arc(px, py, 2.3, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(80, 250, 123, 0.9)';
            ctx.fill();
          } else {
            pkt.a = Math.floor(Math.random() * particles.length);
            pkt.b = Math.floor(Math.random() * particles.length);
            pkt.t = 0;
          }
        }

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
      clearTimeout(resizeTimer);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('scroll', onScroll);
      document.body.removeEventListener('mouseleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[2]"
    />
  );
}
