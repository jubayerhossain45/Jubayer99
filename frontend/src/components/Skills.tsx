import { useEffect, useRef, useState } from 'react';

type Skill = { name: string; icon: string; level: number };
type Category = { title: string; icon: string; skills: Skill[] };

const SKILL_CATEGORIES: Category[] = [
  {
    title: 'Frontend',
    icon: '🖥️',
    skills: [
      { name: 'React / Next.js', icon: '⚛️', level: 95 },
      { name: 'TypeScript', icon: '🔷', level: 90 },
      { name: 'HTML5 & CSS3', icon: '🎨', level: 98 },
      { name: 'Tailwind CSS', icon: '💨', level: 92 },
      { name: 'JavaScript (ES2024)', icon: '🟨', level: 93 },
      { name: 'Redux / Zustand', icon: '🔄', level: 82 },
    ],
  },
  {
    title: 'Backend',
    icon: '⚙️',
    skills: [
      { name: 'Node.js', icon: '🟢', level: 90 },
      { name: 'Express.js', icon: '🚂', level: 92 },
      { name: 'MongoDB / Mongoose', icon: '🍃', level: 88 },
      { name: 'PostgreSQL', icon: '🐘', level: 80 },
      { name: 'REST APIs', icon: '🔗', level: 95 },
      { name: 'GraphQL', icon: '◈', level: 72 },
    ],
  },
  {
    title: 'Tools & DevOps',
    icon: '🛠️',
    skills: [
      { name: 'Git & GitHub', icon: '🐙', level: 95 },
      { name: 'Docker', icon: '🐳', level: 78 },
      { name: 'AWS / Vercel', icon: '☁️', level: 75 },
      { name: 'Jest & Testing', icon: '🧪', level: 82 },
      { name: 'Linux / Bash', icon: '🐧', level: 80 },
      { name: 'Figma', icon: '🎭', level: 70 },
    ],
  },
];

function SkillBar({ skill, animate }: { skill: Skill; animate: boolean }) {
  return (
    <div className="skill-bar">
      <div className="skill-bar__header">
        <span className="skill-bar__name">
          <span className="skill-bar__icon">{skill.icon}</span>
          {skill.name}
        </span>
        <span className="skill-bar__level">{skill.level}%</span>
      </div>
      <div className="skill-bar__track">
        <div
          className="skill-bar__fill"
          style={{ width: animate ? `${skill.level}%` : '0%' }}
        />
      </div>
    </div>
  );
}

function CategoryCard({ cat }: { cat: Category }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={cardRef} className="skill-card animate-on-scroll">
      <div className="skill-card__header">
        <span className="skill-card__cat-icon">{cat.icon}</span>
        <h3 className="skill-card__title">{cat.title}</h3>
      </div>
      <div className="skill-card__bars">
        {cat.skills.map(skill => (
          <SkillBar key={skill.name} skill={skill} animate={visible} />
        ))}
      </div>
    </div>
  );
}

const TECH_TAGS = [
  'React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL',
  'Docker', 'AWS', 'Tailwind', 'GraphQL', 'Redis', 'Prisma',
  'Next.js', 'Jest', 'Git', 'Linux', 'REST APIs', 'Figma',
  'Python', 'CI/CD', 'WebSockets', 'JWT Auth',
];

export default function Skills() {
  return (
    <section id="skills" className="skills section">
      <div className="container">
        <div className="section__header animate-on-scroll">
          <span className="section__tag">My Expertise</span>
          <h2 className="section__title">Skills & Technologies</h2>
          <div className="section__line" />
        </div>

        <div className="skills__grid">
          {SKILL_CATEGORIES.map(cat => (
            <CategoryCard key={cat.title} cat={cat} />
          ))}
        </div>

        <div className="skills__tags-section animate-on-scroll">
          <h3 className="skills__tags-title">Also familiar with</h3>
          <div className="skills__tags">
            {TECH_TAGS.map(tag => (
              <span key={tag} className="tech-tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
