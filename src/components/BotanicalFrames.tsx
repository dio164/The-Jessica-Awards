import React from 'react';

export const BotanicalCorner: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  size?: number;
  color?: string;
}> = ({ position, className = '', size = 52, color = '#B77973' }) => {
  const getTransform = () => {
    switch (position) {
      case 'top-left':
        return '';
      case 'top-right':
        return 'scaleX(-1)';
      case 'bottom-left':
        return 'scaleY(-1)';
      case 'bottom-right':
        return 'scale(-1, -1)';
    }
  };

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none inline-block ${className}`}
      style={{
        width: size,
        height: size,
        transform: getTransform(),
      }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <path
          d="M 6 94 C 6 45, 45 6, 94 6"
          stroke={color}
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d="M 14 94 C 14 50, 50 14, 94 14"
          stroke={color}
          strokeWidth="0.9"
          strokeDasharray="2 3"
          opacity="0.6"
        />
        {/* Acanthus leaf cluster */}
        <path
          d="M 12 12 C 24 8, 32 18, 22 28 C 16 26, 10 20, 12 12 Z"
          fill={color}
          opacity="0.75"
        />
        <path
          d="M 12 12 C 18 24, 28 32, 28 22 C 26 16, 20 10, 12 12 Z"
          fill={color}
          opacity="0.75"
        />
        {/* Gilded pearls */}
        <circle cx="28" cy="8" r="2.8" fill={color} opacity="0.85" />
        <circle cx="8" cy="28" r="2.8" fill={color} opacity="0.85" />
        <circle cx="12" cy="12" r="3.8" fill="#FFF9F2" stroke={color} strokeWidth="1" />
        {/* Rococo scrolls */}
        <path
          d="M 94 6 C 88 12, 85 18, 88 22 C 92 24, 95 20, 93 16"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d="M 6 94 C 12 88, 18 85, 22 88 C 24 92, 20 95, 16 93"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>
    </div>
  );
};

export const RoyalWaxSeal: React.FC<{
  monogram?: string;
  size?: number;
  className?: string;
}> = ({ monogram = 'XXIII', size = 64, className = '' }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none pointer-events-none drop-shadow-lg ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <radialGradient id="waxGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#DE9EB0" />
            <stop offset="45%" stopColor="#B06B7E" />
            <stop offset="85%" stopColor="#743F4D" />
            <stop offset="100%" stopColor="#4D2531" />
          </radialGradient>
          <filter id="waxGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#2A131A" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* Melted organic wax edge */}
        <path
          d="M50 4 C65 2, 82 12, 92 24 C100 38, 98 62, 92 76 C84 90, 68 98, 50 96 C32 98, 14 90, 8 76 C2 60, 0 38, 8 24 C18 12, 35 2, 50 4 Z"
          fill="url(#waxGrad)"
          filter="url(#waxGlow)"
        />

        {/* Embossed inner rim */}
        <circle cx="50" cy="50" r="34" stroke="#FFF1CA" strokeWidth="1.2" strokeDasharray="3 2" opacity="0.6" />
        <circle cx="50" cy="50" r="30" stroke="#FAF0F3" strokeWidth="0.8" opacity="0.4" />

        {/* Crown & Monogram */}
        <path
          d="M40 38 L60 38 L58 46 L50 42 L42 46 Z"
          fill="#FFF1CA"
          opacity="0.8"
        />
        <text
          x="50"
          y="64"
          textAnchor="middle"
          fill="#FFF9F2"
          fontSize="14"
          fontWeight="bold"
          fontFamily="'EB Garamond', Georgia, serif"
          letterSpacing="2"
          opacity="0.9"
        >
          {monogram}
        </text>
      </svg>
    </div>
  );
};

export const PearlGarland: React.FC<{ className?: string; count?: number }> = ({
  className = '',
  count = 7,
}) => {
  return (
    <div className={`flex items-center justify-center space-x-2 select-none pointer-events-none ${className}`} aria-hidden="true">
      <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent opacity-60" />
      {Array.from({ length: count }).map((_, idx) => (
        <span
          key={idx}
          className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-white via-[#FAF0F3] to-[#DE9EB0] border border-[#C5A059]/40 shadow-sm"
        />
      ))}
      <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent opacity-60" />
    </div>
  );
};

export const RococoFrame: React.FC<{
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}> = ({ children, className = '', glow = false }) => {
  return (
    <div
      className={`relative paper-texture rounded-3xl p-6 sm:p-12 border border-[#DE9EB0]/60 ${
        glow ? 'shadow-gold-glow' : 'shadow-book-lg'
      } transition-all duration-700 ${className}`}
    >
      {/* 4 Corner filigrees */}
      <BotanicalCorner position="top-left" size={54} color="#B77973" className="absolute top-2 left-2 opacity-80" />
      <BotanicalCorner position="top-right" size={54} color="#B77973" className="absolute top-2 right-2 opacity-80" />
      <BotanicalCorner position="bottom-left" size={54} color="#B77973" className="absolute bottom-2 left-2 opacity-80" />
      <BotanicalCorner position="bottom-right" size={54} color="#B77973" className="absolute bottom-2 right-2 opacity-80" />

      {/* Subtle inner gold dashed border */}
      <div className="absolute inset-3 sm:inset-4 rounded-2xl border border-dashed border-[#C5A059]/30 pointer-events-none" />

      {children}
    </div>
  );
};

