import { useRef, useState, useCallback } from 'react';
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