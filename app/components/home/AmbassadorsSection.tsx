import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Linkedin, Mail } from 'lucide-react';
import { SectionBadge, SectionHeading } from './shared';
import { staggerContainer, cardReveal, defaultViewport } from './shared/animations';

// Import IEEE logo or placeholder
import IEEELogo from '../../assets/IEEE.png';

// Import placeholder ambassador image
import placeholderImage from '../../assets/images/highBoard/chairman.jpeg';

/**
 * AmbassadorsSection Component
 * 
 * "From Beni-Suef to Region 8" section featuring:
 * - AMBASSADORS badge
 * - Main heading with highlighted text
 * - Decorative map showing connection line
 * - Ambassador cards carousel (4 visible at once)
 * - Prev/Next navigation arrows
 * - Pagination dots
 * 
 * Design: Blue gradient background, professional cards
 * Note: Using placeholder data (same person) as shown in design
 */

interface Ambassador {
  id: number;
  name: string;
  title: string;
  image: string;
  linkedin?: string;
  email?: string;
}

// Placeholder ambassador data (duplicated as per design mockup)
const AMBASSADORS: Ambassador[] = [
  {
    id: 1,
    name: '[ Ambassador Name ]',
    title: 'IEEE SAC Ambassador',
    image: placeholderImage
  },
  {
    id: 2,
    name: '[ Ambassador Name ]',
    title: 'IEEE SAC Ambassador',
    image: placeholderImage
  },
  {
    id: 3,
    name: '[ Ambassador Name ]',
    title: 'IEEE SAC Ambassador',
    image: placeholderImage
  },
  {
    id: 4,
    name: '[ Ambassador Name ]',
    title: 'IEEE SAC Ambassador',
    image: placeholderImage
  },
  {
    id: 5,
    name: '[ Ambassador Name ]',
    title: 'IEEE SAC Ambassador',
    image: placeholderImage
  },
  {
    id: 6,
    name: '[ Ambassador Name ]',
    title: 'IEEE SAC Ambassador',
    image: placeholderImage
  }
];

export const AmbassadorsSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const cardsPerView = 4;
  const maxSlide = Math.max(0, Math.ceil(AMBASSADORS.length / cardsPerView) - 1);

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const visibleAmbassadors = AMBASSADORS.slice(
    currentSlide * cardsPerView,
    (currentSlide + 1) * cardsPerView
  );

  return (
    <section className="relative w-full bg-gradient-to-br from-[#1e3a8a] via-[#2563eb] to-[#3b82f6] py-16 md:py-24 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-white rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center justify-center px-5 py-2 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-full text-xs font-semibold tracking-wide uppercase">
            AMBASSADORS
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-6"
        >
          <h2 className="text-4xl md:text-5xl lg:text-[50px] font-extrabold text-white leading-tight">
            From Beni-Suef{' '}
            <span className="text-blue-200">to Region 8</span>
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-blue-100 text-base md:text-lg max-w-2xl mx-auto mb-12"
        >
          Our students don't just participate — they represent.
        </motion.p>

        {/* Decorative map visual with curved line */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={defaultViewport}
          transition={{ duration: 0.8 }}
          className="mb-12 bg-[#0a2463]/40 backdrop-blur-md rounded-3xl p-8 border border-white/10"
        >
          <p className="text-center text-white/60 text-xs uppercase tracking-wider mb-6">
            OUR AMBASSADORS
          </p>
          <div className="relative max-w-4xl mx-auto h-40">
            {/* SVG curved line */}
            <svg
              viewBox="0 0 800 200"
              className="w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Curved path */}
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#a78bfa" stopOpacity="1" />
                  <stop offset="100%" stopColor="#818cf8" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              
              {/* Main curved line - starts low (y=170), ends high (y=80) */}
              <motion.path
                d="M 100 170 Q 400 40, 700 80"
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              
              {/* Animated dot moving along the curve */}
              <motion.circle
                r="6"
                fill="#ffffff"
                initial={{ offsetDistance: "0%", opacity: 0 }}
                animate={{ 
                  offsetDistance: "100%",
                  opacity: [0, 1, 1, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  offsetPath: "path('M 100 170 Q 400 40, 700 80')",
                  offsetRotate: "0deg"
                }}
              />
            </svg>

            {/* Location markers */}
            <div className="absolute left-[8%] bottom-2 flex flex-col items-center">
              <div className="w-3 h-3 bg-[#818cf8] rounded-full ring-4 ring-[#818cf8]/30" />
              <p className="text-white font-bold text-sm mt-2 whitespace-nowrap">Beni-Suef, Egypt</p>
            </div>

            <div className="absolute right-[8%] top-8 flex flex-col items-center">
              <div className="w-3 h-3 bg-[#818cf8] rounded-full ring-4 ring-[#818cf8]/30" />
              <p className="text-white font-bold text-sm mt-2 text-center whitespace-nowrap">IEEE Region 8</p>
              <p className="text-blue-200 text-xs mt-1 whitespace-nowrap">Europe, Middle East, Africa</p>
            </div>
          </div>
        </motion.div>

        {/* Ambassador cards carousel */}
        <div className="relative">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {visibleAmbassadors.map((ambassador, index) => (
              <motion.div
                key={`${currentSlide}-${ambassador.id}`}
                variants={cardReveal}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden hover:bg-white/15 transition-all duration-300 hover:scale-105"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={ambassador.image}
                    alt={ambassador.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a8a]/80 to-transparent" />
                  
                  {/* IEEE logo badge */}
                  <div className="absolute top-4 right-4 bg-white rounded-lg p-2">
                    <img src={IEEELogo} alt="IEEE" className="w-8 h-8 object-contain" />
                  </div>
                </div>
                
                <div className="p-4 text-center">
                  <h3 className="text-white font-bold text-lg mb-1">
                    {ambassador.name}
                  </h3>
                  <p className="text-blue-200 text-sm">
                    {ambassador.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Navigation arrows */}
          {AMBASSADORS.length > cardsPerView && (
            <>
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm p-3 rounded-full transition-all duration-300"
                aria-label="Previous ambassadors"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={nextSlide}
                disabled={currentSlide === maxSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm p-3 rounded-full transition-all duration-300"
                aria-label="Next ambassadors"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </>
          )}
        </div>

        {/* Pagination dots */}
        {maxSlide > 0 && (
          <div className="flex justify-center gap-2 mt-8">
            {[...Array(maxSlide + 1)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentSlide ? 'bg-white w-8' : 'bg-white/40'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AmbassadorsSection;
