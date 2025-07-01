document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', function() {
    const item = this.parentElement;
    document.querySelectorAll('.faq-item').forEach(faq => {
      if (faq !== item) faq.classList.remove('active');
    });
    item.classList.toggle('active');
    if (item.classList.contains('active')) {
      setTimeout(() => {
        item.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 200);
    }
  });
});

// Animate sections on scroll (for browsers that don't support CSS animation-fill-mode)
const sections = document.querySelectorAll('section');
const revealOnScroll = () => {
  const trigger = window.innerHeight * 0.92;
  sections.forEach((sec, i) => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < trigger) {
      sec.style.opacity = 1;
      sec.style.transform = 'none';
    }
  });
};
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Timeline scroll animation
function revealTimelineSteps() {
  const steps = document.querySelectorAll('.timeline-step');
  const trigger = window.innerHeight * 0.92;
  steps.forEach(step => {
    const rect = step.getBoundingClientRect();
    if (rect.top < trigger && rect.bottom > 60) {
      step.classList.add('visible');
    } else {
      step.classList.remove('visible');
    }
  });
}
window.addEventListener('scroll', revealTimelineSteps);
window.addEventListener('load', revealTimelineSteps);

// Smooth scroll for down arrow
const downArrow = document.querySelector('.down-arrow');
if (downArrow) {
  downArrow.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector('#timeline');
    if (target) {
      const startY = window.scrollY;
      const endY = target.getBoundingClientRect().top + window.scrollY;
      const duration = 900;
      const ease = t => t < 0.5 ? 2*t*t : -1+(4-2*t)*t;
      let start;
      function step(timestamp) {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = ease(progress);
        window.scrollTo(0, startY + (endY - startY) * eased);
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      }
      requestAnimationFrame(step);
    }
  });
} 