import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Award, Users, TrendingUp, Globe } from 'lucide-react';
import { SectionBadge, SectionHeading } from './shared';
import { fadeInLeft, fadeInRight, defaultViewport } from './shared/animations';

/**
 * JourneySection Component
 * 
 * "Our Journey" timeline section with season-based navigation:
 * - TIMELINE badge
 * - Main heading and subtitle
 * - Left: Season selector (vertical radio buttons)
 * - Right: Content panel with season details
 * - Season 11 active by default with placeholder achievements
 * 
 * Design: Purple accents with smooth transitions between seasons
 */

interface Season {
  id: number;
  name: string;
  year: string;
  impact: string;
  badge?: string;
  achievements: string[];
  isPlaceholder?: boolean;
}

const SEASONS: Season[] = [
  {
    id: 8,
    name: 'Season 8',
    year: '2021-2022',
    impact: 'Foundation & Growth',
    achievements: [
      'Established core technical committees',
      'Launched first regional workshop series',
      'Built foundational member community',
      'Placeholder: Real season data will be added here'
    ],
    isPlaceholder: true
  },
  {
    id: 9,
    name: 'Season 9',
    year: '2022-2023',
    impact: 'Expansion & Innovation',
    achievements: [
      'Expanded to 8+ specialized committees',
      'Hosted IEEE Region 8 representatives',
      'Launched AI and embedded systems programs',
      'Placeholder: Real season data will be added here'
    ],
    isPlaceholder: true
  },
  {
    id: 10,
    name: 'Season 10',
    year: '2023-2024',
    impact: 'Recognition & Leadership',
    achievements: [
      'Achieved regional excellence recognition',
      'Scaled member engagement initiatives',
      'Developed industry partnerships',
      'Placeholder: Real season data will be added here'
    ],
    isPlaceholder: true
  },
  {
    id: 11,
    name: 'Season 11',
    year: '2024-2025',
    impact: 'Season 11 Impact',
    badge: 'Award Submission Ready',
    achievements: [
      'Multiple award submissions and regional acknowledgments',
      'Scaled community outreach and humanitarian tech initiatives',
      'Website and digital identity redesign — built entirely by students',
      'Strongest member engagement and activity record to date'
    ],
    isPlaceholder: false
  }
];

export const JourneySection: React.FC = () => {
  const [selectedSeason, setSelectedSeason] = useState<number>(11);

  const currentSeason = SEASONS.find(s => s.id === selectedSeason) || SEASONS[3];

  return (
    <section className="relative w-full bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] py-16 md:py-24 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#CCB5E3]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4460EF]/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-4"
        >
          <div className="px-5 py-2 bg-white border-2 border-[#5A10A5] rounded-full text-xs font-bold tracking-wide text-[#5A10A5] shadow-sm">
            TIMELINE
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-4"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#000640]">
            Our <span className="text-[#5A10A5]">Journey</span>
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-[#4460EF] text-base md:text-lg max-w-3xl mx-auto mb-12 font-medium"
        >
          Four seasons. Continuous growth. One story — still being written.
        </motion.p>

        {/* Horizontal Season Selector - Top (Desktop and Mobile) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center gap-3 mb-12 flex-wrap"
        >
          {SEASONS.map((season) => (
            <button
              key={season.id}
              onClick={() => setSelectedSeason(season.id)}
              className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                selectedSeason === season.id
                  ? 'bg-[#5A10A5] text-white shadow-lg scale-105'
                  : 'bg-white text-[#5A10A5] border-2 border-[#CCB5E3] hover:border-[#5A10A5]'
              }`}
            >
              {season.name}
            </button>
          ))}
        </motion.div>

        {/* Layout with vertical selector on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Left: Vertical Season Selector - Desktop Only (Timeline Style) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden lg:block lg:col-span-3"
          >
            <div className="relative">
              {SEASONS.map((season, index) => {
                const isSelected = selectedSeason === season.id;
                const isLast = index === SEASONS.length - 1;
                
                return (
                  <div key={season.id} className="relative">
                    <button
                      onClick={() => setSelectedSeason(season.id)}
                      className="w-full text-left flex items-start gap-3 pb-6 transition-all duration-300 hover:opacity-80"
                    >
                      {/* Circle and connecting line */}
                      <div className="relative flex flex-col items-center flex-shrink-0">
                        {/* Circle */}
                        <div 
                          className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                            isSelected 
                              ? 'bg-[#000640] border-[#000640]' 
                              : 'bg-transparent border-[#D1D5DB]'
                          }`}
                        />
                        
                        {/* Connecting line to next item */}
                        {!isLast && (
                          <div 
                            className={`w-0.5 h-12 mt-0.5 ${
                              isSelected || selectedSeason === SEASONS[index + 1]?.id
                                ? 'bg-[#000640]' 
                                : 'bg-[#D1D5DB]'
                            }`}
                          />
                        )}
                      </div>
                      
                      {/* Text */}
                      <div className="flex-1 -mt-0.5">
                        <p className={`font-bold text-base transition-colors duration-300 ${
                          isSelected ? 'text-[#000640]' : 'text-[#9CA3AF]'
                        }`}>
                          {season.name}
                        </p>
                        {isSelected && (
                          <p className="text-xs text-[#000640] mt-0.5">
                            Impact
                          </p>
                        )}
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Content Panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="lg:col-span-9"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedSeason}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-3xl p-8 md:p-10 border-2 border-[#E5E7EB] shadow-lg"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
                  <div>
                    <p className="text-xs font-bold text-[#5A10A5] uppercase tracking-wider mb-2">
                      IMPACT
                    </p>
                    <h3 className="text-3xl md:text-4xl font-bold text-[#000640] mb-2">
                      {currentSeason.name}
                    </h3>
                  </div>
                  {currentSeason.badge && (
                    <span className="px-4 py-2 bg-[#EFE7F6] text-[#5A10A5] rounded-full text-sm font-semibold border border-[#CCB5E3]">
                      {currentSeason.badge}
                    </span>
                  )}
                </div>

                {/* Achievements list with bullet points */}
                <div className="space-y-3">
                  {currentSeason.achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#5A10A5] mt-2" />
                      <p className="text-[#4B5563] leading-relaxed flex-1 text-base">
                        {achievement}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Placeholder note - lighter styling */}
                {currentSeason.isPlaceholder && (
                  <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-xl">
                    <p className="text-sm text-gray-600 italic">
                      Real season data and verified achievements will replace these placeholders.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Mobile: Single content panel below horizontal selector */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="lg:hidden max-w-5xl mx-auto"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSeason}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl p-8 md:p-12 border-2 border-[#E5E7EB] shadow-lg"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
                <div>
                  <p className="text-xs font-bold text-[#5A10A5] uppercase tracking-wider mb-2">
                    IMPACT
                  </p>
                  <h3 className="text-3xl md:text-4xl font-bold text-[#000640] mb-2">
                    {currentSeason.name}
                  </h3>
                </div>
                {currentSeason.badge && (
                  <span className="px-4 py-2 bg-[#EFE7F6] text-[#5A10A5] rounded-full text-sm font-semibold border border-[#CCB5E3]">
                    {currentSeason.badge}
                  </span>
                )}
              </div>

              {/* Achievements list with bullet points */}
              <div className="space-y-3">
                {currentSeason.achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#5A10A5] mt-2" />
                    <p className="text-[#4B5563] leading-relaxed flex-1 text-base">
                      {achievement}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Placeholder note - lighter styling */}
              {currentSeason.isPlaceholder && (
                <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-xl">
                  <p className="text-sm text-gray-600 italic">
                    Real season data and verified achievements will replace these placeholders.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default JourneySection;
