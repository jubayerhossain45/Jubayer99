import { useState, FormEvent } from 'react';

type ContactProps = {
  showToast: (message: string, type: 'success' | 'error') => void;
};

const SOCIAL_LINKS = [
  {
    name: 'Email',
    icon: '✉️',
    label: 'jubayer123abir@gmail.com',
    href: 'mailto:jubayer123abir@gmail.com',
  },
  {
    name: 'LinkedIn',
    icon: '💼',
    label: 'linkedin.com/in/jubayerabir',
    href: 'https://linkedin.com/in/jubayerabir',
  },
  {
    name: 'GitHub',
    icon: '🐙',
    label: 'github.com/jubayerabir',
    href: 'https://github.com/jubayerabir',
  },
  {
    name: 'Twitter / X',
    icon: '🐦',
    label: '@jubayerabir',
    href: 'https://twitter.com/jubayerabir',
  },
];

export default function Contact({ showToast }: ContactProps) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://jubayer99.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        showToast("✅ Message sent! I'll reply soon.", 'success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        showToast('❌ ' + (data.message || 'Something went wrong.'), 'error');
      }
    } catch {
      showToast('❌ Network error. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <div className="section__header animate-on-scroll">
          <span className="section__tag">Get In Touch</span>
          <h2 className="section__title">Let's Work Together</h2>
          <div className="section__line" />
          <p className="section__subtitle">
            Have a project in mind? I'd love to hear about it. Drop me a message and I'll get back to you within 24–48 hours.
          </p>
        </div>

        <div className="contact__grid">
          {/* Left: Info */}
          <div className="contact__info animate-on-scroll">
            <h3 className="contact__info-title">Contact Information</h3>
            <p className="contact__info-desc">
              I'm currently available for freelance projects and full-time opportunities.
              Whether you have a question, a project idea, or just want to say hello — my inbox is always open.
            </p>

            <div className="contact__socials">
              {SOCIAL_LINKS.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <span className="social-link__icon">{link.icon}</span>
                  <div className="social-link__text">
                    <span className="social-link__name">{link.name}</span>
                    <span className="social-link__label">{link.label}</span>
                  </div>
                  <svg className="social-link__arrow" width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              ))}
            </div>

            <div className="contact__availability">
              <div className="availability-dot" />
              <span>Currently available for new projects</span>
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact__form-wrapper animate-on-scroll">
            <form id="contactForm" className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="form-input"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-input"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">Subject *</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  className="form-input"
                  placeholder="Project Inquiry / Collaboration / General"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-input form-textarea"
                  placeholder="Tell me about your project, timeline, budget, and any specific requirements..."
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <button
                id="submitBtn"
                type="submit"
                className={`btn btn--primary btn--full ${loading ? 'btn--loading' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 8l12-6-6 12-1.5-5.5L2 8z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </button>

              <p className="form-note">
                🔒 Your information is secure and will never be shared with third parties.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
