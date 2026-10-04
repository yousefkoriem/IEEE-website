import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Wrench, Award, Briefcase, TrendingUp } from 'lucide-react';
import { staggerContainer, cardReveal, defaultViewport } from './shared/animations';

/**
 * ImpactSection Component
 * 
 * "Turning Activities into Impact" section featuring:
 * - Banner with main heading and subtitle
 * - 6 statistic cards in horizontal layout
 * - Purple gradient background
 * - Horizontally scrollable on mobile
 * 
 * Static statistics (hardcoded values):
 * - Events: +10
 * - Participants: +20
 * - Workshops: +30
 * - Ambassadors: +20
 * - Opportunities: +20
 * - Impact: — (qualitative)
 */

interface Statistic {
  icon: React.ElementType;
  value: string;
  label: string;
  description: string;
}

const STATISTICS: Statistic[] = [
  {
    icon: Calendar,
    value: '+10',
    label: 'Events',
    description: 'Events Organized'
  },
  {
    icon: Users,
    value: '+20',
    label: 'Participants',
    description: 'Students who engaged and grew'
  },
  {
    icon: Wrench,
    value: '+30',
    label: 'Workshops',
    description: 'Workshops Delivered'
  },
  {
    icon: Award,
    value: '+20',
    label: 'Ambassadors',
    description: 'Student representatives'
  },
  {
    icon: Briefcase,
    value: '+20',
    label: 'Opportunities',
    description: 'Connections, internships, and roles'
  },
  {
    icon: TrendingUp,
    value: '—',
    label: 'Impact',
    description: 'Measurable change for students and communities'
  }
];

export const ImpactSection: React.FC = () => {
  return (
    <section className="relative w-full bg-gradient-to-br from-[#EFE7F6] via-[#f5f0fa] to-[#EFE7F6] py-16 md:py-20 overflow-hidden">
      {/* Decorative 4-Point Star Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="absolute w-8 h-8 top-10 left-12 text-[#CCB5E3] opacity-70 animate-pulse"
        >
          <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
        </svg>
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="absolute w-6 h-6 top-32 right-20 text-[#CCB5E3] opacity-70 animate-pulse"
        >
          <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
        </svg>
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="absolute w-7 h-7 bottom-20 left-16 text-[#CCB5E3] opacity-70 animate-pulse"
        >
          <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
        </svg>
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="absolute w-5 h-5 bottom-32 right-24 text-[#CCB5E3] opacity-70 animate-pulse"
        >
          <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Banner heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#5A10A5] mb-4 leading-tight">
            Turning <span className="text-[#4460EF]">Activities</span>
            <br className="hidden sm:block" />
            into <span className="text-[#4460EF]">Impact</span>
          </h2>
          <p className="text-[#000640] text-base md:text-lg max-w-3xl mx-auto font-medium">
            Every event, workshop, and initiative is measured not by its size but by what it 
            enables in students' lives.
          </p>
        </motion.div>

        {/* Statistics cards - horizontally scrollable on mobile */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="relative mb-16"
        >
          {/* Desktop grid layout */}
          <div className="hidden lg:grid lg:grid-cols-6 gap-6">
            {STATISTICS.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={cardReveal}
                  className="bg-white border-2 border-[#CCB5E3] rounded-2xl p-6 hover:border-[#5A10A5] transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="p-3 bg-[#EFE7F6] rounded-xl">
                      <Icon className="w-6 h-6 text-[#5A10A5]" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-[#5A10A5] mb-1">
                        {stat.value}
                      </p>
                      <p className="text-sm font-semibold text-[#5A10A5]">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile/Tablet horizontal scroll */}
          <div className="lg:hidden overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
            <div className="flex gap-4 min-w-max">
              {STATISTICS.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white border-2 border-[#CCB5E3] rounded-2xl p-6 w-64 flex-shrink-0"
                  >
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="p-3 bg-[#EFE7F6] rounded-xl">
                        <Icon className="w-6 h-6 text-[#5A10A5]" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-[#5A10A5] mb-1">
                          {stat.value}
                        </p>
                        <p className="text-sm font-semibold text-[#5A10A5]">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Scroll indicator for mobile */}
          <div className="lg:hidden flex justify-center gap-2 mt-6">
            {[...Array(2)].map((_, i) => (
              <div 
                key={i}
                className="w-2 h-2 rounded-full bg-[#CCB5E3]"
              />
            ))}
          </div>
        </motion.div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white border-2 border-[#5A10A5] rounded-2xl p-8 md:p-10 relative">
            {/* Quote icon */}
            <div className="absolute top-6 left-6 text-[#CCB5E3] opacity-30">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor">
                <path d="M10 20c0-5.523 4.477-10 10-10v5c-2.761 0-5 2.239-5 5s2.239 5 5 5v5c-5.523 0-10-4.477-10-10zm20 0c0-5.523 4.477-10 10-10v5c-2.761 0-5 2.239-5 5s2.239 5 5 5v5c-5.523 0-10-4.477-10-10z" transform="scale(0.5)" />
              </svg>
            </div>
            
            <div className="relative z-10">
              <p className="text-xl md:text-2xl font-bold text-[#000640] mb-4 leading-relaxed">
                We don't count events.
              </p>
              <p className="text-2xl md:text-3xl font-extrabold text-[#5A10A5] mb-4 leading-tight">
                We measure what they unlock.
              </p>
              <p className="text-base md:text-lg text-[#4460EF] leading-relaxed">
                Each activity is intentionally designed to open a door — to a skill, a connection, 
                a realization, or a career-defining moment.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default ImpactSection;
