type Project = {
  title: string;
  description: string;
  longDesc: string;
  tags: string[];
  github: string;
  live: string;
  emoji: string;
  featured?: boolean;
};

const PROJECTS: Project[] = [
  {
    title: 'DevFlow — Project Management SaaS',
    description: 'A full-featured project management platform with real-time collaboration, Kanban boards, sprint planning, and team analytics.',
    longDesc: 'Built with React, Node.js, Socket.io, and MongoDB. Features JWT auth, role-based access control, and a drag-and-drop interface.',
    tags: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'TypeScript', 'Redis'],
    github: 'https://github.com/jubayerabir/devflow',
    live: 'https://devflow-demo.vercel.app',
    emoji: '🚀',
    featured: true,
  },
  {
    title: 'ShopNest — E-Commerce Platform',
    description: 'A complete e-commerce solution with product catalog, cart, Stripe payments, order tracking, and an admin dashboard.',
    longDesc: 'Next.js 14 App Router, Prisma ORM, PostgreSQL, Stripe webhooks, and full-text search with Algolia.',
    tags: ['Next.js', 'PostgreSQL', 'Prisma', 'Stripe', 'Tailwind', 'Algolia'],
    github: 'https://github.com/jubayerabir/shopnest',
    live: 'https://shopnest-store.vercel.app',
    emoji: '🛒',
    featured: true,
  },
  {
    title: 'AiCraft — AI Content Generator',
    description: 'An AI-powered writing assistant that generates blog posts, code snippets, and marketing copy using OpenAI GPT-4.',
    longDesc: 'React frontend, Express backend, OpenAI API integration, streaming responses, and user subscription management.',
    tags: ['React', 'OpenAI API', 'Express', 'Streaming', 'Supabase'],
    github: 'https://github.com/jubayerabir/aicraft',
    live: 'https://aicraft-app.vercel.app',
    emoji: '🤖',
  },
  {
    title: 'TrackerX — Personal Finance Dashboard',
    description: 'A real-time personal finance tracker with expense categorization, budget goals, charts, and CSV export.',
    longDesc: 'Built with React, Chart.js, Node.js/Express, and MongoDB. Includes dark/light mode and mobile-first design.',
    tags: ['React', 'Chart.js', 'Node.js', 'MongoDB', 'JWT', 'CSV Export'],
    github: 'https://github.com/jubayerabir/trackerx',
    live: 'https://trackerx-finance.vercel.app',
    emoji: '📊',
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <div
      className={`project-card animate-on-scroll ${project.featured ? 'project-card--featured' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {project.featured && (
        <div className="project-card__featured-badge">⭐ Featured</div>
      )}
      <div className="project-card__emoji">{project.emoji}</div>
      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__desc">{project.description}</p>
      <p className="project-card__long-desc">{project.longDesc}</p>

      <div className="project-card__tags">
        {project.tags.map(tag => (
          <span key={tag} className="project-tag">{tag}</span>
        ))}
      </div>

      <div className="project-card__actions">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="project-btn project-btn--github"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          GitHub
        </a>
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="project-btn project-btn--live"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M7 2H3a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V9M10 2h4m0 0v4m0-4L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Live Demo
        </a>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="projects section">
      <div className="container">
        <div className="section__header animate-on-scroll">
          <span className="section__tag">My Work</span>
          <h2 className="section__title">Featured Projects</h2>
          <div className="section__line" />
          <p className="section__subtitle">
            A selection of my recent work — each project is built with a focus on performance, scalability, and great UX.
          </p>
        </div>

        <div className="projects__grid">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        <div className="projects__cta animate-on-scroll">
          <p>Want to see more?</p>
          <a
            href="https://github.com/jubayerabir"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--outline"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            View All on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
