import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Rocket, Target } from 'lucide-react';
import { SectionBadge, SectionHeading } from './shared';
import { fadeInUp, staggerContainer, cardReveal, defaultViewport } from './shared/animations';

// Import featured image
import heroBg1 from '../../assets/images/heroBg1.png';

/**
 * AboutSectionRedesign Component
 * 
 * "More Than a Student Branch" section featuring:
 * - WHO WE ARE badge
 * - Main heading with highlighted text
 * - Left column: "A Community of Builders" with description and keyword badges
 * - Right column: Featured image with purple border
 * - Bottom: Statistics grid (4 cards)
 * 
 * Design: Light background with decorative curved lines
 */

const KEYWORDS = [
  'Technology',
  'Leadership',
  'Innovation',
  'Community',
  'Collaboration'
];

const STATISTICS = [
  {
    icon: Users,
    value: '+300',
    label: 'Members',
    description: 'Active students'
  },
  {
    icon: Target,
    value: '+10',
    label: 'Committees',
    description: 'Specialized teams'
  },
  {
    icon: Award,
    value: '+3',
    label: 'Chapters & Special Groups',
    description: 'Technical societies'
  },
  {
    icon: Rocket,
    value: '+20',
    label: 'Projects & Initiatives',
    description: 'Student-led impact'
  }
];

export const AboutSectionRedesign: React.FC = () => {
  return (
    <section className="relative w-full bg-white py-16 md:py-24 overflow-hidden">
      {/* Decorative curved lines/shapes */}
      <div className="absolute top-20 left-0 w-64 h-64 bg-[#EFE7F6] rounded-full blur-3xl opacity-50 -translate-x-1/2" />
      <div className="absolute bottom-20 right-0 w-64 h-64 bg-[#CCB5E3] rounded-full blur-3xl opacity-40 translate-x-1/2" />
      
      {/* Decorative curved line SVG */}
      <svg
        className="absolute top-1/4 right-0 w-64 h-64 text-[#CCB5E3] opacity-20"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path
          d="M10 100 Q 50 50, 100 100 T 190 100"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
        />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <SectionBadge>WHO WE ARE</SectionBadge>
        </motion.div>

        {/* Main heading */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="text-center mb-16"
        >
          <SectionHeading 
            highlightWords={['Student Branch']}
            highlightColor="purple"
            className="mb-4"
          >
            More Than a Student Branch.
          </SectionHeading>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          
          {/* Left column: Text content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="space-y-6"
          >
            <motion.h3 
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-[#000640]"
            >
              A Community of Builders.
            </motion.h3>
            
            <motion.p 
              variants={fadeInUp}
              className="text-gray-700 text-base md:text-lg leading-relaxed"
            >
              IEEE Beni-Suef Student Branch is a student-led community at Beni Suef University 
              dedicated to advancing technology, cultivating leadership, and driving meaningful change 
              — both on campus and beyond.
            </motion.p>

            <motion.p 
              variants={fadeInUp}
              className="text-gray-700 text-base md:text-lg leading-relaxed"
            >
              We bring together students from engineering, computer science, and related fields through 
              hands-on workshops, IEEE Region 8 activities, and real-world technical competitions. 
              From embedded systems to AI, our technical societies build the skills that power tomorrow's 
              professionals — and our operational committees build the community to support them.
            </motion.p>

            {/* Keyword badges */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap gap-3 pt-4"
            >
              {KEYWORDS.map((keyword, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-[#EFE7F6] text-[#5A10A5] rounded-full text-sm font-semibold"
                >
                  {keyword}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column: Featured image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 60 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden border-4 border-[#5A10A5] shadow-2xl shadow-purple-500/20">
              <img
                src={heroBg1}
                alt="IEEE Beni-Suef Student Branch Team"
                className="w-full h-auto object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#5A10A5]/20 to-transparent" />
            </div>
            
            {/* Decorative badge on image */}
            <div className="absolute -bottom-4 -right-4 bg-white px-6 py-4 rounded-2xl shadow-xl border-2 border-[#CCB5E3]">
              <p className="text-2xl font-bold text-[#5A10A5]">IEEE BSU</p>
              <p className="text-sm text-gray-600">Beni-Suef Branch</p>
            </div>
          </motion.div>
        </div>

        {/* Statistics grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
        >
          {STATISTICS.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={cardReveal}
                className="bg-gradient-to-br from-white to-[#F8F9FF] p-6 rounded-2xl border border-[#CCB5E3]/30 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#4460EF]/10 rounded-xl">
                    <Icon className="w-6 h-6 text-[#4460EF]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-3xl font-bold text-[#4460EF] mb-1">
                      {stat.value}
                    </p>
                    <p className="text-sm font-semibold text-[#000640] mb-1">
                      {stat.label}
                    </p>
                    <p className="text-xs text-gray-600">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSectionRedesign;
