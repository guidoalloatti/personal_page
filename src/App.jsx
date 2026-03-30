import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

export default function App() {
  useEffect(() => {
    const sections = document.querySelectorAll('section:not(#hero)');

    // Assign alternating reveal directions to cards/items within sections
    sections.forEach((section, si) => {
      section.querySelectorAll('.card').forEach((el, i) => {
        el.style.setProperty('--reveal-delay', `${i * 0.08}s`);
        el.dataset.revealDir = i % 2 === 0 ? 'left' : 'right';
      });
      section.querySelectorAll('.timeline-item').forEach((el, i) => {
        el.style.setProperty('--reveal-delay', `${i * 0.07}s`);
      });
      section.querySelectorAll('.skill-group').forEach((el, i) => {
        el.style.setProperty('--reveal-delay', `${i * 0.1}s`);
      });
    });

    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
    );

    sections.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Parallax on hero bg
  useEffect(() => {
    const heroBg = document.querySelector('.hero-bg');
    if (!heroBg) return;
    const onScroll = () => {
      const y = window.scrollY;
      heroBg.style.transform = `translateY(${y * 0.3}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
