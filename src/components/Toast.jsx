import React from 'react';
import { CheckCircle, AlertTriangle, Sparkles, Info } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        background: '#1e293b',
        border: '1px solid rgba(16, 185, 129, 0.5)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
        borderRadius: '12px',
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        zIndex: 2000,
        color: '#fff',
        animation: 'fadeIn 0.3s ease-out'
      }}
    >
      <Sparkles size={20} color="#f59e0b" />
      <div>
        <div style={{ fontWeight: '700', fontSize: '14px' }}>{toast.title}</div>
        <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{toast.message}</div>
      </div>
      <button 
        onClick={onClose} 
        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginLeft: '12px' }}
      >
        ✕
      </button>
    </div>
  );
}
