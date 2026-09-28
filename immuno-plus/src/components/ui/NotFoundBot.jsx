import React from 'react';

const NotFoundBot = ({ className }) => (
  <svg 
    viewBox="0 0 480 240" 
    className={className} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* LEFT "4" - Changed to neutral-900 */}
    <text 
      x="70" 
      y="180" 
      fontSize="140" 
      fontWeight="900" 
      fontFamily="system-ui, -apple-system, sans-serif" 
      fill="#171717" 
      textAnchor="middle"
    >
      4
    </text>

    {/* RIGHT "4" - Changed to neutral-900 */}
    <text 
      x="410" 
      y="180" 
      fontSize="140" 
      fontWeight="900" 
      fontFamily="system-ui, -apple-system, sans-serif" 
      fill="#171717" 
      textAnchor="middle"
    >
      4
    </text>

    {/* CENTER "0" (The Robot & Pipes) */}
    <g transform="translate(120, 0)">
      {/* Background Soft Glow (The '0' circle) */}
      <circle cx="120" cy="120" r="90" fill="#dbeafe" opacity="0.8" />
      
      {/* LEFT PIPE - Broken non-uniform edges */}
      <path 
        d="M10 130 L 95 130 L 80 136 L 102 144 L 85 152 L 105 162 L 90 170 L 10 170 Z" 
        fill="#cbd5e1" 
        stroke="#94a3b8" 
        strokeWidth="4" 
        strokeLinejoin="round" 
      />
      {/* Pipe Highlight */}
      <line x1="10" y1="140" x2="80" y2="140" stroke="#f8fafc" strokeWidth="4" opacity="0.6" strokeLinecap="round" />
      
      {/* RIGHT PIPE - Broken non-uniform edges */}
      <path 
        d="M230 130 L 145 130 L 158 138 L 135 146 L 155 155 L 142 164 L 150 170 L 230 170 Z" 
        fill="#cbd5e1" 
        stroke="#94a3b8" 
        strokeWidth="4" 
        strokeLinejoin="round" 
      />
      <line x1="230" y1="140" x2="160" y2="140" stroke="#f8fafc" strokeWidth="4" opacity="0.6" strokeLinecap="round" />

      {/* REPAIR BOT */}
      {/* Antenna */}
      <line x1="120" y1="55" x2="120" y2="30" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
      <circle cx="120" cy="25" r="6" fill="#ef4444" className="animate-pulse" />
      
      {/* Bot Body */}
      <rect x="85" y="55" width="70" height="60" rx="18" fill="#f8fafc" stroke="#94a3b8" strokeWidth="4" />
      
      {/* Bot Face Screen */}
      <rect x="95" y="67" width="50" height="26" rx="6" fill="#0f172a" />
      
      {/* Bot Eyes (X_X showing Error/Fixing state) */}
      <g stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round">
        <line x1="103" y1="75" x2="111" y2="85" />
        <line x1="103" y1="85" x2="111" y2="75" />
        <line x1="129" y1="75" x2="137" y2="85" />
        <line x1="129" y1="85" x2="137" y2="75" />
      </g>
      
      {/* Left Arm with Wrench */}
      <path d="M85 85 Q 55 90 65 125" fill="none" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
      {/* Wrench */}
      <path d="M55 125 C 55 110 75 110 75 125 C 75 130 65 135 65 145 H 55 V 135 C 50 135 55 130 55 125 Z" fill="#64748b" />
      
      {/* Right Arm Fixing Pipe */}
      <path d="M155 85 Q 185 90 145 125" fill="none" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
      {/* Laser/Welding Tool */}
      <circle cx="143" cy="127" r="5" fill="#64748b" />
      <circle cx="138" cy="132" r="3" fill="#ef4444" />
      
      {/* Sparks from welding */}
      <g stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" className="animate-pulse">
        <line x1="135" y1="135" x2="125" y2="140" />
        <line x1="135" y1="135" x2="130" y2="148" />
        <line x1="135" y1="135" x2="145" y2="145" />
      </g>
    </g>
  </svg>
);

export default NotFoundBot;
