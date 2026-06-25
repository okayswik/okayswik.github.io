import React, { useState, useEffect, useRef } from "react";

// ─── Real data from resume ───────────────────────────────────────────────────

const PROJECTS = [
  {
    title: "ASX Stock Price Prediction",
    description:
      "End-to-end ML regression pipeline forecasting Australian Securities Exchange stock prices. Applied feature engineering and EDA across multi-year historical data; benchmarked linear and ensemble models using RMSE and R² to select the highest-accuracy predictor.",
    tech: ["Python", "scikit-learn", "Pandas", "NumPy"],
    github: "https://github.com/okayswik/ASX_Predict",
    live: null,
    badge: "ML / Data",
  },
  {
    title: "HiCar — Car Rental Platform",
    description:
      "TypeScript-first car rental platform with 87.8% type coverage. Enforced strict type safety through interface definitions, modular component design, and typed props — eliminating runtime errors and mirroring production-grade engineering standards.",
    tech: ["TypeScript", "React", "Modular Architecture"],
    github: "https://github.com/okayswik/hicar",
    live: null,
    badge: "Full-Stack",
  },
  {
    title: "AI Engineering — CV & Speech",
    description:
      "Real-time facial recognition system (OpenCV) identifying faces from live camera input across varied lighting conditions. Paired with an independent end-to-end speech-to-text pipeline integrating audio capture and NLP transcription — both built from scratch.",
    tech: ["Python", "OpenCV", "SpeechRecognition", "NLP"],
    github: "https://github.com/okayswik",
    live: null,
    badge: "AI / ML",
  },
  {
    title: "Amazon Clone — E-Commerce App",
    description:
      "Full-stack e-commerce application with product listings, multi-item cart, and complete checkout flow across 10+ reusable React components. Firebase Auth for secure sign-in, Firestore for real-time cart persistence, deployed to Firebase Hosting.",
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
  "AI / ML":  ["scikit-learn", "Pandas", "NumPy", "OpenCV", "NLP", "Regression"],
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
    "Diagnosed and resolved production-level bugs across staging and live environments, sustaining platform reliability for a rapidly scaling user base.",
    "Delivered features inside Agile/Scrum sprints alongside senior engineers — PR reviews, standups, and continuous release cycles.",
  ],
};

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Tag({ label, accent = false }) {
  return (
    <span className={accent ? "tag tag--accent" : "tag"}>{label}</span>
  );
}

function ProjectCard({ project, index }) {
  return (
    <FadeIn delay={index * 90}>
      <div className="card">
        <div className="card-top">
          <span className="card-badge">{project.badge}</span>
          <span className="card-num">0{index + 1}</span>
        </div>
        <h3 className="card-title">{project.title}</h3>
        <p className="card-desc">{project.description}</p>
        <div className="card-tags">
          {project.tech.map((t) => <Tag key={t} label={t} />)}
        </div>
        <div className="card-links">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="card-link">
              GitHub →
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" className="card-link">
              Live demo →
            </a>
          )}
        </div>
      </div>
    </FadeIn>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="pw">

        {/* ── NAV ── */}
        <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
          <span className="logo" onClick={() => scrollTo("hero")}>swik.</span>
          <div className={`nav-links ${menuOpen ? "nav-links--open" : ""}`}>
            <button className="nav-link" onClick={() => scrollTo("about")}>about</button>
            <button className="nav-link" onClick={() => scrollTo("experience")}>experience</button>
            <button className="nav-link" onClick={() => scrollTo("projects")}>projects</button>
            <button className="nav-link" onClick={() => scrollTo("skills")}>skills</button>
            <a href="mailto:swikritineupanee@gmail.com" className="nav-cta">hire me</a>
          </div>
          <button className="burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="menu">
            <span /><span /><span />
          </button>
        </nav>

        {/* ── HERO ── */}
        <section id="hero" className="hero">
          <div className="hero-content">
            <div className="hero-pill">Full-Stack & AI/ML Engineer · open to work in Sydney</div>
            <h1 className="hero-name">
              Hi, I'm <em>Swikriti</em> —<br />
              I build software<br />that scales.
            </h1>
            <p className="hero-sub">
              2+ years shipping production features for a platform serving{" "}
              <strong>30,000+ active users</strong>. I work across the full stack —
              from React frontends and Node.js APIs to ML pipelines and cloud deployments.
            </p>
            <div className="hero-achievement">
              <span className="achievement-star">⭐</span>
              <span>
                Contributed to{" "}
                <strong>2× user growth in 3 months</strong>{" "}
                on a live production platform — while completing a Software Engineering degree.
              </span>
            </div>
            <div className="hero-actions">
              <button className="btn-warm" onClick={() => scrollTo("projects")}>See my work</button>
              <a href="/resume.pdf" className="btn-outline">Download CV</a>
            </div>
          </div>
          <div className="hero-blob">
            <span className="blob-stat">30K+</span>
            <span className="blob-label">users served</span>
          </div>
        </section>

        <div className="divider" />

        {/* ── ABOUT ── */}
        <section id="about" className="section">
          <FadeIn>
            <div className="eyebrow">About me</div>
            <h2 className="section-heading">The engineer behind the code</h2>
          </FadeIn>
          <div className="about-grid">
            <FadeIn delay={100}>
              <p>
                I'm a final-year Software Engineering student at Torrens University
                (AI Engineering major, graduating Dec 2026) with 2+ years of real commercial
                experience — not just coursework.
              </p>
              <p>
                My background spans full-stack development and AI/ML engineering. I've
                shipped production features in React, Node.js, and Express for a social
                platform that scaled to 30,000+ active users, and I build ML projects
                independently — from stock-price regression to computer vision systems.
              </p>
              <p>
                I care about code that's readable, systems that are reliable, and
                software that actually matters to the people using it.
              </p>
              <a
                href="mailto:swikritineupanee@gmail.com"
                className="btn-warm"
                style={{ display: "inline-block", marginTop: "1.5rem", textDecoration: "none" }}
              >
                Get in touch
              </a>
            </FadeIn>
            <div className="stats-grid">
              {[
                { value: "2+",    label: "Years commercial experience" },
                { value: "30K+",  label: "Active users on production platform" },
                { value: "4",     label: "Production features shipped" },
                { value: "3+",    label: "AI/ML projects built" },
              ].map((s, i) => (
                <FadeIn key={s.label} delay={i * 80}>
                  <div className="stat-card">
                    <span className="stat-value">{s.value}</span>
                    <span className="stat-label">{s.label}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ── EXPERIENCE ── */}
        <section id="experience" className="section">
          <FadeIn>
            <div className="eyebrow">Work</div>
            <h2 className="section-heading">Commercial experience</h2>
          </FadeIn>
          <FadeIn delay={80}>
            <div className="exp-card">
              <div className="exp-header">
                <div>
                  <h3 className="exp-title">{EXPERIENCE.title}</h3>
                  <div className="exp-company">
                    {EXPERIENCE.company}
                    <span className="exp-location"> · {EXPERIENCE.location}</span>
                  </div>
                  <div className="exp-stack">{EXPERIENCE.stack}</div>
                </div>
                <div className="exp-period">{EXPERIENCE.period}</div>
              </div>
              <div className="exp-scale-badge">
                <span>🚀</span>
                <span>Platform scaled to <strong>30,000+ active users</strong> · <strong>2× growth in 3 months</strong></span>
              </div>
              <ul className="exp-bullets">
                {EXPERIENCE.bullets.map((b, i) => (
                  <li key={i} className="exp-bullet">{b}</li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </section>

        <div className="divider" />

        {/* ── PROJECTS ── */}
        <section id="projects" className="section">
          <FadeIn>
            <div className="eyebrow">Featured work</div>
            <h2 className="section-heading">Projects I've built</h2>
          </FadeIn>
          <div className="cards-grid">
            {PROJECTS.map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i} />
            ))}
          </div>
          <FadeIn>
            <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
              <a
                href="https://github.com/okayswik"
                target="_blank"
                rel="noreferrer"
                className="btn-outline"
              >
                View all on GitHub
              </a>
            </div>
          </FadeIn>
        </section>

        <div className="divider" />

        {/* ── SKILLS ── */}
        <section id="skills" className="section">
          <FadeIn>
            <div className="eyebrow">Stack</div>
            <h2 className="section-heading">What I work with</h2>
          </FadeIn>
          <div className="skills-grid">
            {Object.entries(SKILLS).map(([cat, items], i) => (
              <FadeIn key={cat} delay={i * 70}>
                <div className="skill-group">
                  <h4 className="skill-cat">{cat}</h4>
                  <div className="skill-tags">
                    {items.map((s) => <Tag key={s} label={s} />)}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="section">
          <FadeIn>
            <div className="contact-box">
              <div className="contact-eyebrow">Open to opportunities</div>
              <h2>Let's build something together.</h2>
              <p>
                Looking for graduate roles and internships in Sydney — full-stack,
                backend, or AI/ML engineering. Always happy to talk.
              </p>
              <a href="mailto:swikritineupanee@gmail.com" className="btn-light">
                swikritineupanee@gmail.com →
              </a>
              <div className="social-links">
                <a href="https://github.com/okayswik" target="_blank" rel="noreferrer">GitHub</a>
                <a href="https://linkedin.com/in/swikriti-neupane" target="_blank" rel="noreferrer">LinkedIn</a>
                <a href="/resume.pdf">Resume PDF</a>
              </div>
            </div>
          </FadeIn>
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

// ─── Styles ───────────────────────────────────────────────────────────────────

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:          #faf7f2;
    --bg-card:     #ffffff;
    --bg-dark:     #2c2825;
    --accent:      #c1440e;
    --accent-h:    #a33a0c;
    --accent-soft: #f5e0d8;
    --accent-mid:  #e8c4b4;
    --text:        #2c2825;
    --text-muted:  #7a6e65;
    --text-soft:   #8a7e74;
    --border:      #ede8e1;
    --cream:       #c8a882;
    --font-serif:  'Lora', Georgia, serif;
    --font-sans:   'DM Sans', system-ui, sans-serif;
    --max-w:       920px;
  }

  html { scroll-behavior: smooth; }
  body {
    background: var(--bg); color: var(--text);
    font-family: var(--font-sans); line-height: 1.7;
    -webkit-font-smoothing: antialiased;
  }
  a { color: inherit; text-decoration: none; }
  p { color: var(--text-muted); margin-bottom: 1rem; line-height: 1.75; }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.25rem 2rem; transition: all 0.3s ease;
  }
  .nav--scrolled {
    background: rgba(250,247,242,0.93); backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border); padding: 0.9rem 2rem;
  }
  .logo {
    font-family: var(--font-serif); font-style: italic;
    font-size: 1.1rem; color: var(--text); cursor: pointer;
  }
  .nav-links { display: flex; align-items: center; gap: 0.2rem; }
  .nav-link {
    background: none; border: none; cursor: pointer;
    font-family: var(--font-sans); font-size: 0.82rem;
    color: var(--text-soft); padding: 0.4rem 0.7rem;
    border-radius: 100px; letter-spacing: 0.02em;
    transition: color 0.2s, background 0.2s;
  }
  .nav-link:hover { color: var(--text); background: rgba(0,0,0,0.04); }
  .nav-cta {
    margin-left: 0.4rem; background: var(--accent); color: #fff;
    border-radius: 100px; padding: 0.45rem 1.1rem;
    font-size: 0.8rem; font-family: var(--font-sans);
    transition: background 0.2s;
  }
  .nav-cta:hover { background: var(--accent-h); }
  .burger {
    display: none; flex-direction: column; gap: 4px;
    background: none; border: none; cursor: pointer; padding: 4px;
  }
  .burger span { display: block; width: 22px; height: 1.5px; background: var(--text-soft); }
  @media (max-width: 680px) {
    .burger { display: flex; }
    .nav-links {
      display: none; position: fixed; inset: 0; top: 60px;
      background: var(--bg); flex-direction: column;
      justify-content: center; align-items: center; gap: 1.2rem;
    }
    .nav-links--open { display: flex; }
    .nav-link { font-size: 1.2rem; }
  }

  /* HERO */
  .hero {
    min-height: 100vh; display: flex; align-items: center;
    justify-content: space-between; gap: 3rem;
    padding: 7rem 2rem 4rem; max-width: var(--max-w); margin: 0 auto;
  }
  .hero-content { flex: 1; }
  .hero-pill {
    display: inline-block; background: var(--accent-soft); color: var(--accent);
    font-size: 0.73rem; border-radius: 100px;
    padding: 0.3rem 0.9rem; margin-bottom: 1.25rem; letter-spacing: 0.04em;
  }
  .hero-name {
    font-family: var(--font-serif);
    font-size: clamp(2rem, 4.8vw, 3.1rem);
    font-weight: 600; line-height: 1.15;
    color: var(--text); margin-bottom: 1.25rem;
  }
  .hero-name em { font-style: italic; color: var(--accent); }
  .hero-sub {
    font-size: 1rem; color: var(--text-muted);
    max-width: 460px; margin-bottom: 1.25rem;
  }
  .hero-sub strong { color: var(--text); font-weight: 500; }
  .hero-achievement {
    display: flex; align-items: flex-start; gap: 0.5rem;
    background: var(--accent-soft); border-left: 3px solid var(--accent);
    border-radius: 0 10px 10px 0; padding: 0.6rem 0.9rem;
    margin-bottom: 1.75rem; max-width: 460px;
    font-size: 0.875rem; color: var(--text-muted); line-height: 1.5;
  }
  .hero-achievement strong { color: var(--text); font-weight: 500; }
  .achievement-star { flex-shrink: 0; line-height: 1.5; }
  .hero-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }

  /* Hero blob — shows the key stat */
  .hero-blob {
    width: 175px; height: 175px; flex-shrink: 0;
    background: linear-gradient(135deg, #f0e6d3 0%, var(--accent-soft) 100%);
    border-radius: 60% 40% 55% 45%/45% 55% 40% 60%;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    animation: blob 6s ease-in-out infinite;
    border: 1px solid var(--accent-mid);
  }
  .blob-stat {
    font-family: var(--font-serif); font-size: 2.2rem;
    font-weight: 600; color: var(--accent); line-height: 1;
  }
  .blob-label {
    font-size: 0.68rem; color: var(--text-soft);
    letter-spacing: 0.05em; text-align: center; margin-top: 0.2rem;
  }
  @keyframes blob {
    0%,100% { border-radius: 60% 40% 55% 45%/45% 55% 40% 60%; }
    33%      { border-radius: 45% 55% 40% 60%/60% 40% 55% 45%; }
    66%      { border-radius: 55% 45% 60% 40%/40% 60% 45% 55%; }
  }
  @media (max-width: 600px) { .hero-blob { display: none; } }

  /* BUTTONS */
  .btn-warm {
    background: var(--accent); color: #fff; border: none;
    border-radius: 100px; padding: 0.65rem 1.5rem; font-size: 0.875rem;
    font-family: var(--font-sans); cursor: pointer;
    transition: background 0.2s, transform 0.15s;
    display: inline-flex; align-items: center;
  }
  .btn-warm:hover { background: var(--accent-h); transform: translateY(-1px); }
  .btn-outline {
    background: transparent; color: var(--text);
    border: 1.5px solid var(--border); border-radius: 100px;
    padding: 0.6rem 1.4rem; font-size: 0.875rem;
    font-family: var(--font-sans); cursor: pointer;
    transition: border-color 0.2s, color 0.2s;
    display: inline-flex; align-items: center;
  }
  .btn-outline:hover { border-color: var(--accent); color: var(--accent); }

  /* DIVIDER */
  .divider { height: 1px; background: var(--border); max-width: var(--max-w); margin: 0 auto; }

  /* SECTION */
  .section { padding: 5rem 2rem; max-width: var(--max-w); margin: 0 auto; }
  .eyebrow {
    font-size: 0.7rem; letter-spacing: 0.1em;
    color: var(--cream); text-transform: uppercase; margin-bottom: 0.55rem;
  }
  .section-heading {
    font-family: var(--font-serif);
    font-size: clamp(1.55rem, 3vw, 2.15rem);
    font-weight: 600; color: var(--text);
    margin-bottom: 2.5rem; line-height: 1.2;
  }

  /* ABOUT */
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: start; }
  @media (max-width: 680px) { .about-grid { grid-template-columns: 1fr; } }
  .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem; }
  .stat-card {
    background: var(--bg-card); border: 1px solid var(--border);
    border-radius: 18px; padding: 1.1rem;
    display: flex; flex-direction: column; gap: 0.25rem;
  }
  .stat-value { font-family: var(--font-serif); font-size: 1.9rem; font-weight: 600; color: var(--accent); }
  .stat-label { font-size: 0.75rem; color: var(--text-soft); line-height: 1.35; }

  /* EXPERIENCE */
  .exp-card {
    background: var(--bg-card); border: 1px solid var(--border);
    border-radius: 20px; padding: 1.75rem;
  }
  .exp-header {
    display: flex; justify-content: space-between;
    align-items: flex-start; gap: 1rem; flex-wrap: wrap;
    margin-bottom: 1rem;
  }
  .exp-title { font-size: 1.05rem; font-weight: 600; color: var(--text); margin-bottom: 0.2rem; }
  .exp-company { font-size: 0.9rem; color: var(--text-soft); }
  .exp-location { color: var(--text-soft); }
  .exp-stack {
    font-size: 0.75rem; color: var(--cream); margin-top: 0.4rem;
    letter-spacing: 0.03em;
  }
  .exp-period {
    font-size: 0.8rem; color: var(--text-soft);
    white-space: nowrap; padding-top: 0.15rem;
  }
  .exp-scale-badge {
    display: flex; align-items: center; gap: 0.5rem;
    background: var(--accent-soft); border-radius: 10px;
    padding: 0.5rem 0.85rem; margin-bottom: 1.1rem;
    font-size: 0.82rem; color: var(--text-muted);
  }
  .exp-scale-badge strong { color: var(--accent); }
  .exp-bullets { list-style: none; display: flex; flex-direction: column; gap: 0.55rem; }
  .exp-bullet {
    font-size: 0.875rem; color: var(--text-muted); line-height: 1.65;
    padding-left: 1.1rem; position: relative;
  }
  .exp-bullet::before {
    content: "▸"; position: absolute; left: 0;
    color: var(--accent); font-size: 0.7rem; top: 0.22rem;
  }

  /* PROJECT CARDS */
  .cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(255px, 1fr)); gap: 1rem; }
  .card {
    background: var(--bg-card); border: 1px solid var(--border);
    border-radius: 20px; padding: 1.5rem;
    display: flex; flex-direction: column; gap: 0.55rem;
    transition: border-color 0.2s, transform 0.2s;
  }
  .card:hover { border-color: var(--accent); transform: translateY(-2px); }
  .card-top { display: flex; justify-content: space-between; align-items: center; }
  .card-badge {
    font-size: 0.65rem; letter-spacing: 0.07em; text-transform: uppercase;
    background: var(--accent-soft); color: var(--accent);
    border-radius: 100px; padding: 0.2rem 0.6rem;
  }
  .card-num { font-family: var(--font-serif); font-size: 1.35rem; color: #e8d5c4; }
  .card-title { font-size: 0.93rem; font-weight: 500; color: var(--text); }
  .card-desc { font-size: 0.815rem; color: var(--text-soft); line-height: 1.6; flex: 1; margin: 0; }
  .card-tags { display: flex; flex-wrap: wrap; gap: 0.3rem; margin-top: 0.2rem; }
  .card-links { display: flex; gap: 1rem; margin-top: 0.4rem; }
  .card-link { font-size: 0.8rem; color: var(--accent); transition: opacity 0.2s; }
  .card-link:hover { opacity: 0.7; }

  /* TAGS */
  .tag {
    display: inline-block; background: #f5f0ea; color: var(--text-muted);
    font-size: 0.7rem; border-radius: 100px; padding: 0.22rem 0.65rem;
  }
  .tag--accent { background: var(--accent-soft); color: var(--accent); }

  /* SKILLS */
  .skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(185px, 1fr)); gap: 1.1rem; }
  .skill-group {
    background: var(--bg-card); border: 1px solid var(--border);
    border-radius: 16px; padding: 1.15rem;
  }
  .skill-cat {
    font-size: 0.7rem; letter-spacing: 0.08em;
    color: var(--accent); text-transform: uppercase; margin-bottom: 0.7rem;
  }
  .skill-tags { display: flex; flex-wrap: wrap; gap: 0.35rem; }

  /* CONTACT */
  .contact-box {
    background: var(--bg-dark); border-radius: 24px;
    padding: 4rem 2rem; text-align: center;
  }
  .contact-eyebrow {
    font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase;
    color: #6b5f57; margin-bottom: 0.75rem;
  }
  .contact-box h2 {
    font-family: var(--font-serif); font-size: clamp(1.45rem, 3vw, 2rem);
    color: #faf7f2; margin-bottom: 0.75rem;
  }
  .contact-box p { color: #a89e95; font-size: 0.9rem; margin-bottom: 2rem; }
  .btn-light {
    background: var(--accent); color: #fff; border: none;
    border-radius: 100px; padding: 0.7rem 1.75rem; font-size: 0.875rem;
    font-family: var(--font-sans); cursor: pointer; display: inline-block;
    margin-bottom: 1.75rem; transition: background 0.2s;
  }
  .btn-light:hover { background: var(--accent-h); }
  .social-links { display: flex; justify-content: center; gap: 1.5rem; }
  .social-links a { color: #6b5f57; font-size: 0.82rem; transition: color 0.2s; }
  .social-links a:hover { color: #faf7f2; }

  /* FOOTER */
  .footer {
    border-top: 1px solid var(--border); padding: 1.5rem 2rem;
    display: flex; align-items: center; justify-content: center;
    gap: 0.75rem; font-size: 0.78rem; color: var(--text-soft);
  }
  .footer a:hover { color: var(--accent); }
  .footer-sep { color: var(--border); }
`;