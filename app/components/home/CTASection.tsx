import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { Check, ArrowRight } from 'lucide-react';
import { SectionBadge } from './shared';
import { fadeInUp, defaultViewport } from './shared/animations';

/**
 * CTASection Component
 * 
 * Final call-to-action section before High Board:
 * - JOIN US badge
 * - Main heading with highlighted text
 * - Subtitle
 * - Three benefit bullet points
 * - Two CTA buttons (Start Here, Learn More)
 * 
 * Design: Navy/dark blue gradient background with decorative elements
 */

const BENEFITS = [
  'Free to join as a student',
  'Global IEEE resources',
  'Regional community'
];

export const CTASection: React.FC = () => {
  return (
    <section className="relative w-full bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#1e3a8a] py-20 md:py-28 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
      </div>

      {/* Decorative stars */}
      <motion.div
        className="absolute top-20 right-20 text-white opacity-20"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        ✦
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-32 text-white opacity-20 text-4xl"
        animate={{ 
          rotate: [360, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        ✦
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center justify-center px-5 py-2 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-full text-xs font-semibold tracking-wide uppercase">
            JOIN US
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
        >
          Your next chapter{' '}
          <span className="text-[#60A5FA]">could start here.</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-12"
        >
          Discover IEEE. Build your skills. Find your community.
        </motion.p>

        {/* Benefits list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
        >
          {BENEFITS.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3 text-white">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <span className="font-medium">{benefit}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/register"
            className="group bg-white hover:bg-gray-100 text-[#1e3a8a] font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 flex items-center gap-2"
          >
            Start Here
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <Link
            to="/about"
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full border-2 border-white/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
          >
            Learn More
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
