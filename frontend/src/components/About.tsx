export default function About() {
  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="section__header animate-on-scroll">
          <span className="section__tag">About Me</span>
          <h2 className="section__title">Who I Am</h2>
          <div className="section__line" />
        </div>

        <div className="about__grid">
          <div className="about__image-col animate-on-scroll">
            <div className="about__img-wrapper">
              <div className="about__img-glow" />
              <img
                src="/images/profile.jpg"
                alt="Jubayer Abir — Full Stack Developer"
                className="about__img"
              />
              <div className="about__img-badge">
                <span className="badge__number">3+</span>
                <span className="badge__text">Years of<br/>Experience</span>
              </div>
            </div>

            <div className="about__stats">
              <div className="stat-card">
                <span className="stat-card__num">50+</span>
                <span className="stat-card__label">Projects Done</span>
              </div>
              <div className="stat-card">
                <span className="stat-card__num">30+</span>
                <span className="stat-card__label">Happy Clients</span>
              </div>
              <div className="stat-card">
                <span className="stat-card__num">99%</span>
                <span className="stat-card__label">Satisfaction</span>
              </div>
            </div>
          </div>

          <div className="about__content animate-on-scroll">
            <h3 className="about__subtitle">
              Full Stack Developer &amp; Creative Problem Solver
            </h3>
            <p className="about__para">
              I'm <strong>Jubayer Abir</strong>, a passionate Full Stack Developer based in Dhaka, Bangladesh.
              With over 3 years of hands-on experience, I specialize in building end-to-end web applications
              that are not only visually stunning but also performant and scalable.
            </p>
            <p className="about__para">
              My journey started with a fascination for how the web works — from the pixel-level details of
              CSS animations to the architecture of distributed backend systems. Today, I work across the
              entire stack using <strong>React, TypeScript, Node.js, Express,</strong> and <strong>MongoDB</strong>,
              always aiming to deliver clean, maintainable, and production-ready code.
            </p>
            <p className="about__para">
              When I'm not coding, you'll find me contributing to open-source projects, writing technical
              articles, or exploring the latest trends in AI and cloud infrastructure. I believe great
              software is built at the intersection of technical excellence and thoughtful design.
            </p>

            <div className="about__highlights">
              <div className="highlight-item">
                <span className="highlight-item__icon">🎯</span>
                <div>
                  <strong>Available for Freelance</strong>
                  <p>Open to new opportunities</p>
                </div>
              </div>
              <div className="highlight-item">
                <span className="highlight-item__icon">📍</span>
                <div>
                  <strong>Dhaka, Bangladesh</strong>
                  <p>Remote-friendly worldwide</p>
                </div>
              </div>
              <div className="highlight-item">
                <span className="highlight-item__icon">🎓</span>
                <div>
                  <strong>B.Sc. in Computer Science</strong>
                  <p>Graduated with Distinction</p>
                </div>
              </div>
              <div className="highlight-item">
                <span className="highlight-item__icon">💬</span>
                <div>
                  <strong>Languages</strong>
                  <p>English, Bengali</p>
                </div>
              </div>
            </div>

            <div className="about__actions">
              <a
                href="/cv-jubayer-abir.pdf"
                className="btn btn--primary"
                download
                onClick={e => e.preventDefault()}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2v8M4 7l4 4 4-4M2 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Download CV
              </a>
              <a
                href="https://github.com/jubayerabir"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--ghost"
              >
                View GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
