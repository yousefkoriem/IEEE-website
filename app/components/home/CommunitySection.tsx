import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { Cpu, Zap, Heart, Users, ArrowRight } from 'lucide-react';
import { SectionBadge, SectionHeading } from './shared';
import { staggerContainer, cardReveal, defaultViewport } from './shared/animations';

/**
 * CommunitySection Component
 * 
 * "Our Community, Your Space" section showcasing four specialized societies:
 * - CS/CIS: Computer Science & Information Systems
 * - AESH: Advanced Engineering & Smart Hardware
 * - SIGHT: Special Interest Group on Humanitarian Technology
 * - WIE: Women in Engineering
 * 
 * Features:
 * - 2x2 grid layout
 * - Each card links to /committees
 * - Hover effects with subtle scale
 * - Tag badges for each society
 */

interface Society {
  id: string;
  name: string;
  fullName: string;
  icon: React.ElementType;
  description: string;
  tags: string[];
  color: string;
  route: string;
}

const SOCIETIES: Society[] = [
  {
    id: 'cscis',
    name: 'CS / CIS',
    fullName: 'Computer Science & Information Systems',
    icon: Cpu,
    description: 'Bridging theoretical computer science with real-world systems. Members explore software development, data structures, and information systems to build tomorrow\'s digital infrastructure.',
    tags: ['Software', 'Algorithms', 'Systems'],
    color: '#5A10A5',
    route: '/committees'
  },
  {
    id: 'aesh',
    name: 'AESH',
    fullName: 'Advanced Engineering & Smart Hardware',
    icon: Zap,
    description: 'Where circuits meet creativity. Focused on electronics, embedded systems, IoT, and smart hardware solutions that redefine how new technology interacts with the physical world.',
    tags: ['Electronics', 'IoT', 'Hardware'],
    color: '#4460EF',
    route: '/committees'
  },
  {
    id: 'sight',
    name: 'SIGHT',
    fullName: 'Special Interest Group on Humanitarian Technology',
    icon: Heart,
    description: 'Technology in service of humanity. SIGHT unites students around projects addressing real social challenges — connecting engineering skills with community impact and sustainable development.',
    tags: ['Social Impact', 'Humanitarian', 'Sustainability'],
    color: '#10A56D',
    route: '/committees'
  },
  {
    id: 'wie',
    name: 'WIE',
    fullName: 'Women in Engineering',
    icon: Users,
    description: 'Championing diversity in STEM and amplifying women\'s voices in engineering. WIE creates a supportive environment for women to grow, lead, and thrive in technology-driven careers.',
    tags: ['Diversity', 'Leadership', 'STEM'],
    color: '#E14FCA',
    route: '/committees'
  }
];

export const CommunitySection: React.FC = () => {
  return (
    <section className="relative w-full bg-gradient-to-b from-white via-[#F9F7FF] to-white py-16 md:py-24 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#CCB5E3]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#4460EF]/10 rounded-full blur-3xl" />

      {/* Decorative circles */}
      <motion.div
        className="absolute top-1/4 right-20 w-32 h-32 border-4 border-[#CCB5E3]/30 rounded-full"
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 90, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <SectionBadge>OUR COMMUNITY</SectionBadge>
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
            highlightWords={['Your Space']}
            highlightColor="purple"
          >
            Our Community, Your Space
          </SectionHeading>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-[#4460EF] text-base md:text-lg max-w-3xl mx-auto mb-16 font-medium"
        >
          Four specialized groups, one shared purpose — advancing technology, inclusion, and impact.
        </motion.p>

        {/* Society cards grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {SOCIETIES.map((society) => {
            const Icon = society.icon;
            
            return (
              <Link 
                key={society.id}
                to={society.route}
                className="group"
              >
                <motion.div
                  variants={cardReveal}
                  className="bg-white rounded-3xl p-8 border border-[#E0E0E0] hover:border-[#5A10A5]/40 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 h-full flex flex-col"
                  whileHover={{ 
                    boxShadow: '0 20px 40px rgba(90, 16, 165, 0.15)'
                  }}
                >
                  {/* Icon and name header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div 
                      className="p-4 rounded-2xl transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${society.color}15` }}
                    >
                      <Icon 
                        className="w-8 h-8" 
                        style={{ color: society.color }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 
                        className="text-2xl font-bold mb-1 transition-colors duration-300"
                        style={{ color: society.color }}
                      >
                        {society.name}
                      </h3>
                      <p className="text-sm text-gray-600 font-medium">
                        {society.fullName}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 leading-relaxed mb-6 flex-1">
                    {society.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {society.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-xs font-semibold transition-colors duration-300"
                        style={{ 
                          backgroundColor: `${society.color}15`,
                          color: society.color
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Learn more link */}
                  <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all duration-300"
                    style={{ color: society.color }}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CommunitySection;
