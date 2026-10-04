import React from 'react';

interface SectionBadgeProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * SectionBadge Component
 * 
 * A pill-shaped badge component used to label sections with uppercase text.
 * Commonly appears above section headings with labels like "WHO WE ARE", "THE HEART OF IEEE", etc.
 * 
 * Design: Purple background with purple border, uppercase text
 */
export const SectionBadge: React.FC<SectionBadgeProps> = ({ children, className = '' }) => {
  return (
    <div 
      className={`inline-flex items-center justify-center px-5 py-2 bg-[#EFE7F6] text-[#5A10A5] border border-[#CCB5E3]/80 rounded-full text-xs font-semibold tracking-wide shadow-sm uppercase ${className}`}
    >
      {children}
    </div>
  );
};

export default SectionBadge;
