import React from 'react';
import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';
import { staggerContainer, cardReveal, defaultViewport } from './shared/animations';

/**
 * SponsorsSection Component
 * 
 * "Sponsors & Partners" section featuring:
 * - Main heading
 * - Grid of sponsor cards (4 columns, 2 rows = 8 total)
 * - Placeholder logo, company name, category
 * - Decorative curved lines in corners
 * 
 * Design: Light background with subtle decorations
 * Note: Using placeholder content for now
 */

interface Sponsor {
  id: number;
  name: string;
  category: string;
  logo?: string;
}

const SPONSORS: Sponsor[] = [
  { id: 1, name: 'Tech', category: 'Diamond Partner' },
  { id: 2, name: 'Tech', category: 'Diamond Partner' },
  { id: 3, name: 'Tech', category: 'Diamond Partner' },
  { id: 4, name: 'Tech', category: 'Diamond Partner' },
  { id: 5, name: 'Tech', category: 'Diamond Partner' },
  { id: 6, name: 'Tech', category: 'Diamond Partner' },
  { id: 7, name: 'Tech', category: 'Diamond Partner' },
  { id: 8, name: 'Tech', category: 'Diamond Partner' }
];

export const SponsorsSection: React.FC = () => {
  return (
    <section className="relative w-full bg-gradient-to-b from-white via-[#F9F7FF] to-white py-16 md:py-24 overflow-hidden">
      {/* Decorative curved lines */}
      <svg
        className="absolute top-0 left-0 w-48 h-48 text-[#CCB5E3] opacity-20"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path
          d="M0 100 Q 50 50, 100 100"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </svg>
      <svg
        className="absolute bottom-0 right-0 w-48 h-48 text-[#CCB5E3] opacity-20"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path
          d="M200 100 Q 150 150, 100 100"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-[#000640] text-center mb-16"
        >
          Sponsors & Partners
        </motion.h2>

        {/* Sponsors grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {SPONSORS.map((sponsor) => (
            <motion.div
              key={sponsor.id}
              variants={cardReveal}
              className="bg-white rounded-2xl p-6 border border-[#E0E0E0] hover:border-[#5A10A5]/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col items-center justify-center text-center min-h-[180px]"
            >
              {/* Placeholder logo */}
              <div className="w-20 h-20 bg-[#EFE7F6] rounded-2xl flex items-center justify-center mb-4">
                <Building2 className="w-10 h-10 text-[#5A10A5]" />
              </div>

              {/* Company name */}
              <h3 className="text-xl font-bold text-[#000640] mb-2">
                {sponsor.name}
              </h3>

              {/* Category */}
              <p className="text-sm text-[#5A10A5] font-medium">
                {sponsor.category}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Note about placeholder content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 text-sm italic">
            Placeholder sponsors — real partner logos and information will be added here
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SponsorsSection;
