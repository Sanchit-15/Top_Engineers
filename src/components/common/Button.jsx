import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Reusable Button component matching the cinematic dark industrial design.
 * Solid electric blue primary, subtle outlined secondary, small radius (4-6px).
 */
export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  icon: Icon,
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-[4px] tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#050B16] disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow focus:ring-blue-500',
    secondary:
      'border border-white/25 hover:border-white/60 text-white hover:bg-white/10 focus:ring-slate-400',
    outline:
      'border border-white/20 hover:border-blue-500 text-white hover:bg-blue-500/10 focus:ring-blue-500',
    outlineDark:
      'border border-slate-300 hover:border-slate-800 text-slate-900 hover:bg-slate-100 focus:ring-slate-400',
    ghost:
      'text-slate-300 hover:text-white hover:bg-white/5 focus:ring-slate-400',
    blueGhost:
      'text-blue-400 hover:text-blue-300 hover:bg-blue-600/10 focus:ring-blue-500',
  };

  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedStyles}>
        <span>{children}</span>
        {Icon && <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" />}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedStyles} target="_blank" rel="noopener noreferrer">
        <span>{children}</span>
        {Icon && <Icon className="w-4 h-4 shrink-0" />}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedStyles}
    >
      <span>{children}</span>
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
}
