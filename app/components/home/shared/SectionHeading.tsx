import React from 'react';
import { HighlightedText } from './HighlightedText';

interface SectionHeadingProps {
  children: React.ReactNode;
  highlightWords?: string[];
  highlightColor?: 'blue' | 'purple';
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}

/**
 * SectionHeading Component
 * 
 * Standardized heading component with automatic keyword highlighting.
 * Provides consistent typography and spacing across all landing page sections.
 * 
 * Typography:
 * - Font size: 4xl to 5xl (responsive)
 * - Font weight: Extrabold
 * - Color: Navy (#000640) with blue/purple highlights
 * - Line height: Tight
 * 
 * Usage:
 * <SectionHeading highlightWords={['IEEE', 'Student Branch']}>
 *   IEEE Student Branch
 * </SectionHeading>
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({ 
  children, 
  highlightWords = [],
  highlightColor = 'purple',
  className = '',
  as: Component = 'h2'
}) => {
  const baseClasses = 'text-4xl md:text-5xl lg:text-[50px] font-extrabold text-[#000640] leading-tight';
  const combinedClasses = `${baseClasses} ${className}`;

  const content = typeof children === 'string' ? (
    <HighlightedText 
      text={children} 
      highlightWords={highlightWords}
      highlightColor={highlightColor}
    />
  ) : (
    children
  );

  return (
    <Component className={combinedClasses}>
      {content}
    </Component>
  );
};

export default SectionHeading;
