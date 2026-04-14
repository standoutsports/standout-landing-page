/* ==========================================================================
   PARTICLES — Canvas "floating dust" effect
   Initialises on Hero and Final CTA sections
   ========================================================================== */

(function () {
  'use strict';

  // Skip entirely if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  class ParticleField {
    constructor(canvas, options = {}) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.particles = [];
      this.animationId = null;
      this.isVisible = false;

      // Configurable
      this.count = options.count || 70;
      this.color = options.color || 'rgba(255, 255, 255,';
      this.minRadius = options.minRadius || 0.5;
      this.maxRadius = options.maxRadius || 2;
      this.minSpeed = options.minSpeed || 0.1;
      this.maxSpeed = options.maxSpeed || 0.45;
      this.minOpacity = options.minOpacity || 0.08;
      this.maxOpacity = options.maxOpacity || 0.35;

      this.resize();
      this.init();
      this.observe();

      window.addEventListener('resize', () => this.resize());
    }

    resize() {
      const rect = this.canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.canvas.width = rect.width * dpr;
      this.canvas.height = rect.height * dpr;
      this.canvas.style.width = rect.width + 'px';
      this.canvas.style.height = rect.height + 'px';
      this.ctx.scale(dpr, dpr);
      this.width = rect.width;
      this.height = rect.height;
    }

    init() {
      // Reduce count on mobile
      let count = this.count;
      if (window.innerWidth < 810) count = Math.floor(count * 0.4);
      if (window.innerWidth < 390) count = 0;

      this.particles = [];
      for (let i = 0; i < count; i++) {
        this.particles.push(this.createParticle());
      }
    }

    createParticle(fromTop) {
      const r = this.rand;
      return {
        x: r(0, this.width),
        y: fromTop ? -10 : r(0, this.height),
        radius: r(this.minRadius, this.maxRadius),
        opacity: r(this.minOpacity, this.maxOpacity),
        vy: r(this.minSpeed, this.maxSpeed),
        vx: r(-0.15, 0.15),
        drift: r(0.0002, 0.001),
        phase: r(0, Math.PI * 2),
      };
    }

    rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    // Bind rand to instance for createParticle
    get rand() {
      return this.rand.bind ? (min, max) => Math.random() * (max - min) + min : this.rand;
    }

    observe() {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            this.isVisible = entry.isIntersecting;
            if (this.isVisible && !this.animationId) {
              this.animate();
            }
          });
        },
        { threshold: 0 }
      );
      observer.observe(this.canvas.parentElement);

      // Pause when tab is hidden
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.stop();
        } else if (this.isVisible) {
          this.animate();
        }
      });
    }

    animate() {
      if (!this.isVisible || document.hidden) {
        this.stop();
        return;
      }

      this.ctx.clearRect(0, 0, this.width, this.height);

      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];

        // Move
        p.y += p.vy;
        p.x += p.vx + Math.sin(p.phase) * 0.15;
        p.phase += p.drift;

        // Wrap around
        if (p.y > this.height + 10) {
          this.particles[i] = this.createParticle(true);
          continue;
        }
        if (p.x < -10) p.x = this.width + 10;
        if (p.x > this.width + 10) p.x = -10;

        // Draw
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color + p.opacity + ')';
        this.ctx.fill();
      }

      this.animationId = requestAnimationFrame(() => this.animate());
    }

    stop() {
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
      }
    }
  }

  // Initialise on DOM ready
  function init() {
    const heroCanvas = document.getElementById('hero-particles');
    const benefitsCanvas = document.getElementById('benefits-particles');
    const ctaCanvas = document.getElementById('cta-particles');

    if (heroCanvas) {
      new ParticleField(heroCanvas, { count: 70 });
    }

    if (benefitsCanvas) {
      new ParticleField(benefitsCanvas, { count: 45, maxOpacity: 0.25 });
    }

    if (ctaCanvas) {
      new ParticleField(ctaCanvas, { count: 50 });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
