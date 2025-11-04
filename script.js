

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.classList.add("fade-out");
  }, 200); 
});



  // ===== Certificate Popup =====
  const popup = document.getElementById('certPopup');
  const popupContent = document.getElementById('popupContent');

  function openPopup(btn) {
    const file = btn.getAttribute('data-file');
    let content = '';
    if (file.endsWith('.pdf')) {
      content = `<embed src="${file}" type="application/pdf" width="100%" height="100%">`;
    } else {
      content = `<img src="${file}" alt="Certificate">`;
    }
    popupContent.innerHTML = content;
    popup.classList.add('active');
    document.documentElement.style.overflow = 'hidden';
  }

  function closePopup() {
    popup.classList.remove('active');
    document.documentElement.style.overflow = '';
    popupContent.innerHTML = '';
  }

  popup.addEventListener('click', (e) => {
    if (e.target === popup) closePopup();
  });





let mobHeader=document.querySelector(".mobile-header");
const sidebar = document.getElementById('sidebar');
document.getElementById('menu-btn')?.addEventListener('click', () => {
  sidebar.classList.add('open');
  mobHeader.style.display="none";
});
document.querySelector('.close-btn')?.addEventListener('click', () => {sidebar.classList.remove('open')
    mobHeader.style.display="flex";
window.addEventListener("resize", () => {
  if (window.innerWidth > 991) {
    mobHeader.style.display = "none";
  } else if (!sidebar.classList.contains("open")) {
    mobHeader.style.display = "flex";
  }
});



});

const links = document.querySelectorAll('nav.nav a');
links.forEach(l => {
  l.addEventListener('click', e => {
    e.preventDefault();
    const id = l.getAttribute('href');
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    sidebar.classList.remove('open');
  });
});

window.addEventListener('scroll', () => {
  let cur = '';
  document.querySelectorAll('main section').forEach(s => {
    const top = s.offsetTop - 150;
    if (scrollY >= top) cur = '#' + s.id;
  });
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === cur));
});

document.addEventListener('DOMContentLoaded', () => { if (window.AOS) AOS.init({ once: true, duration: 700 }); });

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("hero-bubbles");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let W, H, dpr;
  let bubbles = [];
  let ripples = [];

  function resize() {
    dpr = window.devicePixelRatio || 1;
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener("resize", resize);
  resize();


  for (let i = 0; i < 40; i++) {
    bubbles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 30 + 10,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.25 + 0.05,
    });
  }


  function createRipple(x, y) {
    ripples.push({
      x,
      y,
      layers: [
        { r: 0, alpha: 0.8 }, 
        { r: 0, alpha: 0.6 }  
      ]
    });
  }


  setInterval(() => {
    if (ripples.length < 2) {
      createRipple(Math.random() * W, Math.random() * H);
    }
  }, 4000);


  canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    createRipple(x, y);
  });

  function draw() {
    ctx.clearRect(0, 0, W, H);


    const time = Date.now() * 0.0015;
    for (const b of bubbles) {
      const shimmer = Math.sin(time + b.x * 0.01 + b.y * 0.01) * 0.1 + 1;
      const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
      g.addColorStop(0, `rgba(180,180,200,${b.alpha * shimmer})`);
      g.addColorStop(1, `rgba(100,100,120,0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();

      b.x += b.dx;
      b.y += b.dy;
      if (b.x < -b.r) b.x = W + b.r;
      if (b.x > W + b.r) b.x = -b.r;
      if (b.y < -b.r) b.y = H + b.r;
      if (b.y > H + b.r) b.y = -b.r;
    }

    if (Math.sin(time * 0.5) > 0.95 && ripples.length < 2) {
      createRipple(Math.random() * W, Math.random() * H);
    }

    
    for (let i = ripples.length - 1; i >= 0; i--) {
      const r = ripples[i];

      r.layers.forEach((layer, idx) => {
        const grad = ctx.createRadialGradient(r.x, r.y, layer.r * 0.6, r.x, r.y, layer.r);
        grad.addColorStop(0, `rgba(160,200,255,${layer.alpha * 0.2})`);
        grad.addColorStop(0.7, `rgba(200,240,255,${layer.alpha})`);
        grad.addColorStop(1, `rgba(200,240,255,0)`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = idx === 1 ? 6 : 3; // outer layer thicker
        ctx.shadowBlur = idx === 1 ? 40 : 25;
        ctx.shadowColor = `rgba(180,220,255,${layer.alpha})`;
        ctx.beginPath();

        const wobble = Math.sin(layer.r * 0.05 + idx) * 2;
        ctx.arc(r.x + wobble, r.y + wobble, layer.r, 0, Math.PI * 2);
        ctx.stroke();

        layer.r += idx === 1 ? 3 : 2; 
        layer.alpha -= idx === 1 ? 0.002 : 0.0015; 
      });

    
      if (r.layers.every(l => l.alpha <= 0.01)) ripples.splice(i, 1);
    }

    requestAnimationFrame(draw);
  }

  draw();
});

function animateSkillRings() {
  const rings = document.querySelectorAll('.skill-ring');
  const section = document.getElementById('skills');
  const windowBottom = window.innerHeight + window.scrollY;
  const sectionTop = section.offsetTop;

  if (windowBottom > sectionTop + 50) {
    rings.forEach(ring => {
      if (!ring.classList.contains('animated')) {
        const level = ring.dataset.level;
        const progress = ring.querySelector('.progress');
        const radius = 54;
        const circumference = 2 * Math.PI * radius;

        progress.style.strokeDasharray = circumference;
        progress.style.strokeDashoffset = circumference;

        let offset = circumference;
        const targetOffset = circumference - (level / 100) * circumference;

        function animate() {
          offset -= 2;
          if (offset <= targetOffset) offset = targetOffset;
          progress.style.strokeDashoffset = offset;
          if (offset > targetOffset) requestAnimationFrame(animate);
        }
        animate();

        ring.classList.add('animated');
      }
    });
  }
}

window.addEventListener('scroll', animateSkillRings);
window.addEventListener('load', animateSkillRings);

const projectCards = document.querySelectorAll('.project-card');

function animateProjects() {
  const windowBottom = window.innerHeight;
  projectCards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < windowBottom - 50 && !card.classList.contains('animated')) {
      card.classList.add('animated');
      card.style.transform = 'translateY(0) scale(1)';
    }
  });
}

window.addEventListener('scroll', animateProjects);
window.addEventListener('load', animateProjects);
