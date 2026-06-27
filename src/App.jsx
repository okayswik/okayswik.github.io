import React, { useState, useEffect, useRef } from "react";

const PROJECTS = [
  {
    title: "ASX Stock Price Prediction",
    description: "End-to-end ML regression pipeline forecasting Australian Securities Exchange stock prices. Applied feature engineering and EDA across multi-year historical data; benchmarked linear and ensemble models using RMSE and R².",
    tech: ["Python", "scikit-learn", "Pandas", "NumPy"],
    github: "https://github.com/okayswik/ASX_Predict",
    live: null,
    badge: "ML / Data",
  },
  {
    title: "HiCar — Car Rental Platform",
    description: "TypeScript-first car rental platform with 87.8% type coverage. Enforced strict type safety through interface definitions, modular component design, and typed props — eliminating runtime errors.",
    tech: ["TypeScript", "React", "Modular Architecture"],
    github: "https://github.com/okayswik/hicar",
    live: null,
    badge: "Full-Stack",
  },
  {
    title: "AI Engineering — CV & Speech",
    description: "Real-time facial recognition system (OpenCV) identifying faces from live camera input. Paired with an end-to-end speech-to-text pipeline integrating audio capture and NLP transcription — both built from scratch.",
    tech: ["Python", "OpenCV", "SpeechRecognition", "NLP"],
    github: "https://github.com/okayswik",
    live: null,
    badge: "AI / ML",
  },
  {
    title: "Amazon Clone — E-Commerce App",
    description: "Full-stack e-commerce app with product listings, cart, and checkout across 10+ reusable React components. Firebase Auth for sign-in, Firestore for real-time cart persistence, deployed to Firebase Hosting.",
    tech: ["React", "Context API", "Firebase Auth", "Firestore"],
    github: "https://github.com/okayswik/amazon-clone",
    live: null,
    badge: "Full-Stack",
  },
];

const SKILLS = {
  Languages:  ["JavaScript (ES6+)", "TypeScript", "Python", "SQL"],
  Frontend:   ["React.js", "Hooks", "Context API", "Redux", "Tailwind CSS"],
  Backend:    ["Node.js", "Express.js", "REST APIs", "JWT Auth", "MVC"],
  Databases:  ["MongoDB", "MySQL", "Firebase Firestore"],
  Cloud:      ["Firebase Auth & Hosting", "GCP"],
  "AI / ML":  ["scikit-learn", "Pandas", "NumPy", "OpenCV", "NLP"],
  Tools:      ["Git/GitHub", "GitHub Actions", "Postman", "JIRA", "Agile/Scrum"],
};

const EXPERIENCE = {
  title: "Junior Full-Stack Developer",
  company: "DoppelMate · LemedoIt Inc.",
  period: "2023 – 2024",
  location: "Remote",
  stack: "React · Node.js · Express · Firebase · MongoDB · JWT",
  bullets: [
    "Designed, implemented, tested, and deployed 4 production features end-to-end — JWT authentication, user registration, a reporting & blocking system, and birthday-based community matching.",
    "Engineered RESTful APIs across a React / Node.js / Express stack, directly contributing to 2× user growth within 3 months of launch.",
    "Diagnosed and resolved production-level bugs across staging and live environments, sustaining platform reliability for 30,000+ concurrent users.",
    "Delivered features inside Agile/Scrum sprints alongside senior engineers — PR reviews, standups, and continuous release cycles.",
  ],
};

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "", dir = "up" }) {
  const [ref, visible] = useInView();
  const t = { up: "translateY(24px)", left: "translateX(-24px)", right: "translateX(24px)", none: "none" };
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translate(0)" : t[dir],
      transition: `opacity 0.65s cubic-bezier(.4,0,.2,1) ${delay}ms, transform 0.65s cubic-bezier(.4,0,.2,1) ${delay}ms`,
    }}>{children}</div>
  );
}

function useCounter(target, duration = 1600) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);
  useEffect(() => {
    if (!started) return;
    const n = parseInt(target.replace(/\D/g, ""), 10);
    if (!n) return;
    const step = n / (duration / 16);
    let cur = 0;
    const t = setInterval(() => { cur = Math.min(cur + step, n); setCount(Math.floor(cur)); if (cur >= n) clearInterval(t); }, 16);
    return () => clearInterval(t);
  }, [started]);
  const suffix = target.replace(/[0-9]/g, "");
  return [ref, count === 0 && !started ? target : `${count}${suffix}`];
}

function Typewriter({ words, speed = 75, pause = 1800 }) {
  const [text, setText] = useState("");
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[wi];
    let t;
    if (!del && ci < word.length)         t = setTimeout(() => setCi(c => c + 1), speed);
    else if (!del && ci === word.length)  t = setTimeout(() => setDel(true), pause);
    else if (del && ci > 0)               t = setTimeout(() => setCi(c => c - 1), speed / 2);
    else { setDel(false); setWi(i => (i + 1) % words.length); }
    setText(word.slice(0, ci));
    return () => clearTimeout(t);
  }, [ci, del, wi]);
  return <span className="typewriter">{text}<span className="cursor">|</span></span>;
}

function StatCard({ value, label, delay }) {
  const [ref, animated] = useCounter(value);
  return (
    <FadeIn delay={delay}>
      <div className="stat-card" ref={ref}>
        <span className="stat-value">{animated}</span>
        <span className="stat-label">{label}</span>
      </div>
    </FadeIn>
  );
}

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const onMove = (e) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    cardRef.current.style.transform = `perspective(700px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-4px)`;
  };
  const onLeave = () => { if (cardRef.current) cardRef.current.style.transform = ""; };
  return (
    <FadeIn delay={index * 100}>
      <div className="card" ref={cardRef} onMouseMove={onMove} onMouseLeave={onLeave}>
        <div className="card-top">
          <span className="card-badge">{project.badge}</span>
          <span className="card-num">0{index + 1}</span>
        </div>
        <h3 className="card-title">{project.title}</h3>
        <p className="card-desc">{project.description}</p>
        <div className="card-tags">{project.tech.map(t => <span key={t} className="tag">{t}</span>)}</div>
        <div className="card-links">
          {project.github && <a href={project.github} target="_blank" rel="noreferrer" className="card-link">GitHub →</a>}
          {project.live && <a href={project.live} target="_blank" rel="noreferrer" className="card-link">Live →</a>}
        </div>
      </div>
    </FadeIn>
  );
}

function ScrollBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const fn = () => { const el = document.documentElement; setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100); };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return <div className="scroll-bar" style={{ width: `${pct}%` }} />;
}

// Subtle grid/dot texture overlay
function GridTexture() {
  return <div className="grid-texture" aria-hidden="true" />;
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return (
    <>
      <style>{CSS}</style>
      <ScrollBar />
      <GridTexture />
      <div className="pw">

        {/* NAV */}
        <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
          <span className="logo" onClick={() => scrollTo("hero")}>swik.</span>
          <div className={`nav-links ${menuOpen ? "nav-links--open" : ""}`}>
            {["about","experience","projects","skills"].map(s => (
              <button key={s} className="nav-link" onClick={() => scrollTo(s)}>{s}</button>
            ))}
            <a href="mailto:swikritineupanee@gmail.com" className="nav-cta">hire me</a>
          </div>
          <button className="burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="menu">
            <span /><span /><span />
          </button>
        </nav>

        {/* HERO */}
        <section id="hero" className="hero">
          {/* left content */}
          <div className="hero-content">
            <div className="hero-pill">
              <span className="pill-dot" />
              Full-Stack & AI/ML Engineer · open to work in Sydney
            </div>
            <h1 className="hero-name">
              Hi, I'm <em>Swikriti</em> —<br />
              I <Typewriter words={["build for scale.","ship production code.","engineer with clarity.","love clean APIs."]} />
            </h1>
            <p className="hero-sub">
              2+ years shipping production features for a platform serving{" "}
              <strong>30,000+ active users</strong>. Full stack — React frontends,
              Node.js APIs, ML pipelines, cloud deployments.
            </p>
            <div className="hero-achievement">
              <span>⭐</span>
              <span>Contributed to <strong>2× user growth in 3 months</strong> on a live production platform — while completing a Software Engineering degree.</span>
            </div>
            <div className="hero-actions">
              <button className="btn-warm" onClick={() => scrollTo("projects")}>See my work</button>
              <a href="/resume.pdf" className="btn-outline">Download CV</a>
            </div>
          </div>

          {/* photo */}
          <div className="hero-photo-wrap">
            <div className="photo-ring photo-ring-outer" />
            <div className="photo-ring photo-ring-inner" />
            <div className="photo-frame">
              {!imgError
                ? <img src="/photo.jpg.png" alt="Swikriti Neupane" className="photo-img" onError={() => setImgError(true)} />
                : <div className="photo-initials">SN</div>}
            </div>
            <div className="photo-badge"><span className="badge-dot" /><span>Available</span></div>
            <div className="photo-float-tag tag-a">React</div>
            <div className="photo-float-tag tag-b">Node.js</div>
            <div className="photo-float-tag tag-c">AI / ML</div>
          </div>
        </section>

        {/* MARQUEE STRIP */}
        <div className="marquee-wrap">
          <div className="marquee-track">
            {["Full-Stack Dev","React","TypeScript","Node.js","REST APIs","Machine Learning","Python","OpenCV","Firebase","MongoDB","Agile/Scrum","JWT Auth","scikit-learn","NLP","Git/GitHub",
              "Full-Stack Dev","React","TypeScript","Node.js","REST APIs","Machine Learning","Python","OpenCV","Firebase","MongoDB","Agile/Scrum","JWT Auth","scikit-learn","NLP","Git/GitHub"].map((w,i) => (
              <span key={i} className="marquee-item">{w} <span className="marquee-dot">✦</span></span>
            ))}
          </div>
        </div>

        {/* ABOUT */}
        <section id="about" className="section section--tinted">
          <div className="section-inner">
            <FadeIn>
              <div className="eyebrow">About me</div>
              <h2 className="section-heading">The engineer behind the code</h2>
            </FadeIn>
            <div className="about-grid">
              <FadeIn delay={100} dir="left">
                <p>I'm a final-year Software Engineering student at Torrens University (AI Engineering major, graduating Dec 2026) with 2+ years of real commercial experience — not just coursework.</p>
                <p>My background spans full-stack development and AI/ML engineering. I've shipped production features at scale, and I build ML projects independently — from stock-price regression to computer vision systems.</p>
                <p>I care about code that's readable, systems that are reliable, and software that actually matters to the people using it.</p>
                <a href="mailto:swikritineupanee@gmail.com" className="btn-warm" style={{ display:"inline-block", marginTop:"1.5rem", textDecoration:"none" }}>Get in touch</a>
              </FadeIn>
              <div className="stats-grid">
                <StatCard value="2+"     label="Years commercial experience" delay={0} />
                <StatCard value="30000+" label="Active users on production platform" delay={80} />
                <StatCard value="4+"     label="Production features shipped" delay={160} />
                <StatCard value="3+"     label="AI / ML projects built" delay={240} />
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="section">
          <div className="section-inner">
            <FadeIn>
              <div className="eyebrow">Work</div>
              <h2 className="section-heading">Commercial experience</h2>
            </FadeIn>
            <FadeIn delay={80}>
              <div className="exp-card">
                <div className="exp-header">
                  <div>
                    <h3 className="exp-title">{EXPERIENCE.title}</h3>
                    <div className="exp-company">{EXPERIENCE.company}<span className="exp-location"> · {EXPERIENCE.location}</span></div>
                    <div className="exp-stack">{EXPERIENCE.stack}</div>
                  </div>
                  <div className="exp-period">{EXPERIENCE.period}</div>
                </div>
                <div className="exp-scale-badge">
                  <span>🚀</span>
                  <span>Platform scaled to <strong>30,000+ active users</strong> · <strong>2× growth in 3 months</strong></span>
                </div>
                <ul className="exp-bullets">
                  {EXPERIENCE.bullets.map((b, i) => <li key={i} className="exp-bullet">{b}</li>)}
                </ul>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="section section--dark">
          <div className="section-inner">
            <FadeIn>
              <div className="eyebrow eyebrow--light">Featured work</div>
              <h2 className="section-heading section-heading--light">Projects I've built</h2>
            </FadeIn>
            <div className="cards-grid">
              {PROJECTS.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
            </div>
            <FadeIn>
              <div style={{ textAlign:"center", marginTop:"2.5rem" }}>
                <a href="https://github.com/okayswik" target="_blank" rel="noreferrer" className="btn-outline btn-outline--light">View all on GitHub</a>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="section section--tinted">
          <div className="section-inner">
            <FadeIn>
              <div className="eyebrow">Stack</div>
              <h2 className="section-heading">What I work with</h2>
            </FadeIn>
            <div className="skills-grid">
              {Object.entries(SKILLS).map(([cat, items], i) => (
                <FadeIn key={cat} delay={i * 70}>
                  <div className="skill-group">
                    <h4 className="skill-cat">{cat}</h4>
                    <div className="skill-tags">{items.map(s => <span key={s} className="tag">{s}</span>)}</div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section">
          <div className="section-inner">
            <FadeIn>
              <div className="contact-box">
                <div className="contact-glow" />
                <div className="contact-eyebrow">Open to opportunities</div>
                <h2>Let's build something together.</h2>
                <p>Looking for graduate roles and internships in Sydney — full-stack, backend, or AI/ML engineering.</p>
                <a href="mailto:swikritineupanee@gmail.com" className="btn-light">swikritineupanee@gmail.com →</a>
                <div className="social-links">
                  <a href="https://github.com/okayswik" target="_blank" rel="noreferrer">GitHub</a>
                  <a href="https://linkedin.com/in/swikriti-neupane" target="_blank" rel="noreferrer">LinkedIn</a>
                  <a href="/resume.pdf">Resume PDF</a>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <footer className="footer">
          <span>Designed & built by Swikriti Neupane</span>
          <span className="footer-sep">·</span>
          <a href="https://github.com/okayswik" target="_blank" rel="noreferrer">GitHub</a>
        </footer>

      </div>
    </>
  );
}

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:           #faf7f2;
    --bg-tinted:    #f4ede3;
    --bg-card:      #ffffff;
    --bg-dark:      #1e1a16;
    --bg-dark2:     #2c2520;
    --accent:       #c1440e;
    --accent-h:     #a33a0c;
    --accent-soft:  #f5e0d8;
    --accent-mid:   #e8c4b4;
    --text:         #2c2825;
    --text-muted:   #7a6e65;
    --text-soft:    #8a7e74;
    --border:       #ede8e1;
    --border-dark:  #3a312b;
    --cream:        #c8a882;
    --font-serif:   'Lora', Georgia, serif;
    --font-sans:    'DM Sans', system-ui, sans-serif;
    --max-w:        960px;
  }

  html { scroll-behavior: smooth; }
  body {
    background: var(--bg); color: var(--text);
    font-family: var(--font-sans); line-height: 1.7;
    -webkit-font-smoothing: antialiased; overflow-x: hidden;
  }
  a { color: inherit; text-decoration: none; }
  p { color: var(--text-muted); margin-bottom: 1rem; line-height: 1.75; }

  /* subtle dot grid overlay on hero only */
  .grid-texture {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image: radial-gradient(circle, rgba(193,68,14,0.07) 1px, transparent 1px);
    background-size: 32px 32px;
    mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 20%, rgba(0,0,0,0.4) 50%, transparent 100%);
  }

  /* scroll bar */
  .scroll-bar {
    position: fixed; top: 0; left: 0; height: 2.5px;
    background: linear-gradient(90deg, var(--accent), #e8825a);
    z-index: 200; transition: width 0.1s linear;
    border-radius: 0 2px 2px 0;
  }

  .pw { position: relative; z-index: 1; }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.25rem 2.5rem; transition: all 0.35s cubic-bezier(.4,0,.2,1);
  }
  .nav--scrolled {
    background: rgba(250,247,242,0.93); backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--border); padding: 0.85rem 2.5rem;
    box-shadow: 0 1px 20px rgba(0,0,0,0.05);
  }
  .logo { font-family: var(--font-serif); font-style: italic; font-size: 1.1rem; color: var(--text); cursor: pointer; transition: color 0.2s; }
  .logo:hover { color: var(--accent); }
  .nav-links { display: flex; align-items: center; gap: 0.2rem; }
  .nav-link { background: none; border: none; cursor: pointer; font-family: var(--font-sans); font-size: 0.82rem; color: var(--text-soft); padding: 0.4rem 0.75rem; border-radius: 100px; letter-spacing: 0.02em; transition: color 0.2s, background 0.2s; }
  .nav-link:hover { color: var(--text); background: rgba(0,0,0,0.05); }
  .nav-cta { margin-left: 0.4rem; background: var(--accent); color: #fff; border-radius: 100px; padding: 0.45rem 1.15rem; font-size: 0.8rem; font-family: var(--font-sans); transition: background 0.2s, transform 0.15s, box-shadow 0.2s; box-shadow: 0 2px 10px rgba(193,68,14,0.25); }
  .nav-cta:hover { background: var(--accent-h); transform: translateY(-1px); box-shadow: 0 4px 16px rgba(193,68,14,0.3); }
  .burger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; }
  .burger span { display: block; width: 22px; height: 1.5px; background: var(--text-soft); }
  @media (max-width: 680px) {
    .burger { display: flex; }
    .nav-links { display: none; position: fixed; inset: 0; top: 60px; background: var(--bg); flex-direction: column; justify-content: center; align-items: center; gap: 1.25rem; }
    .nav-links--open { display: flex; }
    .nav-link { font-size: 1.2rem; }
  }

  /* HERO */
  .hero {
    min-height: 100vh; display: flex; align-items: center;
    justify-content: space-between; gap: 4rem;
    padding: 7rem 2.5rem 5rem; max-width: var(--max-w); margin: 0 auto;
  }
  .hero-content { flex: 1; }

  .hero-pill {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: var(--accent-soft); color: var(--accent);
    font-size: 0.73rem; border-radius: 100px;
    padding: 0.3rem 0.9rem; margin-bottom: 1.25rem; letter-spacing: 0.04em;
    animation: slideDown 0.6s cubic-bezier(.4,0,.2,1) both;
  }
  .pill-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); flex-shrink: 0; animation: pulse 2s ease-in-out infinite; }
  @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.5; transform:scale(0.8); } }
  @keyframes slideDown { from { opacity:0; transform:translateY(-12px); } to { opacity:1; transform:translateY(0); } }

  .hero-name {
    font-family: var(--font-serif);
    font-size: clamp(2rem, 4.5vw, 3rem);
    font-weight: 600; line-height: 1.18; color: var(--text); margin-bottom: 1.25rem;
    animation: slideUp 0.7s 0.1s cubic-bezier(.4,0,.2,1) both;
  }
  .hero-name em { font-style: italic; color: var(--accent); }
  @keyframes slideUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }

  .typewriter { color: var(--accent); }
  .cursor { display: inline-block; color: var(--accent); font-weight: 300; animation: blink 0.9s step-end infinite; }
  @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }

  .hero-sub { font-size: 1rem; color: var(--text-muted); max-width: 460px; margin-bottom: 1.1rem; animation: slideUp 0.7s 0.2s cubic-bezier(.4,0,.2,1) both; }
  .hero-sub strong { color: var(--text); font-weight: 500; }

  .hero-achievement {
    display: flex; align-items: flex-start; gap: 0.5rem;
    background: var(--accent-soft); border-left: 3px solid var(--accent);
    border-radius: 0 10px 10px 0; padding: 0.6rem 0.9rem;
    margin-bottom: 1.75rem; max-width: 460px;
    font-size: 0.875rem; color: var(--text-muted); line-height: 1.5;
    animation: slideUp 0.7s 0.3s cubic-bezier(.4,0,.2,1) both;
  }
  .hero-achievement strong { color: var(--text); font-weight: 500; }
  .hero-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; animation: slideUp 0.7s 0.4s cubic-bezier(.4,0,.2,1) both; }

  /* PHOTO */
  .hero-photo-wrap {
    position: relative; flex-shrink: 0; width: 240px; height: 240px;
    animation: floatPhoto 5s ease-in-out infinite, fadeIn 0.8s 0.3s both;
  }
  @keyframes floatPhoto { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-14px); } }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  .photo-ring { position: absolute; border-radius: 50%; inset: 0; animation: spin linear infinite; }
  .photo-ring-outer { border: 1.5px dashed var(--accent-mid); animation-duration: 18s; margin: -18px; }
  .photo-ring-inner { border: 1px solid var(--accent-soft); animation-duration: 12s; animation-direction: reverse; margin: -8px; }
  @keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
  .photo-frame { width:100%; height:100%; border-radius:50%; overflow:hidden; border:3px solid var(--accent-soft); box-shadow:0 20px 60px rgba(193,68,14,0.15),0 4px 20px rgba(0,0,0,0.08); background:linear-gradient(135deg,#f0e6d3,var(--accent-soft)); position:relative; z-index:1; }
  .photo-img { width:100%; height:100%; object-fit:cover; object-position:top; }
  .photo-initials { width:100%; height:100%; display:flex; align-items:center; justify-content:center; font-family:var(--font-serif); font-size:3.5rem; font-weight:600; color:var(--accent); }
  .photo-badge { position:absolute; bottom:12px; right:-12px; z-index:2; display:flex; align-items:center; gap:5px; background:#fff; border:1px solid var(--border); border-radius:100px; padding:0.3rem 0.75rem; font-size:0.72rem; font-weight:500; color:#16a34a; box-shadow:0 4px 16px rgba(0,0,0,0.1); animation:badgePop 0.5s 0.8s cubic-bezier(.34,1.56,.64,1) both; }
  @keyframes badgePop { from { opacity:0; transform:scale(0.6); } to { opacity:1; transform:scale(1); } }
  .badge-dot { width:6px; height:6px; border-radius:50%; background:#16a34a; animation:pulse 2s ease-in-out infinite; }
  .photo-float-tag { position:absolute; z-index:2; background:#fff; border:1px solid var(--border); border-radius:100px; padding:0.25rem 0.65rem; font-size:0.68rem; color:var(--text-muted); box-shadow:0 2px 12px rgba(0,0,0,0.08); white-space:nowrap; }
  .tag-a { top:-8px; left:-20px; animation:floatTag 4s 0s ease-in-out infinite; }
  .tag-c { bottom:-4px; left:-16px; animation:floatTag 4s 0.7s ease-in-out infinite; }
  .tag-b { top:50%; right:-28px; animation:floatTagB 4s 1.3s ease-in-out infinite; }
  @keyframes floatTag { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-6px); } }
  @keyframes floatTagB { 0%,100% { transform:translateY(-50%); } 50% { transform:translateY(calc(-50% - 6px)); } }
  @media (max-width:640px) { .hero-photo-wrap { display:none; } }

  /* MARQUEE */
  .marquee-wrap {
    overflow: hidden;
    background: var(--accent);
    padding: 0.7rem 0;
    border-top: 1px solid rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }
  .marquee-track {
    display: flex; gap: 0; white-space: nowrap;
    animation: marquee 30s linear infinite;
    width: max-content;
  }
  .marquee-wrap:hover .marquee-track { animation-play-state: paused; }
  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .marquee-item { font-size: 0.78rem; letter-spacing: 0.06em; text-transform: uppercase; color: rgba(255,255,255,0.9); padding: 0 1.25rem; font-family: var(--font-sans); font-weight: 500; }
  .marquee-dot { color: rgba(255,255,255,0.4); margin-left: 1.25rem; }

  /* SECTIONS */
  .section { padding: 5.5rem 0; }
  .section-inner { max-width: var(--max-w); margin: 0 auto; padding: 0 2.5rem; }
  .section--tinted { background: var(--bg-tinted); }
  .section--dark { background: var(--bg-dark); }

  .eyebrow { font-size: 0.7rem; letter-spacing: 0.1em; color: var(--cream); text-transform: uppercase; margin-bottom: 0.55rem; }
  .eyebrow--light { color: rgba(200,168,130,0.7); }
  .section-heading { font-family: var(--font-serif); font-size: clamp(1.55rem,3vw,2.1rem); font-weight: 600; color: var(--text); margin-bottom: 2.5rem; line-height: 1.2; }
  .section-heading--light { color: #f5ede4; }

  /* ABOUT */
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: start; }
  @media (max-width: 680px) { .about-grid { grid-template-columns: 1fr; } }
  .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem; }
  .stat-card { background: #fff; border: 1px solid var(--border); border-radius: 18px; padding: 1.1rem; display: flex; flex-direction: column; gap: 0.25rem; transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s; }
  .stat-card:hover { border-color: var(--accent-mid); transform: translateY(-2px); box-shadow: 0 6px 24px rgba(0,0,0,0.06); }
  .stat-value { font-family: var(--font-serif); font-size: 1.9rem; font-weight: 600; color: var(--accent); }
  .stat-label { font-size: 0.75rem; color: var(--text-soft); line-height: 1.35; }

  /* EXPERIENCE */
  .exp-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 20px; padding: 1.75rem; transition: box-shadow 0.2s; }
  .exp-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.07); }
  .exp-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem; }
  .exp-title { font-size: 1.05rem; font-weight: 600; color: var(--text); margin-bottom: 0.2rem; }
  .exp-company { font-size: 0.9rem; color: var(--text-soft); }
  .exp-location { color: var(--text-soft); }
  .exp-stack { font-size: 0.75rem; color: var(--cream); margin-top: 0.4rem; letter-spacing: 0.03em; }
  .exp-period { font-size: 0.8rem; color: var(--text-soft); white-space: nowrap; padding-top: 0.15rem; }
  .exp-scale-badge { display: flex; align-items: center; gap: 0.5rem; background: var(--accent-soft); border-radius: 10px; padding: 0.5rem 0.85rem; margin-bottom: 1.1rem; font-size: 0.82rem; color: var(--text-muted); }
  .exp-scale-badge strong { color: var(--accent); }
  .exp-bullets { list-style: none; display: flex; flex-direction: column; gap: 0.55rem; }
  .exp-bullet { font-size: 0.875rem; color: var(--text-muted); line-height: 1.65; padding-left: 1.1rem; position: relative; }
  .exp-bullet::before { content: "▸"; position: absolute; left: 0; color: var(--accent); font-size: 0.7rem; top: 0.22rem; }

  /* PROJECT CARDS — dark bg, light cards */
  .cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(255px, 1fr)); gap: 1rem; }
  .card { background: var(--bg-dark2); border: 1px solid var(--border-dark); border-radius: 20px; padding: 1.5rem; display: flex; flex-direction: column; gap: 0.55rem; transition: border-color 0.25s, box-shadow 0.25s; will-change: transform; }
  .card:hover { border-color: #6b4a38; box-shadow: 0 12px 40px rgba(0,0,0,0.35); }
  .card-top { display: flex; justify-content: space-between; align-items: center; }
  .card-badge { font-size: 0.65rem; letter-spacing: 0.07em; text-transform: uppercase; background: rgba(193,68,14,0.2); color: #e8825a; border-radius: 100px; padding: 0.2rem 0.6rem; }
  .card-num { font-family: var(--font-serif); font-size: 1.35rem; color: #4a3b32; }
  .card-title { font-size: 0.93rem; font-weight: 500; color: #f0e6dc; }
  .card-desc { font-size: 0.815rem; color: #9a8a7e; line-height: 1.6; flex: 1; margin: 0; }
  .card-tags { display: flex; flex-wrap: wrap; gap: 0.3rem; margin-top: 0.2rem; }
  .card-links { display: flex; gap: 1rem; margin-top: 0.4rem; }
  .card-link { font-size: 0.8rem; color: #e8825a; transition: opacity 0.2s, letter-spacing 0.2s; }
  .card-link:hover { opacity: 0.7; letter-spacing: 0.03em; }

  /* TAGS */
  .tag { display: inline-block; background: rgba(255,255,255,0.07); color: #9a8a7e; font-size: 0.7rem; border-radius: 100px; padding: 0.22rem 0.65rem; transition: background 0.2s, color 0.2s; }
  .section--tinted .tag, .section .tag { background: #f5f0ea; color: var(--text-muted); }
  .section--tinted .tag:hover, .section .tag:hover { background: var(--accent-soft); color: var(--accent); }
  .section--dark .tag { background: rgba(255,255,255,0.07); color: #9a8a7e; }
  .section--dark .tag:hover { background: rgba(193,68,14,0.2); color: #e8825a; }

  /* SKILLS */
  .skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(185px,1fr)); gap: 1.1rem; }
  .skill-group { background: #fff; border: 1px solid var(--border); border-radius: 16px; padding: 1.15rem; transition: border-color 0.2s, transform 0.2s; }
  .skill-group:hover { border-color: var(--accent-mid); transform: translateY(-2px); }
  .skill-cat { font-size: 0.7rem; letter-spacing: 0.08em; color: var(--accent); text-transform: uppercase; margin-bottom: 0.7rem; }
  .skill-tags { display: flex; flex-wrap: wrap; gap: 0.35rem; }

  /* CONTACT */
  .contact-box { background: var(--bg-dark); border-radius: 24px; padding: 4rem 2rem; text-align: center; position: relative; overflow: hidden; }
  .contact-glow { position: absolute; width: 400px; height: 400px; border-radius: 50%; background: radial-gradient(circle, rgba(193,68,14,0.2) 0%, transparent 70%); top: 50%; left: 50%; transform: translate(-50%,-50%); pointer-events: none; animation: glowPulse 4s ease-in-out infinite; }
  @keyframes glowPulse { 0%,100% { transform:translate(-50%,-50%) scale(1); opacity:0.8; } 50% { transform:translate(-50%,-50%) scale(1.15); opacity:1; } }
  .contact-eyebrow { font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; color: #6b5f57; margin-bottom: 0.75rem; }
  .contact-box h2 { font-family: var(--font-serif); font-size: clamp(1.45rem,3vw,2rem); color: #faf7f2; margin-bottom: 0.75rem; position: relative; }
  .contact-box p { color: #a89e95; font-size: 0.9rem; margin-bottom: 2rem; position: relative; }
  .btn-light { background: var(--accent); color: #fff; border-radius: 100px; padding: 0.7rem 1.75rem; font-size: 0.875rem; font-family: var(--font-sans); display: inline-block; margin-bottom: 1.75rem; transition: background 0.2s, transform 0.15s, box-shadow 0.2s; box-shadow: 0 4px 20px rgba(193,68,14,0.3); position: relative; }
  .btn-light:hover { background: var(--accent-h); transform: translateY(-2px); box-shadow: 0 8px 28px rgba(193,68,14,0.4); }
  .social-links { display: flex; justify-content: center; gap: 1.5rem; position: relative; }
  .social-links a { color: #6b5f57; font-size: 0.82rem; transition: color 0.2s; }
  .social-links a:hover { color: #faf7f2; }

  /* BUTTONS */
  .btn-warm { background: var(--accent); color: #fff; border: none; border-radius: 100px; padding: 0.65rem 1.5rem; font-size: 0.875rem; font-family: var(--font-sans); cursor: pointer; box-shadow: 0 2px 14px rgba(193,68,14,0.28); transition: background 0.2s, transform 0.15s, box-shadow 0.2s; display: inline-flex; align-items: center; }
  .btn-warm:hover { background: var(--accent-h); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(193,68,14,0.35); }
  .btn-outline { background: transparent; color: var(--text); border: 1.5px solid var(--border); border-radius: 100px; padding: 0.6rem 1.4rem; font-size: 0.875rem; font-family: var(--font-sans); cursor: pointer; transition: border-color 0.2s, color 0.2s, transform 0.15s; display: inline-flex; align-items: center; }
  .btn-outline:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-1px); }
  .btn-outline--light { color: #d4c4b8; border-color: var(--border-dark); }
  .btn-outline--light:hover { border-color: #e8825a; color: #e8825a; }

  /* FOOTER */
  .footer { border-top: 1px solid var(--border); padding: 1.5rem 2rem; display: flex; align-items: center; justify-content: center; gap: 0.75rem; font-size: 0.78rem; color: var(--text-soft); }
  .footer a:hover { color: var(--accent); }
  .footer-sep { color: var(--border); }
  .divider { height: 1px; background: var(--border); }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  }
`;