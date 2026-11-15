import React from 'react';

/**
 * Reusable Badge component for industrial tags, status indicators, and verification badges.
 */
export default function Badge({ children, variant = 'blue', className = '' }) {
  const variantStyles = {
    blue: 'bg-blue-600/15 text-blue-400 border-blue-500/30',
    blueSolid: 'bg-blue-600 text-white border-transparent',
    dark: 'bg-[#0B192C] text-slate-300 border-slate-700/60',
    draft: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    verified: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    neutral: 'bg-slate-800 text-slate-300 border-slate-700',
  };

  const selectedStyle = variantStyles[variant] || variantStyles.blue;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[4px] text-[11px] font-bold uppercase tracking-wider border ${selectedStyle} ${className}`}
    >
      {children}
    </span>
  );
}
