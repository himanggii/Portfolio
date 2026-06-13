// =============================================
// MATRIX RAIN CANVAS
// =============================================
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

let columns, drops;

function initMatrix() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const fontSize = 13;
  columns = Math.floor(canvas.width / fontSize);
  drops = Array(columns).fill(1);
}

function drawMatrix() {
  ctx.fillStyle = 'rgba(6, 10, 15, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00ff96';
  ctx.font = '13px JetBrains Mono, monospace';

  const chars = '01アイウエオカキクケコサシスセソタチツテト';

  for (let i = 0; i < drops.length; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(text, i * 13, drops[i] * 13);
    if (drops[i] * 13 > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}

initMatrix();
setInterval(drawMatrix, 55);
window.addEventListener('resize', () => {
  initMatrix();
});

// =============================================
// TYPEWRITER EFFECT
// =============================================
const typewriterEl = document.getElementById('typewriter');
const text = 'HIMANGI';
let i = 0;

function typeWriter() {
  if (i < text.length) {
    typewriterEl.textContent += text.charAt(i);
    i++;
    setTimeout(typeWriter, 120);
  }
}

window.addEventListener('load', () => {
  setTimeout(typeWriter, 600);
});

// =============================================
// NAVBAR SCROLL EFFECT
// =============================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// =============================================
// MOBILE NAV TOGGLE
// =============================================
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// =============================================
// SCROLL REVEAL ANIMATIONS
// =============================================
// Fallback (IntersectionObserver) for scroll-driven animations
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Stagger children if parent has reveal children
        const revealItems = entry.target.querySelectorAll('.reveal');
        revealItems.forEach((item, idx) => {
          setTimeout(() => {
            item.classList.add('visible');
          }, idx * 80);
        });

        entry.target.classList.add('visible');
        // Don't unobserve so we can re-trigger if needed
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  }
);

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// =============================================
// ACTIVE NAV LINK HIGHLIGHTING
// =============================================
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinkEls.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = 'var(--clr-green)';
          }
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(section => sectionObserver.observe(section));

// =============================================
// SKILL TAG HOVER GLOW EFFECT
// =============================================
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('mouseenter', () => {
    tag.style.transform = 'scale(1.08)';
  });
  tag.addEventListener('mouseleave', () => {
    tag.style.transform = '';
  });
});

// =============================================
// COUNTER ANIMATION FOR STATS
// =============================================
function animateCounter(el, target, suffix = '') {
  const isFloat = target % 1 !== 0;
  const duration = 1800;
  const start = performance.now();

  function update(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 4);
    const current = target * ease;
    el.textContent = isFloat ? current.toFixed(1) + suffix : Math.floor(current) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll('.stat-number');
        statNumbers.forEach(el => {
          const raw = el.textContent.trim();
          const num = parseFloat(raw);
          const suffix = raw.replace(/[\d.]/g, '');
          animateCounter(el, num, suffix);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// =============================================
// CONTACT FORM
// =============================================
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  const textEl = document.getElementById('submit-text');

  btn.disabled = true;
  textEl.textContent = 'Sending...';

  setTimeout(() => {
    textEl.textContent = '✓ Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #00ff96, #00cc78)';
    document.getElementById('contact-form').reset();

    setTimeout(() => {
      textEl.textContent = 'Send Message';
      btn.disabled = false;
      btn.style.background = '';
    }, 3000);
  }, 1200);
}

// =============================================
// CURSOR TRAIL EFFECT (subtle)
// =============================================
const trail = [];
const trailLength = 8;

for (let j = 0; j < trailLength; j++) {
  const dot = document.createElement('div');
  dot.style.cssText = `
    position: fixed; width: ${6 - j * 0.4}px; height: ${6 - j * 0.4}px;
    border-radius: 50%; pointer-events: none; z-index: 9999;
    background: rgba(0, 255, 150, ${0.6 - j * 0.07});
    transition: left 0.05s ease, top 0.05s ease;
    mix-blend-mode: screen;
  `;
  document.body.appendChild(dot);
  trail.push({ el: dot, x: 0, y: 0 });
}

let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function updateTrail() {
  trail[0].x = mouseX;
  trail[0].y = mouseY;

  for (let k = 1; k < trail.length; k++) {
    trail[k].x += (trail[k - 1].x - trail[k].x) * 0.45;
    trail[k].y += (trail[k - 1].y - trail[k].y) * 0.45;
  }

  trail.forEach(dot => {
    dot.el.style.left = `${dot.x - 3}px`;
    dot.el.style.top = `${dot.y - 3}px`;
  });

  requestAnimationFrame(updateTrail);
}

updateTrail();

// =============================================
// SMOOTH SECTION TRANSITIONS
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// =============================================
// PROJECT CARD TILT EFFECT
// =============================================
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -4;
    const rotY = ((x - cx) / cx) * 4;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
