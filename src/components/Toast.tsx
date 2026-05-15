import { useEffect, useState } from 'react';
import type { ToastType } from '../App';

type ToastProps = {
  toast: ToastType;
  onRemove: (id: number) => void;
};

export default function Toast({ toast, onRemove }: ToastProps) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setExiting(true), 3800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`toast toast--${toast.type} ${exiting ? 'toast--exit' : 'toast--enter'}`}
      onClick={() => { setExiting(true); setTimeout(() => onRemove(toast.id), 300); }}
    >
      <span className="toast__message">{toast.message}</span>
      <button className="toast__close" aria-label="Dismiss">×</button>
    </div>
  );
}
