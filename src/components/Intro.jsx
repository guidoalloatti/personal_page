import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

function TypingTitle() {
  const { t, i18n } = useTranslation();
  const phrases = t('hero.phrases', { returnObjects: true });

  const [idx, setIdx]     = useState(0);
  const [text, setText]   = useState('');
  const [phase, setPhase] = useState('typing');

  // Reset when language changes
  useEffect(() => {
    setText('');
    setIdx(0);
    setPhase('typing');
  }, [i18n.language]);

  useEffect(() => {
    if (!Array.isArray(phrases) || phrases.length === 0) return;
    const phrase = phrases[idx % phrases.length];
    if (phase === 'typing') {
      if (text.length < phrase.length) {
        const t = setTimeout(() => setText(phrase.slice(0, text.length + 1)), 48);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase('deleting'), 2200);
      return () => clearTimeout(t);
    }
    if (phase === 'deleting') {
      if (text.length > 0) {
        const t = setTimeout(() => setText(s => s.slice(0, -1)), 22);
        return () => clearTimeout(t);
      }
      setIdx(i => (i + 1) % phrases.length);
      setPhase('typing');
    }
  }, [text, phase, idx, phrases]);

  return (
    <p className="hero-title">
      {text}<span className="hero-cursor">|</span>
    </p>
  );
}

function ParticleCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const setup = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    setup();

    const N = Math.min(70, Math.floor((canvas.width * canvas.height) / 14000));
    const DIST = 130;
    const C = '130, 128, 250';

    const pts = Array.from({ length: N }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r:  Math.random() * 1.4 + 0.4,
      o:  Math.random() * 0.45 + 0.15,
    }));

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < DIST) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${C},${(1 - d / DIST) * 0.18})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      pts.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${C},${p.o})`;
        ctx.fill();

        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => { setup(); };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); };
  }, []);

  return <canvas ref={ref} className="hero-canvas" />;
}

export default function Intro() {
  const { t } = useTranslation();
  const contentRef = useRef(null);

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;

    const onMove = e => {
      const el = contentRef.current;
      if (!el) return;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      el.style.transform = `translate(${(e.clientX - cx) / cx * 9}px, ${(e.clientY - cy) / cy * 5}px)`;
    };
    const onLeave = () => { if (contentRef.current) contentRef.current.style.transform = ''; };

    hero.addEventListener('mousemove', onMove);
    hero.addEventListener('mouseleave', onLeave);
    return () => { hero.removeEventListener('mousemove', onMove); hero.removeEventListener('mouseleave', onLeave); };
  }, []);

  return (
    <section id="hero">
      <div className="hero-bg" />
      <ParticleCanvas />
      <div className="hero-gradient" />
      <div className="hero-content" ref={contentRef}>
        <span className="hero-label">{t('hero.label')}</span>
        <h1 className="hero-name">Guido Alloatti</h1>
        <TypingTitle />
      </div>
    </section>
  );
}
