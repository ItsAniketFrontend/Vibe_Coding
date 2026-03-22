import React from 'react';

export default function Logo({ size = 40, color = "#A03333", className = "" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'block' }}
    >
      {/* Roof Lines */}
      <path 
        d="M 15 45 L 50 15 L 85 45" 
        stroke={color} 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      
      {/* Vertical Lines (Left to Right) */}
      <line x1="22" y1="50" x2="22" y2="65" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <line x1="36" y1="38" x2="36" y2="80" stroke={color} strokeWidth="4" strokeLinecap="round" />
      
      {/* Center Line extending beyond roof */}
      <line x1="50" y1="5" x2="50" y2="95" stroke={color} strokeWidth="4" strokeLinecap="round" />
      
      <line x1="64" y1="50" x2="64" y2="85" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <line x1="78" y1="50" x2="78" y2="65" stroke={color} strokeWidth="4" strokeLinecap="round" />
      
    </svg>
  );
}
