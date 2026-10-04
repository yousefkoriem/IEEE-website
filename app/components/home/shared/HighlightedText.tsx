import React from 'react';

interface HighlightedTextProps {
  text: string;
  highlightWords?: string[];
  highlightColor?: 'blue' | 'purple';
  className?: string;
}

/**
 * HighlightedText Component
 * 
 * Automatically highlights specified keywords in text with colored accents.
 * Used in headings to emphasize key words like "IEEE", "Student Branch", "Tomorrow", etc.
 * 
 * Design System Colors:
 * - Blue: #4460EF (used for primary highlights)
 * - Purple: #5A10A5 (used for secondary highlights)
 * 
 * @param text - The full text to display
 * @param highlightWords - Array of words to highlight (case-insensitive matching)
 * @param highlightColor - Color scheme to use for highlights
 */
export const HighlightedText: React.FC<HighlightedTextProps> = ({ 
  text, 
  highlightWords = [], 
  highlightColor = 'blue',
  className = ''
}) => {
  const colorClass = highlightColor === 'blue' ? 'text-[#4460EF]' : 'text-[#5A10A5]';
  
  if (!highlightWords.length) {
    return <span className={className}>{text}</span>;
  }

  // Create regex pattern for matching (case-insensitive, whole words)
  const pattern = new RegExp(`\\b(${highlightWords.join('|')})\\b`, 'gi');
  const parts = text.split(pattern);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        const isHighlighted = highlightWords.some(
          word => word.toLowerCase() === part.toLowerCase()
        );
        
        return isHighlighted ? (
          <span key={index} className={colorClass}>
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        );
      })}
    </span>
  );
};

export default HighlightedText;
