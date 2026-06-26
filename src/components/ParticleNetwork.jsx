import { useEffect, useRef } from 'react';

// ── Color palette (emerald/teal financial theme) ──────────────────────
const PALETTE = [
  { r: 16, g: 185, b: 129, w: 0.40 },   // emerald-500  (dominant)
  { r: 20, g: 184, b: 166, w: 0.25 },   // teal-500
  { r: 52, g: 211, b: 153, w: 0.20 },   // emerald-400
  { r: 255, g: 255, b: 255, w: 0.15 },  // white accent  (rare)
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

    const speed = 0.08 + layer * 0.06;
    this.vx = (Math.random() - 0.5) * speed * 2;
    this.vy = (Math.random() - 0.5) * speed * 2;
    this.maxSpeed = speed * 2;

    this.radius = 0.5 + layer * 0.35 + Math.random() * 0.4;
    this.baseRadius = this.radius;
    this.baseOpacity = 0.06 + layer * 0.05 + Math.random() * 0.06;
    this.opacity = this.baseOpacity;

    this.color = pickColor();
    this.drawR = this.color.r;
    this.drawG = this.color.g;
    this.drawB = this.color.b;

    // Breathing
    this.phase = Math.random() * Math.PI * 2;
    this.breathSpeed = 0.004 + Math.random() * 0.006;

    // Sprint 2: Mouse interaction state
    this.isNearMouse = false;
  }

  update(w, h, mx, my, hasMouse) {
    // ── Sprint 2: Mouse magnetic attraction ───────────────────────
    if (hasMouse && mx > -500) {
      const dx = mx - this.x;
      const dy = my - this.y;
      const distSq = dx * dx + dy * dy;
      const attractRadius = 150 + this.layer * 30; // front layers feel it wider
      const attractRadiusSq = attractRadius * attractRadius;

      if (distSq < attractRadiusSq && distSq > 1) {
        const dist = Math.sqrt(distSq);
        const force = (1 - dist / attractRadius) * 0.012 * (1 + this.layer * 0.5);
        this.vx += dx / dist * force;
        this.vy += dy / dist * force;
        this.isNearMouse = true;

        // Particles near cursor glow brighter + grow slightly
        const proximity = 1 - dist / attractRadius;
        this.opacity = this.baseOpacity + proximity * 0.25;
        this.radius = this.baseRadius + proximity * 1.2;
      } else {
        this.isNearMouse = false;
      }
    } else {
      this.isNearMouse = false;
    }

    // If not near mouse, restore breathing behavior
    if (!this.isNearMouse) {
      this.phase += this.breathSpeed;
      this.opacity = this.baseOpacity + Math.sin(this.phase) * this.baseOpacity * 0.4;
      this.radius += (this.baseRadius - this.radius) * 0.08; // ease back
    }

    // Move
    this.x += this.vx;
    this.y += this.vy;

    // Friction: particles gradually slow down (prevents infinite acceleration from mouse)
    this.vx *= 0.998;
    this.vy *= 0.998;

    // Organic micro-drift
    if (Math.random() < 0.006) {
      this.vx += (Math.random() - 0.5) * 0.03;
      this.vy += (Math.random() - 0.5) * 0.03;
    }

    // Clamp speed
    const m = this.maxSpeed * (this.isNearMouse ? 2.5 : 1);
    if (this.vx > m) this.vx = m;
    if (this.vx < -m) this.vx = -m;
    if (this.vy > m) this.vy = m;
    if (this.vy < -m) this.vy = -m;

    // Wrap edges
    const buf = 30;
    if (this.x < -buf) this.x = w + buf;
    else if (this.x > w + buf) this.x = -buf;
    if (this.y < -buf) this.y = h + buf;
    else if (this.y > h + buf) this.y = -buf;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.drawR},${this.drawG},${this.drawB},${this.opacity})`;
    ctx.fill();

    // Sprint 3: Glow halo on bright/near-mouse particles
    if (this.isNearMouse && this.opacity > 0.15) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.drawR},${this.drawG},${this.drawB},${this.opacity * 0.15})`;
      ctx.fill();
    }
  }
}

// ── Responsive config ─────────────────────────────────────────────────
function getConfig(width) {
  if (width < 640)  return { count: 40,  dist: 100 };
  if (width < 1024) return { count: 75,  dist: 120 };
  return                    { count: 150, dist: 145 };
}

// ── Component ─────────────────────────────────────────────────────────
export default function ParticleNetwork() {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    raf: null,
    particles: [],
    timeout: null,
    mouse: { x: -1000, y: -1000 },
    hasMouse: false,
    // Sprint 3: Pulse wave state
    pulseWaves: [],
    pulseTimer: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = window.innerWidth;
    let h = window.innerHeight;
    const st = stateRef.current;

    // Check if device has mouse
    st.hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    const applySize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    const initParticles = () => {
      const { count } = getConfig(w);
      const particles = [];
      for (let i = 0; i < count; i++) {
        const layer = i < count * 0.3 ? 0 : i < count * 0.65 ? 1 : 2;
        particles.push(new Particle(w, h, layer));
      }
      st.particles = particles;
    };

    applySize();
    initParticles();

    // ── Sprint 2: Mouse tracking ──────────────────────────────────
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

    // ── Render loop ───────────────────────────────────────────────
    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      const particles = st.particles;
      const { dist } = getConfig(w);
      const distSq = dist * dist;
      const mx = st.mouse.x;
      const my = st.mouse.y;

      // ── Sprint 3: Pulse wave logic ──────────────────────────────
      st.pulseTimer++;
      // Spawn a new pulse wave every ~360 frames (~6 seconds at 60fps)
      if (st.pulseTimer % 360 === 0) {
        // Pick a random particle as the wave origin
        const origin = particles[Math.floor(Math.random() * particles.length)];
        st.pulseWaves.push({
          x: origin.x,
          y: origin.y,
          radius: 0,
          maxRadius: 300 + Math.random() * 200,
          speed: 1.5 + Math.random() * 1,
          opacity: 0.08,
        });
      }

      // Update pulse waves
      for (let i = st.pulseWaves.length - 1; i >= 0; i--) {
        const pw = st.pulseWaves[i];
        pw.radius += pw.speed;
        pw.opacity = 0.08 * (1 - pw.radius / pw.maxRadius);
        if (pw.radius >= pw.maxRadius) {
          st.pulseWaves.splice(i, 1);
        }
      }

      // Draw pulse wave rings
      for (const pw of st.pulseWaves) {
        ctx.beginPath();
        ctx.arc(pw.x, pw.y, pw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(16,185,129,${Math.max(0, pw.opacity)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Update particles (with mouse data)
      for (let i = 0; i < particles.length; i++) {
        // Sprint 3: Particles inside a pulse wave get a brief color boost
        let inPulse = false;
        for (const pw of st.pulseWaves) {
          const pdx = particles[i].x - pw.x;
          const pdy = particles[i].y - pw.y;
          const pd = Math.sqrt(pdx * pdx + pdy * pdy);
          if (Math.abs(pd - pw.radius) < 20) {
            inPulse = true;
            break;
          }
        }

        const p = particles[i];
        if (inPulse) {
          // Boost: temporarily brighten the particle
          p.drawR = 80;
          p.drawG = 250;
          p.drawB = 123;
          p.opacity = Math.min(p.opacity + 0.12, 0.4);
        } else {
          // Normal color
          p.drawR = p.color.r;
          p.drawG = p.color.g;
          p.drawB = p.color.b;
        }

        p.update(w, h, mx, my, st.hasMouse);
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
            const d = Math.sqrt(dSq);
            let alpha = (1 - d / dist) * 0.12;

            // Sprint 2: Lines near mouse glow brighter
            if (pi.isNearMouse || pj.isNearMouse) {
              alpha *= 2.5;
            }

            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            ctx.strokeStyle = `rgba(16,185,129,${alpha})`;
            ctx.stroke();
          }
        }
      }

      // Draw particles on top
      for (let i = 0; i < particles.length; i++) {
        particles[i].draw(ctx);
      }

      st.raf = requestAnimationFrame(animate);
    };

    animate();

    // ── Resize (debounced) ────────────────────────────────────────
    const onResize = () => {
      clearTimeout(st.timeout);
      st.timeout = setTimeout(() => {
        const oldCount = st.particles.length;
        applySize();
        const newCount = getConfig(w).count;
        if (Math.abs(oldCount - newCount) > 5) initParticles();
      }, 250);
    };
    window.addEventListener('resize', onResize);

    // ── Cleanup ───────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(st.raf);
      clearTimeout(st.timeout);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
      style={{ pointerEvents: 'none' }}
    />
  );
}
