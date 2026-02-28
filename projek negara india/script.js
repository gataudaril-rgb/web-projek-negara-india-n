// INDIAFEST - Main JavaScript

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Header hide/show on scroll
let lastScrollY = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function() {
  const currentScrollY = window.scrollY;
  
// Add background when scrolled down
  if (currentScrollY > 50) {
    header.style.background = 'rgba(255, 255, 255, 0.1)';
  } else {
    header.style.background = 'rgba(255, 255, 255, 0)';
  }
  
  // Hide header when scrolling down, show when scrolling up
  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    header.classList.add('hidden');
  } else {
    header.classList.remove('hidden');
  }
  
  lastScrollY = currentScrollY;
});

// Card animation on scroll
const cards = document.querySelectorAll('.card');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

cards.forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'all 0.6s ease-out';
  // Stagger the animation delay
  card.style.transitionDelay = (index * 0.1) + 's';
  observer.observe(card);
});

// Section animation on scroll
const sections = document.querySelectorAll('.content-section');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(50px)';
  section.style.transition = 'all 0.8s ease-out';
  sectionObserver.observe(section);
});

// --- Horizontal menu: toggle and carousel images ---
(() => {
  const imageSets = {
    famous: [
      'https://images.unsplash.com/photo-1505765052002-6d7b5f8b1d1f?w=1200&q=80',
      'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=1200&q=80'
    ],
    tours: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80',
      'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&q=80'
    ],
    food: [
      'https://images.unsplash.com/photo-1521302080850-2a6d1d9f7c6f?w=1200&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80'
    ],
    nature: [
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80'
    ],
    people: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=80'
    ],
    events: [
      'https://images.unsplash.com/photo-1526779259212-5f3e5d1f4d1d?w=1200&q=80',
      'https://images.unsplash.com/photo-1505765052002-6d7b5f8b1d1f?w=1200&q=80'
    ]
  };

  const tabs = document.querySelectorAll('.menu-tab');
  let activeTimer = null;
  let activeInterval = null;

  function startCarousel(tabEl) {
    const key = tabEl.dataset.key;
    const imgs = imageSets[key] || [];
    const imgEl = tabEl.querySelector('.carousel img');
    if (!imgEl || imgs.length === 0) return;
    let idx = 0;
    imgEl.src = imgs[0];
    if (activeInterval) clearInterval(activeInterval);
    activeInterval = setInterval(() => {
      idx = (idx + 1) % imgs.length;
      imgEl.src = imgs[idx];
    }, 3000);
  }

  function stopCarousel() {
    if (activeInterval) {
      clearInterval(activeInterval);
      activeInterval = null;
    }
  }

  tabs.forEach(tab => {
    const head = tab.querySelector('.menu-head');
    head.addEventListener('click', () => {
      const isActive = tab.classList.contains('active');
      tabs.forEach(t => {
        t.classList.remove('active');
        t.querySelector('.menu-head').setAttribute('aria-expanded', 'false');
      });
      stopCarousel();
      if (!isActive) {
        tab.classList.add('active');
        tab.querySelector('.menu-head').setAttribute('aria-expanded', 'true');
        // small delay so height expands before starting carousel
        activeTimer = setTimeout(() => startCarousel(tab), 200);
      } else {
        if (activeTimer) { clearTimeout(activeTimer); activeTimer = null; }
      }
    });
  });

  // close tabs when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.menu-bar')) {
      tabs.forEach(t => { t.classList.remove('active'); t.querySelector('.menu-head').setAttribute('aria-expanded','false'); });
      stopCarousel();
    }
  });

})();

function expandCard(element, event) {
  // Prevent card expansion when clicking on buttons
  if (event && event.target.tagName === 'BUTTON') {
    return;
  }
  
  const allCards = document.querySelectorAll('.card');
  
  if (element.classList.contains('active')) {
    element.classList.remove('active');
  } else {
    // Tutup yang lain
    allCards.forEach(card => card.classList.remove('active'));
    // Buka yang diklik
    element.classList.add('active');
  }
}

// Explore card expansion (for explore.html)
function expandExploreCard(element, event) {
  // Prevent card expansion when clicking on buttons/links
  if (event && (event.target.tagName === 'BUTTON' || event.target.tagName === 'A')) {
    return;
  }
  
  const allExploreCards = document.querySelectorAll('.explore-card');
  
  if (element.classList.contains('expanded')) {
    element.classList.remove('expanded');
  } else {
    // Tutup yang lain
    allExploreCards.forEach(card => card.classList.remove('expanded'));
    // Buka yang diklik
    element.classList.add('expanded');
  }
}

console.log('INDIAFEST website loaded successfully!');
