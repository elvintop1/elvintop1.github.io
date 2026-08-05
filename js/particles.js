document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let particles = [];
  let isVisible = true;
  let prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  const isMobile = window.innerWidth <= 768;
  const particleCount = isMobile ? 60 : 120;
  
  const colors = ['#00f5d4', '#7b2cbf', '#00b4d8'];
  
  let mouse = { x: null, y: null };
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  window.addEventListener('resize', resize);
  resize();
  
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });
  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
  });
  window.addEventListener('touchend', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 1.5;
      this.vy = (Math.random() - 0.5) * 1.5;
      this.radius = Math.random() * 2 + 1;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.baseOpacity = Math.random() * 0.5 + 0.3;
      this.fluctuation = 0;
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
      
      if (mouse.x != null && mouse.y != null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
          const force = (200 - distance) / 200;
          this.x -= (dx / distance) * force * 2;
          this.y -= (dy / distance) * force * 2;
        }
      }
      
      if (Math.random() < 0.001) {
        this.fluctuation = 1;
      }
      if (this.fluctuation > 0) {
        this.fluctuation -= 0.02;
        if (this.fluctuation < 0) this.fluctuation = 0;
      }
    }
    
    draw() {
      ctx.beginPath();
      const currentOpacity = this.baseOpacity + this.fluctuation * (1 - this.baseOpacity);
      
      ctx.globalAlpha = currentOpacity * 0.5;
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.globalAlpha = currentOpacity;
      ctx.fillStyle = '#ffffff';
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  function init() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }
  
  function animate() {
    if (!isVisible || prefersReducedMotion) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
      
      let connections = 0;
      for (let j = i + 1; j < particles.length; j++) {
        if (connections >= 3) break;
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 245, 212, ${(1 - dist/150) * 0.15})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          connections++;
        }
      }
    }
    requestAnimationFrame(animate);
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isVisible = entry.isIntersecting;
      if (isVisible && !prefersReducedMotion) {
        animate();
      }
    });
  });
  
  observer.observe(canvas);
  
  if (!prefersReducedMotion) {
    init();
    animate();
  }
});
