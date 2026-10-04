/**
 * Shared Components and Utilities for Landing Page
 * 
 * This module exports reusable components, animations, and utilities
 * used across all landing page sections for consistency.
 * 
 * Design System:
 * - Primary Navy: #000640
 * - Primary Purple: #5A10A5
 * - Primary Blue: #4460EF
 * - Light Purple: #CCB5E3
 * - Background Purple: #EFE7F6
 */

// Components
export { SectionBadge } from './SectionBadge';
export { SectionHeading } from './SectionHeading';
export { HighlightedText } from './HighlightedText';
export { DecorativeStar, StarSparkle } from './DecorativeStar';

// Animations
export {
  fadeIn,
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  scaleInBounce,
  staggerContainer,
  staggerContainerFast,
  staggerContainerSlow,
  cardReveal,
  cardHover,
  cardTap,
  sectionReveal,
  slideLeft,
  slideRight,
  createStagger,
  defaultViewport,
  shouldReduceMotion
} from './animations';

// Type exports
export type { Variants } from './animations';
