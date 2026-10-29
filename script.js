// Mobile menu
const btn = document.getElementById('menuBtn');
const nav = document.getElementById('navLinks');
btn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open'); btn.setAttribute('aria-expanded', false);
}));

// Photo fallback: if assets/photo.jpg is missing, the NP monogram stays visible
const photo = document.getElementById('profilePhoto');
photo.addEventListener('error', () => photo.remove());

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Highlight current section in the nav
const links = [...nav.querySelectorAll('a')];
const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
if ('IntersectionObserver' in window) {
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => spy.observe(s));

  // Gentle reveal for section headings only
  const rev = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); rev.unobserve(e.target); }
  }), { threshold: .15 });
  document.querySelectorAll('.section h2').forEach(h => { h.classList.add('reveal'); rev.observe(h); });
}
