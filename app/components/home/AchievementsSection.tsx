import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Users, Heart, Handshake, Medal } from 'lucide-react';
import { SectionBadge, SectionHeading } from './shared';
import { staggerContainer, cardReveal, defaultViewport } from './shared/animations';

/**
 * AchievementsSection Component
 * 
 * Two-part section:
 * Part 1: Impact statement banner (navy background)
 * Part 2: Milestones grid (white background)
 * 
 * Features:
 * - Full-width navy banner with highlighted text
 * - ACHIEVEMENTS badge
 * - 6 milestone cards in 2x3 grid
 * - Icon, title, category tag, year, placeholder description
 * 
 * Design: Navy banner + white section with purple accents
 * Note: Using placeholder data with clear indication
 */

interface Milestone {
  id: number;
  icon: React.ElementType;
  title: string;
  category: string;
  year: string;
  description: string;
  color: string;
}

const MILESTONES: Milestone[] = [
  {
    id: 1,
    icon: Trophy,
    title: 'Regional Excellence Award',
    category: 'Recognition',
    year: '20XX',
    description: 'Placeholder: Awarded for outstanding student branch performance and impact in IEEE Region 8.',
    color: '#FFD700'
  },
  {
    id: 2,
    icon: Star,
    title: 'Best Technical Event',
    category: 'Initiative',
    year: '20XX',
    description: 'Placeholder: Recognized for innovative workshop series combining AI and embedded systems.',
    color: '#4460EF'
  },
  {
    id: 3,
    icon: Users,
    title: 'Region 8 Student Congress',
    category: 'Representation',
    year: '20XX',
    description: 'Placeholder: Students represented IEEE Beni-Suef at international conference.',
    color: '#5A10A5'
  },
  {
    id: 4,
    icon: Heart,
    title: 'STEM Outreach Program',
    category: 'Initiative',
    year: '20XX',
    description: 'Placeholder: Community impact through technology education and humanitarian projects.',
    color: '#E14FCA'
  },
  {
    id: 5,
    icon: Handshake,
    title: 'Industry Partnership',
    category: 'Collaboration',
    year: '20XX',
    description: 'Placeholder: Established partnership with leading tech companies for student opportunities.',
    color: '#10A56D'
  },
  {
    id: 6,
    icon: Medal,
    title: 'Membership Milestone',
    category: 'Growth',
    year: '20XX',
    description: 'Placeholder: Achieved record member engagement and retention across all committees.',
    color: '#FF6B35'
  }
];

export const AchievementsSection: React.FC = () => {
  return (
    <div>
      {/* Part 1: Impact Statement Banner */}
      <section className="relative w-full bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] py-20 md:py-28 overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-500 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
          >
            We don't wait for opportunities.{' '}
            <span className="text-[#4460EF]">We build them.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-blue-200 text-lg md:text-xl font-medium tracking-wide"
          >
            Designed. Developed. Led. Delivered.
          </motion.p>
        </div>
      </section>

      {/* Part 2: Milestones Grid */}
      <section className="relative w-full bg-white py-16 md:py-24 overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#EFE7F6] rounded-full blur-3xl opacity-50" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <SectionBadge>ACHIEVEMENTS</SectionBadge>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-6"
          >
            <SectionHeading 
              highlightWords={["We're Proud Of"]}
              highlightColor="purple"
            >
              Milestones We're Proud Of
            </SectionHeading>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center text-gray-600 text-base md:text-lg max-w-3xl mx-auto mb-16"
          >
            A record of recognition, innovation and student-led impact. Real awards will be added here.
          </motion.p>

          {/* Milestones grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {MILESTONES.map((milestone) => {
              const Icon = milestone.icon;
              
              return (
                <motion.div
                  key={milestone.id}
                  variants={cardReveal}
                  className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Icon */}
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${milestone.color}20` }}
                  >
                    <Icon 
                      className="w-7 h-7"
                      style={{ color: milestone.color }}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#000640] mb-2">
                    {milestone.title}
                  </h3>

                  {/* Category and year */}
                  <div className="flex items-center gap-2 mb-3">
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ 
                        backgroundColor: `${milestone.color}20`,
                        color: milestone.color
                      }}
                    >
                      {milestone.category}
                    </span>
                    <span className="text-sm text-gray-500 font-medium">
                      {milestone.year}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {milestone.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Placeholder note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 max-w-3xl mx-auto p-6 bg-purple-50 border border-purple-200 rounded-2xl"
          >
            <p className="text-center text-purple-800 text-sm">
              <strong>Note:</strong> These are placeholder milestones. Real awards, dates, and achievements 
              will be added once verified and approved for public display.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AchievementsSection;
