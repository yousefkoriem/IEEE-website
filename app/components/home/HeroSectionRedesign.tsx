import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { useIntro } from '../../context/IntroContext';
import CommitteeNetworkDiagram from './CommitteeNetworkDiagram';
import { fadeIn, fadeInLeft, fadeInRight } from './shared/animations';

// Import student profile images for background decoration
import heroImage1 from '../../assets/images/heroImage1.png';
import heroImage2 from '../../assets/images/heroImage2.png';
import heroImage3 from '../../assets/images/heroImage3.png';
import heroImage4 from '../../assets/images/heroImage4.png';

/**
 * HeroSectionRedesign Component
 * 
 * New hero section design featuring:
 * - Single static design (no slideshow)
 * - Interactive committee network diagram
 * - Two-column layout (text left, diagram right)
 * - Dark navy gradient background
 * - Decorative student profile images
 * - Two CTA buttons
 * 
 * Design System:
 * - Background: Dark navy (#1a1d3a) with gradient
 * - Highlights: IEEE and Beni-Suef in blue (#4460EF)
 * - Tagline: "Building Tomorrow" in blue
 */

const STUDENT_IMAGES = [heroImage1, heroImage2, heroImage3, heroImage4];

export const HeroSectionRedesign: React.FC = () => {
  const { introReady } = useIntro();

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1a1d3a] to-[#0f172a] overflow-hidden">
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Decorative background images (student profiles) */}
      <div className="absolute inset-0 z-0 opacity-10">
        <motion.img
          src={STUDENT_IMAGES[0]}
          alt=""
          className="absolute top-10 left-10 w-32 h-32 rounded-full object-cover blur-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.img
          src={STUDENT_IMAGES[1]}
          alt=""
          className="absolute bottom-20 left-20 w-40 h-40 rounded-full object-cover blur-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        />
        <motion.img
          src={STUDENT_IMAGES[2]}
          alt=""
          className="absolute top-32 right-32 w-36 h-36 rounded-full object-cover blur-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        />
        <motion.img
          src={STUDENT_IMAGES[3]}
          alt=""
          className="absolute bottom-32 right-20 w-28 h-28 rounded-full object-cover blur-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
        />
      </div>

      {/* Main content */}
      {introReady && (
        <div className="relative z-20 min-h-screen flex items-center justify-center max-w-7xl mx-auto px-6 lg:px-8">
          <div className="w-full flex flex-col items-center text-center py-20 space-y-12">
            
            {/* Text content - centered */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="space-y-6 lg:space-y-8 max-w-4xl"
            >
              {/* Main heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight text-white">
                <span className="text-[#4460EF]">IEEE</span>{' '}
                <span className="text-[#4460EF]">Beni-Suef</span>{' '}
                <span className="block mt-2">Student Branch</span>
              </h1>

              {/* Tagline */}
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                Empowering Students.{' '}
                <span className="text-[#4460EF]">Building Tomorrow.</span>
              </p>

              {/* Description */}
              <p className="text-gray-300 text-base lg:text-lg leading-relaxed max-w-2xl mx-auto">
                A community where technology, leadership, and innovation come together — 
                and students become the builders of the future.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-4 justify-center">
                <Link
                  to="/about"
                  className="bg-[#4460EF] hover:bg-[#3651d4] text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 active:translate-y-0"
                >
                  Explore Our Journey
                </Link>
                <Link
                  to="/register"
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold px-8 py-3 rounded-full border border-white/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 active:translate-y-0"
                >
                  Join IEEE
                </Link>
              </div>

              {/* Student avatars indicator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex items-center gap-3 pt-6 justify-center"
              >
                <div className="flex -space-x-3">
                  {STUDENT_IMAGES.slice(0, 4).map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt=""
                      className="w-10 h-10 rounded-full border-2 border-[#1a1d3a] object-cover"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-400">
                  <span className="font-semibold text-white">Students across disciplines</span> — one branch
                </p>
              </motion.div>
            </motion.div>

            {/* Explore section title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="pt-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Explore
              </h2>
              <div className="w-24 h-1 bg-[#4460EF] mx-auto rounded-full" />
            </motion.div>

            {/* Committee Network Diagram - below Explore */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.2 }}
              className="w-full flex items-center justify-center pt-4"
            >
              <div className="w-full max-w-[600px] h-[450px]">
                <CommitteeNetworkDiagram />
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#5A10A5]/20 rounded-full blur-3xl -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#4460EF]/20 rounded-full blur-3xl translate-x-1/2" />
    </section>
  );
};

export default HeroSectionRedesign;
