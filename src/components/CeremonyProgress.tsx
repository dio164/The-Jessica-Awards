import React from 'react';
import { AwardCategory, CeremonyStage } from '../types/awards';
import { Crown, Home, ChevronLeft, ChevronRight } from 'lucide-react';

interface CeremonyProgressProps {
  categories: AwardCategory[];
  currentIndex: number;
  currentStage: CeremonyStage;
  onSelectCategory: (index: number) => void;
  onReturnHome: () => void;
  onPrevAward: () => void;
  onNextAward: () => void;
  isPresentationMode: boolean;
}

export const CeremonyProgress: React.FC<CeremonyProgressProps> = ({
  categories,
  currentIndex,
  currentStage,
  onSelectCategory,
  onReturnHome,
  onPrevAward,
  onNextAward,
  isPresentationMode,
}) => {
  if (currentStage === 'welcome' || currentStage === 'ball') {
    return null;
  }

  const currentCat = categories[currentIndex];
  const stageName = 
    currentStage === 'category' ? 'Category Announcement' :
    currentStage === 'nominees' ? 'Nominees on Court' :
    'Crowned Winner';

  return (
    <div className={`fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 sm:px-8 py-3 bg-[#FAF0F3]/85 backdrop-blur-md border-b border-[#DE9EB0]/40 transition-opacity duration-300 ${isPresentationMode ? 'opacity-40 hover:opacity-100' : 'opacity-100'}`}>
      {/* Left: Home & Current Award Title */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onReturnHome}
          className="p-1.5 rounded-lg hover:bg-[#F3CCD7] text-[#743F4D] transition-colors"
          title="Return to Opening Gates"
        >
          <Home className="w-4 h-4 text-[#8E4D60]" />
        </button>

        <div className="hidden sm:block">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-bold text-[#8E4D60]">
              AWARD {String(currentIndex + 1).padStart(2, '0')} OF 12
            </span>
            <span className="text-[#C5A059]">✦</span>
            <span className="text-xs font-poem font-bold text-[#4D2531] truncate max-w-xs">
              {currentCat.title}
            </span>
          </div>
          <span className="text-[10px] font-sans text-[#8B737C]">
            Stage: {stageName}
          </span>
        </div>
      </div>

      {/* Center: 12 Royal Crown Markers */}
      <div className="flex items-center space-x-1 sm:space-x-1.5">
        <button
          onClick={onPrevAward}
          disabled={currentIndex === 0}
          className="p-1 rounded-md text-[#8E4D60] disabled:opacity-30 hover:bg-[#F3CCD7] transition-colors"
          title="Previous Award"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {categories.map((cat, idx) => {
          const isActive = idx === currentIndex;
          const isPassed = idx < currentIndex;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(idx)}
              className={`group relative p-1.5 rounded-full transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#C5A059] to-[#9A7730] text-[#FFF9F2] shadow-sm scale-110'
                  : isPassed
                  ? 'bg-[#DE9EB0]/60 text-[#743F4D] hover:bg-[#DE9EB0]'
                  : 'bg-white/60 text-gray-400 hover:bg-[#FAF0F3]'
              }`}
              title={`Award ${cat.roman}: ${cat.title}`}
            >
              <Crown className="w-3 h-3" />
              {/* Tooltip on hover */}
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-[#2A131A] text-[#FFF9F2] text-[10px] font-sans py-1 px-2.5 rounded shadow-lg whitespace-nowrap z-50">
                {cat.roman}. {cat.title}
              </div>
            </button>
          );
        })}

        <button
          onClick={onNextAward}
          disabled={currentIndex === categories.length - 1}
          className="p-1 rounded-md text-[#8E4D60] disabled:opacity-30 hover:bg-[#F3CCD7] transition-colors"
          title="Next Award"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Right: Stage Step Indicator */}
      <div className="flex items-center space-x-2">
        <span className="text-[10px] uppercase tracking-widest font-sans text-[#743F4D] bg-[#F8E4EA] px-2.5 py-1 rounded-full border border-[#DE9EB0]/50 font-semibold">
          {currentStage === 'category' ? '1 / 3 Category' : currentStage === 'nominees' ? '2 / 3 Nominees' : '3 / 3 Winner'}
        </span>
      </div>
    </div>
  );
};

