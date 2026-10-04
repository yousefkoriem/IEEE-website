import React from 'react';

interface DecorativeStarProps {
  className?: string;
  size?: number;
}

/**
 * DecorativeStar Component
 * 
 * A 4-point star sparkle SVG used as decorative elements throughout the landing page.
 * Commonly placed in section backgrounds with purple tinting and subtle animations.
 * 
 * Design: Purple color (#CCB5E3) with opacity and optional pulse animation
 */
export const DecorativeStar: React.FC<DecorativeStarProps> = ({ 
  className = '', 
  size = 24 
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`text-[#CCB5E3] opacity-70 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
    </svg>
  );
};

/**
 * StarSparkle Component (Legacy wrapper for compatibility)
 * 
 * Positioned absolutely with animation classes included.
 */
export const StarSparkle: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`absolute pointer-events-none text-[#CCB5E3] opacity-70 animate-pulse ${className}`}
  >
    <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
  </svg>
);

export default DecorativeStar;
