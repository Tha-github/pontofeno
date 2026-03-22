/* =========================================
   SCRIPT.JS — Ponto Feno
   Carrossel · Navbar · Fade-in · Menu mobile
   ========================================= */

document.addEventListener('DOMContentLoaded', function () {

  // =========================================
  // NAVBAR — scroll e menu mobile
  // =========================================
  const navbar   = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  // Adiciona classe "scrolled" ao rolar
  window.addEventListener('scroll', function () {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Toggle menu hamburguer
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Fecha menu ao clicar em um link
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Fecha menu ao redimensionar para desktop
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // Scroll suave para âncoras do navbar
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // =========================================
  // CARROSSEL
  // =========================================
  const slides    = document.querySelectorAll('.hero__slide');
  const dotsContainer = document.getElementById('dots');
  const prevBtn   = document.getElementById('prev-slide');
  const nextBtn   = document.getElementById('next-slide');
  let current     = 0;
  let interval    = null;
  const INTERVAL_MS = 5500;

  // Cria os dots dinamicamente
  slides.forEach(function (_, i) {
    const dot = document.createElement('button');
    dot.classList.add('hero__dot');
    dot.setAttribute('aria-label', 'Slide ' + (i + 1));
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', function () {
      goTo(i);
      resetInterval();
    });
    dotsContainer.appendChild(dot);
  });

  function getDots() {
    return dotsContainer.querySelectorAll('.hero__dot');
  }

  function goTo(index) {
    // Remove active do slide atual
    slides[current].classList.remove('active');
    getDots()[current].classList.remove('active');

    // Atualiza índice
    current = (index + slides.length) % slides.length;

    // Ativa novo slide
    slides[current].classList.add('active');
    getDots()[current].classList.add('active');
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(next, INTERVAL_MS);
  }

  // Inicia carrossel automático
  interval = setInterval(next, INTERVAL_MS);

  prevBtn.addEventListener('click', function () { prev(); resetInterval(); });
  nextBtn.addEventListener('click', function () { next(); resetInterval(); });

  // Pausa ao passar o mouse
  document.querySelector('.hero').addEventListener('mouseenter', function () {
    clearInterval(interval);
  });
  document.querySelector('.hero').addEventListener('mouseleave', function () {
    resetInterval();
  });

  // Suporte a swipe no mobile
  let touchStartX = 0;
  document.querySelector('.hero').addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  document.querySelector('.hero').addEventListener('touchend', function (e) {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) { next(); } else { prev(); }
      resetInterval();
    }
  }, { passive: true });

  // =========================================
  // FADE-IN — Intersection Observer
  // =========================================
  const fadeEls = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  fadeEls.forEach(function (el) { observer.observe(el); });

});
