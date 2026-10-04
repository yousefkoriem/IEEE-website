import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Database, Laptop } from 'lucide-react';
import { SectionHeading } from './shared';
import { staggerContainer, cardReveal, defaultViewport } from './shared/animations';

// Import placeholder team member image
import placeholderImage from '../../assets/images/highBoard/webmaster.jpg';

/**
 * TeamSection Component
 * 
 * "Behind the Experience" section showcasing student team:
 * - Main heading with highlighted text
 * - Subtitle
 * - "100% Student-Built" badge
 * - 6 team member cards in 2-row grid
 * - Role badges on images
 * 
 * Design: Light background, purple/blue gradient overlays
 * Note: Using placeholder image (same person) as shown in design
 */

interface TeamMember {
  id: number;
  name: string;
  role: string;
  contribution: string;
  image: string;
  roleColor: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: '[ Mariam Gamal ]',
    role: 'Webmaster',
    contribution: 'Technical execution & project coordination',
    image: placeholderImage,
    roleColor: '#5A10A5'
  },
  {
    id: 2,
    name: '[ Mariam Gamal ]',
    role: 'UI/UX Designer',
    contribution: 'Visual design & user experience',
    image: placeholderImage,
    roleColor: '#4460EF'
  },
  {
    id: 3,
    name: '[ Mariam Gamal ]',
    role: 'Front-End',
    contribution: 'Interface development & interactions',
    image: placeholderImage,
    roleColor: '#10A56D'
  },
  {
    id: 4,
    name: '[ Mariam Gamal ]',
    role: 'Front-End',
    contribution: 'Component architecture & state management',
    image: placeholderImage,
    roleColor: '#E14FCA'
  },
  {
    id: 5,
    name: '[ Mariam Gamal ]',
    role: 'Back-End',
    contribution: 'API development & database design',
    image: placeholderImage,
    roleColor: '#FF6B35'
  },
  {
    id: 6,
    name: '[ Mariam Gamal ]',
    role: 'Back-End',
    contribution: 'Server infrastructure & security',
    image: placeholderImage,
    roleColor: '#00A8E8'
  }
];

export const TeamSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#F9F7FF] py-16 md:py-24 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#CCB5E3]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#4460EF]/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <SectionHeading 
            highlightWords={['Experience']}
            highlightColor="purple"
          >
            Behind the Experience
          </SectionHeading>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-gray-700 text-base md:text-lg max-w-2xl mx-auto mb-8"
        >
          Every interaction you see here was designed and built by students from our branch.
        </motion.p>

        {/* 100% Student-Built badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={defaultViewport}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-[#5A10A5] text-white px-6 py-3 rounded-full flex items-center gap-3">
            <Code className="w-5 h-5" />
            <div className="text-left">
              <p className="font-bold">100% Student-Built</p>
              <p className="text-xs text-purple-200">All experiences powered by IEEE BSU members</p>
            </div>
          </div>
        </motion.div>

        {/* Team grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {TEAM_MEMBERS.map((member) => (
            <motion.div
              key={member.id}
              variants={cardReveal}
              className="relative group overflow-hidden rounded-3xl bg-white border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Gradient overlay */}
                <div 
                  className="absolute inset-0 opacity-80"
                  style={{
                    background: `linear-gradient(to top, ${member.roleColor}CC, ${member.roleColor}40, transparent)`
                  }}
                />

                {/* Role badge */}
                <div 
                  className="absolute top-4 left-4 px-4 py-2 rounded-full text-white text-sm font-semibold backdrop-blur-sm"
                  style={{ backgroundColor: `${member.roleColor}CC` }}
                >
                  {member.role}
                </div>
              </div>

              {/* Info section */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#000640] mb-1">
                  {member.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {member.contribution}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
