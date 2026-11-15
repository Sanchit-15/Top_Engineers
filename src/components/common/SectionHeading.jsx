import React from 'react';

/**
 * Reusable SectionHeading component matching the dark cinematic reference design.
 * Features an electric blue uppercase eyebrow, tight bold heading, and clean subtext.
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  light = false,
  className = '',
}) {
  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center mx-auto items-center',
    right: 'text-right items-end',
  };

  return (
    <div className={`flex flex-col max-w-3xl mb-10 ${alignClasses[align]} ${className}`}>
      {eyebrow && (
        <span className="text-blue-500 text-xs sm:text-sm font-bold uppercase tracking-widest mb-2.5">
          {eyebrow}
        </span>
      )}

      <h2
        className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight ${
          light ? 'text-[#050B16]' : 'text-white'
        }`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mt-3 text-sm sm:text-base leading-relaxed ${
            light ? 'text-slate-600' : 'text-slate-400'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
