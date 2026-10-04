import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { Network, Users, Eye, Cpu, Plane } from 'lucide-react';

/**
 * CommitteeNetworkDiagram Component
 * 
 * Interactive SVG-based visualization showing the IEEE committee structure
 * with a central IEEE logo connected to 5 specialized committees in a radial pattern.
 * 
 * Features:
 * - Central IEEE logo with glowing effect
 * - Radial lines connecting center to committees
 * - Hover effects with scale and glow
 * - Click to navigate to committee pages
 * - Responsive design
 * - Accessibility labels for screen readers
 */

interface CommitteeNode {
  id: string;
  name: string;
  fullName: string;
  icon: React.ElementType;
  angle: number; // in degrees
  route: string;
}

const COMMITTEES: CommitteeNode[] = [
  {
    id: 'wie',
    name: 'WIE',
    fullName: 'Women in Engineering',
    icon: Users,
    angle: 135, // Upper-left
    route: '/committees'
  },
  {
    id: 'branch',
    name: 'Branch',
    fullName: 'IEEE Branch',
    icon: Network,
    angle: 90, // Top
    route: '/committees'
  },
  {
    id: 'sight',
    name: 'SIGHT',
    fullName: 'Special Interest Group on Humanitarian Technology',
    icon: Eye,
    angle: 45, // Upper-right
    route: '/committees'
  },
  {
    id: 'cscis',
    name: 'CS/CIS',
    fullName: 'Computer Science & Information Systems',
    icon: Cpu,
    angle: 180, // Middle-left
    route: '/committees'
  },
  {
    id: 'aess',
    name: 'AESS',
    fullName: 'Aerospace and Electronic Systems',
    icon: Plane,
    angle: 0, // Middle-right
    route: '/committees'
  }
];

const CENTER_X = 300;
const CENTER_Y = 360; // Moved further down so 20% is cut from bottom
const RADIUS = 180;

// Helper function to calculate position from angle
const getPositionFromAngle = (angle: number, radius: number) => {
  const radian = (angle * Math.PI) / 180;
  return {
    x: CENTER_X + radius * Math.cos(radian),
    y: CENTER_Y - radius * Math.sin(radian) // subtract because SVG y-axis goes down
  };
};

export const CommitteeNetworkDiagram: React.FC = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 600 450"
        className="w-full h-full"
        style={{ maxWidth: '600px', maxHeight: '450px' }}
        aria-label="IEEE Committee Network Diagram"
      >
        {/* Glow effect layers for center */}
        <defs>
          <radialGradient id="centerGlow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#4460EF" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#5A10A5" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#000640" stopOpacity="0" />
          </radialGradient>
          
          <linearGradient id="squareGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#e0e0e0" stopOpacity="1" />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Radial connecting lines */}
        <g className="lines">
          {COMMITTEES.map((committee) => {
            const pos = getPositionFromAngle(committee.angle, RADIUS);
            const isHovered = hoveredNode === committee.id;
            
            return (
              <motion.line
                key={`line-${committee.id}`}
                x1={CENTER_X}
                y1={CENTER_Y}
                x2={pos.x}
                y2={pos.y}
                stroke={isHovered ? "#4460EF" : "#4460EF"}
                strokeWidth={isHovered ? "2" : "1.5"}
                strokeOpacity={isHovered ? "0.8" : "0.4"}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ 
                  duration: 1.5, 
                  ease: 'easeInOut', 
                  delay: 0.3 + COMMITTEES.indexOf(committee) * 0.1 
                }}
              />
            );
          })}
        </g>

        {/* Central IEEE logo */}
        <Link to="/committees" aria-label="View all committees">
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="cursor-pointer"
          >
            {/* Outer glow circle */}
            <motion.circle
              cx={CENTER_X}
              cy={CENTER_Y}
              r="70"
              fill="url(#centerGlow)"
              initial={{ scale: 0.8, opacity: 0.4 }}
              animate={{ 
                scale: [0.8, 1.1, 0.8],
                opacity: [0.4, 0.6, 0.4]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
            
            {/* Main circle - dark background */}
            <motion.circle
              cx={CENTER_X}
              cy={CENTER_Y}
              r="50"
              fill="#0a0a2e"
              stroke="#4460EF"
              strokeWidth="2"
              filter="url(#glow)"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            />

            {/* IEEE Logo representation - circular pattern */}
            <g transform={`translate(${CENTER_X}, ${CENTER_Y})`}>
              {/* Center dot */}
              <circle cx="0" cy="0" r="4" fill="#4460EF" />
              
              {/* Radial spokes (8 spokes like IEEE logo) */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                const spokeLength = 25;
                const radian = (angle * Math.PI) / 180;
                const x = spokeLength * Math.cos(radian);
                const y = spokeLength * Math.sin(radian);
                
                return (
                  <motion.line
                    key={`spoke-${i}`}
                    x1="0"
                    y1="0"
                    x2={x}
                    y2={y}
                    stroke="#4460EF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.5 + i * 0.05,
                      ease: 'easeOut'
                    }}
                  />
                );
              })}
              
              {/* Outer ring */}
              <motion.circle
                cx="0"
                cy="0"
                r="28"
                fill="none"
                stroke="#4460EF"
                strokeWidth="1.5"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              />
            </g>
          </motion.g>
        </Link>

        {/* Committee nodes - now SQUARES with gradient */}
        {COMMITTEES.map((committee, index) => {
          const isHovered = hoveredNode === committee.id;
          const pos = getPositionFromAngle(committee.angle, RADIUS);
          
          const squareSize = 50;
          const squareX = pos.x - squareSize / 2;
          const squareY = pos.y - squareSize / 2;
          
          // Adjust label position based on angle
          const labelOffset = committee.angle === 90 ? -40 : 40;
          const labelY = pos.y + labelOffset;
          
          return (
            <Link 
              key={committee.id}
              to={committee.route}
              aria-label={`Navigate to ${committee.fullName}`}
            >
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.8 + index * 0.1,
                  ease: 'backOut'
                }}
                onMouseEnter={() => setHoveredNode(committee.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className="cursor-pointer"
              >
                {/* Glow effect on hover */}
                {isHovered && (
                  <motion.rect
                    x={squareX - 10}
                    y={squareY - 10}
                    width={squareSize + 20}
                    height={squareSize + 20}
                    rx="4"
                    fill="#4460EF"
                    opacity="0.2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                
                {/* Square node with white gradient */}
                <motion.rect
                  x={squareX}
                  y={squareY}
                  width={squareSize}
                  height={squareSize}
                  rx="4"
                  fill="url(#squareGradient)"
                  stroke="#000000"
                  strokeWidth="2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                />
                
                {/* Icon representation - committee-specific simple shapes */}
                <g transform={`translate(${pos.x}, ${pos.y})`}>
                  {committee.id === 'wie' && (
                    // Users icon - two circles
                    <>
                      <circle cx="-4" cy="-2" r="3" fill="#000000" />
                      <circle cx="4" cy="-2" r="3" fill="#000000" />
                      <path d="M -8 6 Q -4 2 0 2 Q 4 2 8 6" stroke="#000000" strokeWidth="2" fill="none" />
                    </>
                  )}
                  {committee.id === 'branch' && (
                    // Network icon - connected nodes
                    <>
                      <circle cx="-5" cy="-3" r="2" fill="#000000" />
                      <circle cx="5" cy="-3" r="2" fill="#000000" />
                      <circle cx="0" cy="4" r="2" fill="#000000" />
                      <line x1="-5" y1="-3" x2="5" y2="-3" stroke="#000000" strokeWidth="1.5" />
                      <line x1="-5" y1="-3" x2="0" y2="4" stroke="#000000" strokeWidth="1.5" />
                      <line x1="5" y1="-3" x2="0" y2="4" stroke="#000000" strokeWidth="1.5" />
                    </>
                  )}
                  {committee.id === 'sight' && (
                    // Eye icon
                    <>
                      <ellipse cx="0" cy="0" rx="8" ry="5" fill="none" stroke="#000000" strokeWidth="1.5" />
                      <circle cx="0" cy="0" r="3" fill="#000000" />
                    </>
                  )}
                  {committee.id === 'cscis' && (
                    // CPU/Chip icon
                    <>
                      <rect x="-5" y="-5" width="10" height="10" fill="none" stroke="#000000" strokeWidth="1.5" />
                      <rect x="-3" y="-3" width="6" height="6" fill="#000000" />
                      <line x1="-8" y1="-3" x2="-5" y2="-3" stroke="#000000" strokeWidth="1.5" />
                      <line x1="-8" y1="0" x2="-5" y2="0" stroke="#000000" strokeWidth="1.5" />
                      <line x1="-8" y1="3" x2="-5" y2="3" stroke="#000000" strokeWidth="1.5" />
                      <line x1="8" y1="-3" x2="5" y2="-3" stroke="#000000" strokeWidth="1.5" />
                      <line x1="8" y1="0" x2="5" y2="0" stroke="#000000" strokeWidth="1.5" />
                      <line x1="8" y1="3" x2="5" y2="3" stroke="#000000" strokeWidth="1.5" />
                    </>
                  )}
                  {committee.id === 'aess' && (
                    // Plane icon
                    <>
                      <path d="M -8 2 L 0 -6 L 8 2 L 3 2 L 3 6 L -3 6 L -3 2 Z" fill="#000000" />
                      <rect x="-1" y="-2" width="2" height="4" fill="#ffffff" />
                    </>
                  )}
                </g>
                
                {/* Label */}
                <motion.text
                  x={pos.x}
                  y={labelY}
                  textAnchor="middle"
                  fill="white"
                  fontSize={isHovered ? "18" : "16"}
                  fontWeight="600"
                  animate={{ 
                    fill: isHovered ? '#4460EF' : 'white',
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {committee.name}
                </motion.text>
              </motion.g>
            </Link>
          );
        })}
      </svg>
    </div>
  );
};

export default CommitteeNetworkDiagram;
