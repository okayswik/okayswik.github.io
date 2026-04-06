import React, { useState, useEffect, useRef } from "react";

const PROJECTS = [
  {
    title: "Anomaly Detection Pipeline",
    description: "Real-time LSTM-based anomaly detection on streaming time-series data.",
    tech: ["Python", "TensorFlow", "Kafka", "Docker"],
    github: "https://github.com/okayswik",
    live: null,
  },
  {
    title: "Self-Serve Data Platform",
    description: "End-to-end ETL with automated data quality checks and a self-serve analytics layer.",
    tech: ["Airflow", "dbt", "Snowflake", "React"],
    github: "https://github.com/okayswik",
    live: null,
  },
  {
    title: "NLP Ticket Classifier",
    description: "94% accuracy support ticket categorisation deployed as a FastAPI service.",
    tech: ["HuggingFace", "FastAPI", "PostgreSQL", "Python"],
    github: "https://github.com/okayswik",
    live: null,
  },
];

const SKILLS = {
  Languages: ["Python", "SQL", "JavaScript", "Bash"],
  "ML & Data": ["PyTorch", "scikit-learn", "Pandas", "NumPy", "TensorFlow"],
  "Infra & Tools": ["Docker", "Airflow", "dbt", "Spark", "Git"],
  Cloud: ["AWS", "GCP", "Snowflake", "BigQuery"],
};

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
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
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Tag({ label }) {
  return <span className="tag">{label}</span>;
}

function ProjectCard({ project, index }) {
  return (
    <FadeIn delay={index * 100}>
      <div className="card">
        <div className="card-num">0{index + 1}</div>
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
              Live →
            </a>
          )}
        </div>
      </div>
    </FadeIn>
  );
}

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

        {/* NAV */}
        <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
          <span className="logo" onClick={() => scrollTo("hero")}>swik.</span>
          <div className={`nav-links ${menuOpen ? "nav-links--open" : ""}`}>
            <button className="nav-link" onClick={() => scrollTo("about")}>about</button>
            <button className="nav-link" onClick={() => scrollTo("projects")}>work</button>
            <button className="nav-link" onClick={() => scrollTo("skills")}>skills</button>
            <a href="mailto:you@email.com" className="nav-cta">hire me</a>
          </div>
          <button className="burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="menu">
            <span /><span /><span />
          </button>
        </nav>

        {/* HERO */}
        <section id="hero" className="hero">
          <div className="hero-content">
            <div className="hero-pill">Data & ML Engineer · open to work</div>
            <h1 className="hero-name">
              Hi, I'm <em>Swik</em> —<br />
              I make data make sense.
            </h1>
            <p className="hero-sub">
              I build the systems behind the insights. From messy pipelines to
              production ML models, I care about the craft and the clarity.
            </p>
            <div className="hero-actions">
              <button className="btn-warm" onClick={() => scrollTo("projects")}>See my work</button>
              <a href="/resume.pdf" className="btn-outline">Download CV</a>
            </div>
          </div>
          <div className="hero-blob">✦</div>
        </section>

        <div className="divider" />

        {/* ABOUT */}
        <section id="about" className="section">
          <FadeIn>
            <div className="eyebrow">About me</div>
            <h2 className="section-heading">The person behind the pipelines</h2>
          </FadeIn>
          <div className="about-grid">
            <FadeIn delay={100}>
              <p>
                I'm a Data & ML Engineer with a passion for turning complex,
                unstructured datasets into production-grade systems that actually
                work at scale.
              </p>
              <p>
                My background spans data engineering, machine learning, and
                backend development — I'm most at home designing end-to-end
                pipelines, training models, and shipping them as reliable APIs.
              </p>
              <p>
                When I'm not wrangling data, you'll find me exploring new
                tools, contributing to open source, or enjoying a good cup of
                tea.
              </p>
              <a href="mailto:you@email.com" className="btn-warm" style={{ display: "inline-block", marginTop: "1.5rem", textDecoration: "none" }}>
                Get in touch
              </a>
            </FadeIn>
            <div className="stats-grid">
              {[
                { value: "3+", label: "Years experience" },
                { value: "10+", label: "Projects shipped" },
                { value: "5+", label: "ML models deployed" },
                { value: "∞", label: "Coffee consumed" },
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

        {/* PROJECTS */}
        <section id="projects" className="section">
          <FadeIn>
            <div className="eyebrow">Featured work</div>
            <h2 className="section-heading">Projects I'm proud of</h2>
          </FadeIn>
          <div className="cards-grid">
            {PROJECTS.map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i} />
            ))}
          </div>
          <FadeIn>
            <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
              <a href="https://github.com/okayswik" target="_blank" rel="noreferrer" className="btn-outline">
                View all on GitHub
              </a>
            </div>
          </FadeIn>
        </section>

        <div className="divider" />

        {/* SKILLS */}
        <section id="skills" className="section">
          <FadeIn>
            <div className="eyebrow">Stack</div>
            <h2 className="section-heading">What I work with</h2>
          </FadeIn>
          <div className="skills-grid">
            {Object.entries(SKILLS).map(([cat, items], i) => (
              <FadeIn key={cat} delay={i * 80}>
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

        {/* CONTACT */}
        <section id="contact" className="section">
          <FadeIn>
            <div className="contact-box">
              <h2>Let's build something together.</h2>
              <p>Open to graduate roles/internships and interesting conversations.</p>
              <a href="mailto:you@email.com" className="btn-light">say hello →</a>
              <div className="social-links">
                <a href="https://github.com/okayswik" target="_blank" rel="noreferrer">GitHub</a>
                <a href="https://linkedin.com/in/swikritineupane" target="_blank" rel="noreferrer">LinkedIn</a>
                {/* <a href="/resume.pdf">Resume</a> */}
              </div>
            </div>
          </FadeIn>
        </section>

        <footer className="footer">
          <span>Designed & built by Swik</span>
          <span className="footer-sep">·</span>
          <a href="https://github.com/okayswik/okayswik.github.io" target="_blank" rel="noreferrer">Source</a>
        </footer>

      </div>
    </>
  );
}

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #faf7f2;
    --bg-card: #ffffff;
    --bg-dark: #2c2825;
    --accent: #c1440e;
    --accent-hover: #a33a0c;
    --accent-soft: #f5e0d8;
    --text: #2c2825;
    --text-muted: #7a6e65;
    --text-soft: #8a7e74;
    --border: #ede8e1;
    --cream: #c8a882;
    --font-serif: 'Lora', Georgia, serif;
    --font-sans: 'DM Sans', system-ui, sans-serif;
    --max-w: 900px;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-sans);
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
  }

  a { color: inherit; text-decoration: none; }
  p { color: var(--text-muted); margin-bottom: 1rem; line-height: 1.75; }

  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.25rem 2rem;
    transition: all 0.3s ease;
  }
  .nav--scrolled {
    background: rgba(250,247,242,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    padding: 0.9rem 2rem;
  }
  .logo {
    font-family: var(--font-serif); font-style: italic;
    font-size: 1.1rem; color: var(--text); cursor: pointer;
  }
  .nav-links { display: flex; align-items: center; gap: 0.25rem; }
  .nav-link {
    background: none; border: none; cursor: pointer;
    font-family: var(--font-sans); font-size: 0.825rem;
    color: var(--text-soft); padding: 0.4rem 0.75rem;
    border-radius: 100px; letter-spacing: 0.02em;
    transition: color 0.2s, background 0.2s;
  }
  .nav-link:hover { color: var(--text); background: rgba(0,0,0,0.04); }
  .nav-cta {
    margin-left: 0.5rem; background: var(--accent); color: #fff;
    border: none; border-radius: 100px; padding: 0.45rem 1.1rem;
    font-size: 0.8rem; font-family: var(--font-sans); cursor: pointer;
    transition: background 0.2s;
  }
  .nav-cta:hover { background: var(--accent-hover); }
  .burger {
    display: none; flex-direction: column; gap: 4px;
    background: none; border: none; cursor: pointer; padding: 4px;
  }
  .burger span { display: block; width: 22px; height: 1.5px; background: var(--text-soft); }

  @media (max-width: 640px) {
    .burger { display: flex; }
    .nav-links {
      display: none; position: fixed; inset: 0; top: 60px;
      background: var(--bg); flex-direction: column;
      justify-content: center; align-items: center; gap: 1rem;
    }
    .nav-links--open { display: flex; }
    .nav-link { font-size: 1.2rem; }
  }

  .hero {
    min-height: 100vh; display: flex; align-items: center;
    justify-content: space-between; gap: 3rem;
    padding: 7rem 2rem 4rem; max-width: var(--max-w); margin: 0 auto;
  }
  .hero-content { flex: 1; }
  .hero-pill {
    display: inline-block; background: var(--accent-soft); color: var(--accent);
    font-size: 0.75rem; border-radius: 100px;
    padding: 0.3rem 0.9rem; margin-bottom: 1.25rem; letter-spacing: 0.05em;
  }
  .hero-name {
    font-family: var(--font-serif);
    font-size: clamp(2.2rem, 5vw, 3.2rem);
    font-weight: 600; line-height: 1.15;
    color: var(--text); margin-bottom: 1.25rem;
  }
  .hero-name em { font-style: italic; color: var(--accent); }
  .hero-sub { font-size: 1rem; color: var(--text-muted); max-width: 440px; margin-bottom: 2rem; }
  .hero-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }
  .hero-blob {
    width: 180px; height: 180px; flex-shrink: 0;
    background: #f0e6d3; border-radius: 60% 40% 55% 45%/45% 55% 40% 60%;
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-serif); font-size: 3rem; color: var(--cream);
    animation: blob 6s ease-in-out infinite;
  }
  @keyframes blob {
    0%,100% { border-radius: 60% 40% 55% 45%/45% 55% 40% 60%; }
    33% { border-radius: 45% 55% 40% 60%/60% 40% 55% 45%; }
    66% { border-radius: 55% 45% 60% 40%/40% 60% 45% 55%; }
  }
  @media (max-width: 600px) { .hero-blob { display: none; } }

  .btn-warm {
    background: var(--accent); color: #fff; border: none;
    border-radius: 100px; padding: 0.65rem 1.5rem; font-size: 0.875rem;
    font-family: var(--font-sans); cursor: pointer;
    transition: background 0.2s, transform 0.15s;
    display: inline-flex; align-items: center;
  }
  .btn-warm:hover { background: var(--accent-hover); transform: translateY(-1px); }
  .btn-outline {
    background: transparent; color: var(--text);
    border: 1.5px solid var(--border); border-radius: 100px;
    padding: 0.6rem 1.4rem; font-size: 0.875rem;
    font-family: var(--font-sans); cursor: pointer;
    transition: border-color 0.2s, color 0.2s;
    display: inline-flex; align-items: center;
  }
  .btn-outline:hover { border-color: var(--accent); color: var(--accent); }

  .divider { height: 1px; background: var(--border); max-width: var(--max-w); margin: 0 auto; }

  .section { padding: 5rem 2rem; max-width: var(--max-w); margin: 0 auto; }
  .eyebrow {
    font-size: 0.72rem; letter-spacing: 0.1em;
    color: var(--cream); text-transform: uppercase; margin-bottom: 0.6rem;
  }
  .section-heading {
    font-family: var(--font-serif);
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    font-weight: 600; color: var(--text);
    margin-bottom: 2.5rem; line-height: 1.2;
  }

  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: start; }
  @media (max-width: 680px) { .about-grid { grid-template-columns: 1fr; } }
  .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .stat-card {
    background: var(--bg-card); border: 1px solid var(--border);
    border-radius: 20px; padding: 1.25rem;
    display: flex; flex-direction: column; gap: 0.3rem;
  }
  .stat-value { font-family: var(--font-serif); font-size: 2rem; font-weight: 600; color: var(--accent); }
  .stat-label { font-size: 0.8rem; color: var(--text-soft); }

  .cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1rem; }
  .card {
    background: var(--bg-card); border: 1px solid var(--border);
    border-radius: 20px; padding: 1.5rem;
    display: flex; flex-direction: column; gap: 0.6rem;
    transition: border-color 0.2s, transform 0.2s;
  }
  .card:hover { border-color: var(--accent); transform: translateY(-2px); }
  .card-num { font-family: var(--font-serif); font-size: 1.5rem; color: #e8d5c4; }
  .card-title { font-size: 0.95rem; font-weight: 500; color: var(--text); }
  .card-desc { font-size: 0.825rem; color: var(--text-soft); line-height: 1.6; flex: 1; margin: 0; }
  .card-tags { display: flex; flex-wrap: wrap; gap: 0.3rem; margin-top: 0.25rem; }
  .card-links { display: flex; gap: 1rem; margin-top: 0.5rem; }
  .card-link { font-size: 0.8rem; color: var(--accent); transition: opacity 0.2s; }
  .card-link:hover { opacity: 0.7; }

  .tag {
    display: inline-block; background: #f5f0ea; color: var(--text-muted);
    font-size: 0.7rem; border-radius: 100px; padding: 0.25rem 0.7rem;
  }

  .skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 1.25rem; }
  .skill-group {
    background: var(--bg-card); border: 1px solid var(--border);
    border-radius: 16px; padding: 1.25rem;
  }
  .skill-cat {
    font-size: 0.72rem; letter-spacing: 0.08em;
    color: var(--accent); text-transform: uppercase; margin-bottom: 0.75rem;
  }
  .skill-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }

  .contact-box {
    background: var(--bg-dark); border-radius: 24px;
    padding: 4rem 2rem; text-align: center;
  }
  .contact-box h2 {
    font-family: var(--font-serif); font-size: clamp(1.5rem, 3vw, 2rem);
    color: #faf7f2; margin-bottom: 0.75rem;
  }
  .contact-box p { color: #a89e95; font-size: 0.95rem; margin-bottom: 2rem; }
  .btn-light {
    background: var(--accent); color: #fff; border: none;
    border-radius: 100px; padding: 0.75rem 2rem; font-size: 0.9rem;
    font-family: var(--font-sans); cursor: pointer;
    display: inline-block; margin-bottom: 1.75rem; transition: background 0.2s;
  }
  .btn-light:hover { background: var(--accent-hover); }
  .social-links { display: flex; justify-content: center; gap: 1.5rem; }
  .social-links a { color: #6b5f57; font-size: 0.825rem; transition: color 0.2s; }
  .social-links a:hover { color: #faf7f2; }

  .footer {
    border-top: 1px solid var(--border); padding: 1.5rem 2rem;
    display: flex; align-items: center; justify-content: center;
    gap: 0.75rem; font-size: 0.8rem; color: var(--text-soft);
  }
  .footer a:hover { color: var(--accent); }
  .footer-sep { color: var(--border); }
`;
