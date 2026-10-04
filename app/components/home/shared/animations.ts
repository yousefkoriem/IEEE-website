/**
 * Animation Variants for Landing Page Components
 * 
 * Type definition for Framer Motion variants
 * 
 * Standardized Framer Motion animation variants used across all sections.
 * Provides consistent animation behavior and timing throughout the landing page.
 * 
 * Design System Animation Principles:
 * - Duration: 0.6s - 1.0s for most animations
 * - Easing: ease-out for entrances, ease-in for exits
 * - Stagger: 0.15s - 0.2s between child elements
 * - Distance: 20-40px for slide animations
 */

// Type for animation variants
export type Variants = {
  [key: string]: any;
};

// ─────────────────────────────────────────────────────
// FADE ANIMATIONS
// ─────────────────────────────────────────────────────

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' }
  }
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' }
  }
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: 'easeOut' }
  }
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: 'easeOut' }
  }
};

// ─────────────────────────────────────────────────────
// SCALE ANIMATIONS
// ─────────────────────────────────────────────────────

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

export const scaleInBounce: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: [0.34, 1.56, 0.64, 1],
      opacity: { duration: 0.4 }
    }
  }
};

// ─────────────────────────────────────────────────────
// STAGGER ANIMATIONS (Parent Containers)
// ─────────────────────────────────────────────────────

export const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2
    }
  }
};

// ─────────────────────────────────────────────────────
// CARD ANIMATIONS (For grid layouts)
// ─────────────────────────────────────────────────────

export const cardReveal: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

export const cardHover = {
  scale: 1.03,
  transition: { duration: 0.3, ease: 'easeOut' }
};

export const cardTap = {
  scale: 0.98,
  transition: { duration: 0.1 }
};

// ─────────────────────────────────────────────────────
// SECTION REVEAL (Full section entrance)
// ─────────────────────────────────────────────────────

export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 1.0, 
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// ─────────────────────────────────────────────────────
// SLIDE ANIMATIONS (For carousels/sliders)
// ─────────────────────────────────────────────────────

export const slideLeft: Variants = {
  enter: { x: 100, opacity: 0 },
  center: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  },
  exit: { 
    x: -100, 
    opacity: 0,
    transition: { duration: 0.5, ease: 'easeIn' }
  }
};

export const slideRight: Variants = {
  enter: { x: -100, opacity: 0 },
  center: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  },
  exit: { 
    x: 100, 
    opacity: 0,
    transition: { duration: 0.5, ease: 'easeIn' }
  }
};

// ─────────────────────────────────────────────────────
// UTILITY FUNCTIONS
// ─────────────────────────────────────────────────────

/**
 * Create a custom stagger delay for child animations
 */
export const createStagger = (staggerDelay: number = 0.15) => ({
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
    }
  }
});

/**
 * Viewport animation trigger options
 * Use with motion components: viewport={defaultViewport}
 */
export const defaultViewport = {
  once: true,
  margin: '-100px',
  amount: 0.3
};

/**
 * Reduced motion check
 * Respects user's prefers-reduced-motion preference
 */
export const shouldReduceMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
