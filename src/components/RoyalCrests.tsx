import React from 'react';

interface RoyalCrestProps {
  type: string;
  className?: string;
  size?: number;
  color?: string;
  accentColor?: string;
}

export const RoyalCrest: React.FC<RoyalCrestProps> = ({
  type,
  className = '',
  size = 80,
  color = '#C5A059',
  accentColor = '#DE9EB0',
}) => {
  return (
    <div
      className={`inline-flex items-center justify-center select-none pointer-events-none drop-shadow-md ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Outer concentric filigree ring */}
        <circle cx="50" cy="50" r="46" stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.45" />
        <circle cx="50" cy="50" r="42" stroke={color} strokeWidth="1.5" opacity="0.8" />
        <circle cx="50" cy="50" r="39" stroke={accentColor} strokeWidth="0.8" opacity="0.6" />

        {/* 1. Main Character Energy: Radiant Spotlight Tiara */}
        {type === 'main-character' && (
          <g>
            {/* Radiant Sunburst Rays */}
            <path d="M50 14 L50 22 M50 78 L50 86 M14 50 L22 50 M78 50 L86 50 M25 25 L31 31 M69 69 L75 75 M75 25 L69 31 M25 75 L31 69" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />
            {/* Tiara Base */}
            <path d="M30 60 C36 64 64 64 70 60 L68 52 L59 56 L50 44 L41 56 L32 52 Z" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
            <circle cx="50" cy="40" r="3" fill={accentColor} stroke={color} strokeWidth="1" />
            <circle cx="41" cy="53" r="2" fill={color} />
            <circle cx="59" cy="53" r="2" fill={color} />
            <circle cx="50" cy="61" r="2" fill="#FFF9F2" />
          </g>
        )}

        {/* 2. Most Likely to Rule the World: Imperial Scepter & Diadem */}
        {type === 'crown-scepter' && (
          <g>
            {/* Crossed Scepters */}
            <line x1="28" y1="28" x2="72" y2="72" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
            <line x1="72" y1="28" x2="28" y2="72" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
            <circle cx="28" cy="28" r="3.5" fill={accentColor} stroke={color} strokeWidth="1.2" />
            <circle cx="72" cy="28" r="3.5" fill={accentColor} stroke={color} strokeWidth="1.2" />
            {/* Imperial Crown Center */}
            <path d="M34 62 L66 62 L64 46 L55 53 L50 42 L45 53 L36 46 Z" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
            <circle cx="50" cy="38" r="3.5" fill={color} />
            <circle cx="50" cy="38" r="1.5" fill="#FFF9F2" />
          </g>
        )}

        {/* 3. The Best Laugh: Golden Lyre & Melody */}
        {type === 'golden-lyre' && (
          <g>
            {/* Lyre Body */}
            <path d="M34 34 C30 46 36 64 50 66 C64 64 70 46 66 34" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
            <path d="M32 34 C36 34 38 30 36 26" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
            <path d="M68 34 C64 34 62 30 64 26" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
            {/* Lyre Strings */}
            <line x1="42" y1="36" x2="42" y2="64" stroke={accentColor} strokeWidth="1" strokeDasharray="1 1" />
            <line x1="47" y1="36" x2="47" y2="65" stroke={color} strokeWidth="1" />
            <line x1="53" y1="36" x2="53" y2="65" stroke={color} strokeWidth="1" />
            <line x1="58" y1="36" x2="58" y2="64" stroke={accentColor} strokeWidth="1" strokeDasharray="1 1" />
            {/* Base Pedestal */}
            <rect x="42" y="66" width="16" height="5" rx="2" fill={color} opacity="0.8" />
            {/* Joyful sparkles */}
            <circle cx="30" cy="24" r="2" fill={accentColor} />
            <circle cx="70" cy="24" r="2" fill={accentColor} />
          </g>
        )}

        {/* 4. Most Iconic Personality: French Royal Fleur-de-lis */}
        {type === 'fleur-de-lis' && (
          <g>
            {/* Center Petal */}
            <path d="M50 24 C54 36 58 44 50 58 C42 44 46 36 50 24 Z" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.8" />
            {/* Left Curled Petal */}
            <path d="M48 54 C38 52 28 44 32 36 C36 30 42 36 44 42 C45 46 47 50 48 54 Z" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.6" />
            {/* Right Curled Petal */}
            <path d="M52 54 C62 52 72 44 68 36 C64 30 58 36 56 42 C55 46 53 50 52 54 Z" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.6" />
            {/* Ribbon Tie */}
            <rect x="36" y="56" width="28" height="4" rx="2" fill={color} />
            {/* Bottom Tail */}
            <path d="M50 60 C53 66 56 70 50 74 C44 70 47 66 50 60 Z" fill={accentColor} stroke={color} strokeWidth="1.4" />
          </g>
        )}

        {/* 5. Queen of Unforgettable Moments: Vintage Hourglass */}
        {type === 'hourglass' && (
          <g>
            {/* Hourglass Caps */}
            <rect x="34" y="26" width="32" height="4" rx="2" fill={color} />
            <rect x="34" y="70" width="32" height="4" rx="2" fill={color} />
            {/* Glass Bulbs */}
            <path d="M38 30 C38 45 47 48 49 50 C47 52 38 55 38 70 L62 70 C62 55 53 52 51 50 C53 48 62 45 62 30 Z" stroke={color} strokeWidth="1.8" fill="rgba(255,249,242,0.15)" />
            {/* Golden Sand */}
            <path d="M42 36 C44 42 56 42 58 36 Z" fill={color} opacity="0.6" />
            <path d="M42 68 C44 58 56 58 58 68 Z" fill={color} opacity="0.85" />
            <line x1="50" y1="46" x2="50" y2="60" stroke={accentColor} strokeWidth="1.2" strokeDasharray="2 1" />
            {/* Stardust dots */}
            <circle cx="30" cy="48" r="2" fill={accentColor} />
            <circle cx="70" cy="52" r="2" fill={accentColor} />
          </g>
        )}

        {/* 6. Future CEO & Mogul: Sovereign Signet & Wreath */}
        {type === 'seal-crest' && (
          <g>
            {/* Laurel Wreath */}
            <path d="M30 62 C26 50 30 38 40 30" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
            <path d="M70 62 C74 50 70 38 60 30" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
            {/* Wreath leaves */}
            <circle cx="28" cy="46" r="2.5" fill={color} opacity="0.75" />
            <circle cx="32" cy="36" r="2.5" fill={color} opacity="0.75" />
            <circle cx="72" cy="46" r="2.5" fill={color} opacity="0.75" />
            <circle cx="68" cy="36" r="2.5" fill={color} opacity="0.75" />
            {/* Signet Diamond Shield */}
            <polygon points="50,32 64,50 50,68 36,50" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.8" />
            <circle cx="50" cy="50" r="5" fill={accentColor} stroke={color} strokeWidth="1" />
          </g>
        )}

        {/* 7. The Heart of the Room: Winged Heart */}
        {type === 'winged-heart' && (
          <g>
            {/* Angelic Filigree Wings */}
            <path d="M50 52 C38 40 22 42 18 50 C24 54 36 52 44 58" stroke={color} strokeWidth="1.6" fill="rgba(222, 158, 176, 0.2)" />
            <path d="M50 52 C62 40 78 42 82 50 C76 54 64 52 56 58" stroke={color} strokeWidth="1.6" fill="rgba(222, 158, 176, 0.2)" />
            {/* Heart in Center */}
            <path d="M50 68 C50 68 38 58 38 46 C38 38 45 36 50 42 C55 36 62 38 62 46 C62 58 50 68 50 68 Z" fill={accentColor} fillOpacity="0.5" stroke={color} strokeWidth="1.8" />
            <circle cx="50" cy="74" r="2" fill="#FFF9F2" stroke={color} strokeWidth="1" />
          </g>
        )}

        {/* 8. Minister of Aesthetic Excellence: Rococo Handheld Mirror */}
        {type === 'rococo-mirror' && (
          <g>
            {/* Mirror Frame */}
            <ellipse cx="50" cy="44" rx="16" ry="20" stroke={color} strokeWidth="2" fill="rgba(253, 242, 248, 0.5)" />
            {/* Mirror Glass Shimmer */}
            <ellipse cx="50" cy="44" rx="12" ry="16" stroke={accentColor} strokeWidth="0.8" strokeDasharray="3 2" />
            {/* Ornate Handle */}
            <path d="M50 64 L50 78" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="50" cy="80" r="3" fill={color} />
            {/* Crest Rose atop mirror */}
            <circle cx="50" cy="23" r="3.5" fill={accentColor} stroke={color} strokeWidth="1" />
            <path d="M46 24 C44 20 48 18 50 20 C52 18 56 20 54 24" stroke={color} strokeWidth="1" fill="none" />
          </g>
        )}

        {/* 9. Grand Duchess of Loyalty: Heraldic Shield & Lily */}
        {type === 'royal-shield' && (
          <g>
            {/* Damask Shield */}
            <path d="M34 30 L66 30 C66 52 56 66 50 72 C44 66 34 52 34 30 Z" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2" />
            {/* Inner Crest Division */}
            <line x1="50" y1="30" x2="50" y2="70" stroke={color} strokeWidth="1.2" strokeDasharray="2 2" />
            <line x1="34" y1="46" x2="66" y2="46" stroke={color} strokeWidth="1.2" strokeDasharray="2 2" />
            {/* Loyalty Lily Emblem */}
            <circle cx="50" cy="46" r="4.5" fill={accentColor} stroke={color} strokeWidth="1.2" />
            <circle cx="50" cy="46" r="2" fill="#FFF9F2" />
          </g>
        )}

        {/* 10. The Midnight Philosopher: Celestial Lantern & Crescent Moon */}
        {type === 'midnight-lamp' && (
          <g>
            {/* Crescent Moon */}
            <path d="M40 26 C46 26 50 32 48 40 C44 48 36 50 30 46 C36 54 48 54 54 44 C58 36 54 26 44 22 C42 23 41 24 40 26 Z" fill={color} fillOpacity="0.75" />
            {/* Antique Lantern */}
            <rect x="52" y="44" width="16" height="22" rx="3" fill="rgba(255, 241, 202, 0.3)" stroke={color} strokeWidth="1.8" />
            <line x1="60" y1="36" x2="60" y2="44" stroke={color} strokeWidth="1.5" />
            <circle cx="60" cy="35" r="2" fill={color} />
            {/* Lantern Candle Flame */}
            <ellipse cx="60" cy="55" rx="2" ry="4" fill={accentColor} />
            <circle cx="60" cy="55" r="1" fill="#FFF9F2" />
            {/* Starlight */}
            <circle cx="68" cy="28" r="1.5" fill={color} />
            <circle cx="28" cy="32" r="1.5" fill={color} />
          </g>
        )}

        {/* 11. Grand Chancellor of Resourcefulness: Ornate Skeleton Key */}
        {type === 'golden-key' && (
          <g>
            {/* Ornate Key Bow */}
            <circle cx="36" cy="36" r="10" stroke={color} strokeWidth="2" fill="rgba(222, 158, 176, 0.2)" />
            <circle cx="36" cy="36" r="5" stroke={color} strokeWidth="1.2" />
            {/* Key Shaft */}
            <line x1="43" y1="43" x2="68" y2="68" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
            {/* Key Bit teeth */}
            <line x1="68" y1="68" x2="74" y2="62" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <line x1="63" y1="73" x2="69" y2="67" stroke={color} strokeWidth="2" strokeLinecap="round" />
            {/* Ribbon Knot */}
            <path d="M30 44 C26 50 24 56 22 62" stroke={accentColor} strokeWidth="1.4" strokeLinecap="round" />
            <path d="M42 30 C48 26 54 24 60 22" stroke={accentColor} strokeWidth="1.4" strokeLinecap="round" />
          </g>
        )}

        {/* 12. Royal Seeker of Knowledge: Codex Tome & Quill */}
        {type === 'royal-tome' && (
          <g>
            {/* Open Codex Book */}
            <path d="M50 64 C42 60 30 60 26 62 L26 40 C30 38 42 38 50 42 C58 38 70 38 74 40 L74 62 C70 60 58 60 50 64 Z" fill="rgba(255, 249, 242, 0.3)" stroke={color} strokeWidth="1.8" />
            <line x1="50" y1="42" x2="50" y2="64" stroke={color} strokeWidth="1.5" />
            {/* Feather Quill */}
            <path d="M68 24 C56 36 52 46 52 50 C54 48 58 44 64 36 C66 32 68 28 68 24 Z" fill={accentColor} stroke={color} strokeWidth="1.2" />
            <line x1="52" y1="50" x2="48" y2="54" stroke={color} strokeWidth="1.2" />
            {/* Constellation Star */}
            <circle cx="36" cy="48" r="1.5" fill={color} />
            <circle cx="42" cy="52" r="1.5" fill={color} />
          </g>
        )}
      </svg>
    </div>
  );
};

