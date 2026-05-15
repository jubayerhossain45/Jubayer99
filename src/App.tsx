import { useEffect, useRef, useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Toast from './components/Toast';

export type ToastType = {
  message: string;
  type: 'success' | 'error';
  id: number;
};

export default function App() {
  const [toasts, setToasts] = useState<ToastType[]>([]);
  const toastId = useRef(0);

  const showToast = useCallback((message: string, type: 'success' | 'error') => {
    const id = ++toastId.current;
    setToasts(prev => [...prev, { message, type, id }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll('.animate-on-scroll');

    // সাথে সাথে visible করে দাও — JS late load হলেও যেন hidden না থাকে
    els.forEach(el => el.classList.add('is-visible'));

    // তারপর observer দিয়ে animation চালাও
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    els.forEach(el => {
      el.classList.remove('is-visible'); // আবার hide করো animation এর জন্য
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="app-root">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact showToast={showToast} />
      </main>
      <Footer />
      <BackToTop />
      <div className="toast-container">
        {toasts.map(toast => (
          <Toast key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </div>
  );
}