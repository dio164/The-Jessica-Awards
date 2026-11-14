import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AwardCategory } from '../types/awards';
import { BotanicalCorner, PearlGarland, RoyalWaxSeal } from './BotanicalFrames';
import { RoyalCrest } from './RoyalCrests';
import { Sparkles, ArrowRight, ArrowLeft, Crown, Award, RotateCcw } from 'lucide-react';
import { royalAudio } from '../utils/audio';

interface WinnerRevealProps {
  category: AwardCategory;
  categoryIndex: number;
  totalCategories: number;
  onNextAward: () => void;
  onPreviousStage: () => void;
  onReplayReveal: () => void;
}

export const WinnerReveal: React.FC<WinnerRevealProps> = ({
  category,
  categoryIndex,
  totalCategories,
  onNextAward,
  onPreviousStage,
  onReplayReveal,
}) => {
  const [isUnsealed, setIsUnsealed] = useState(false);
  const isFinalAward = categoryIndex === totalCategories - 1;

  useEffect(() => {
    // Elegant royal envelope unsealing sequence
    const timer = setTimeout(() => {
      setIsUnsealed(true);
      royalAudio.playWinnerFanfare();
    }, 900);

    return () => clearTimeout(timer);
  }, [category.id]);

  const winnerName = category.winner || (category.nominees.length > 0 ? category.nominees[0] : 'The Royal Courtier of Honour');

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 sm:py-16">
      {/* Background theatrical spotlight effect */}
      <div className="absolute inset-0 bg-radial-spotlight pointer-events-none opacity-40" />

      <motion.div
        key={`winner-${category.id}`}
        initial={{ opacity: 0, scale: 0.92, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-4xl w-full mx-auto paper-texture rounded-3xl p-8 sm:p-16 border-2 border-[#C5A059] shadow-gold-glow text-center flex flex-col items-center z-20"
      >
        {/* Botanical corner filigrees in antique gold */}
        <BotanicalCorner position="top-left" size={64} color="#C5A059" className="absolute top-3 left-3 opacity-90" />
        <BotanicalCorner position="top-right" size={64} color="#C5A059" className="absolute top-3 right-3 opacity-90" />
        <BotanicalCorner position="bottom-left" size={64} color="#C5A059" className="absolute bottom-3 left-3 opacity-90" />
        <BotanicalCorner position="bottom-right" size={64} color="#C5A059" className="absolute bottom-3 right-3 opacity-90" />

        {/* Double inner gold decorative frame */}
        <div className="absolute inset-4 rounded-2xl border-2 border-[#C5A059]/40 pointer-events-none" />
        <div className="absolute inset-6 rounded-xl border border-dashed border-[#DE9EB0]/50 pointer-events-none" />

        {/* Top Header Badge */}
        <div className="flex items-center space-x-2 text-xs uppercase tracking-[0.35em] font-sans text-[#743F4D] font-bold mb-3">
          <Award className="w-4 h-4 text-[#C5A059]" />
          <span>ROYAL DECREE OF CHAPTER XXIII · ORDER {category.roman}</span>
        </div>

        {/* Category Title */}
        <h3 className="text-2xl sm:text-4xl font-poem font-bold text-[#4D2531] mb-2 tracking-tight">
          {category.title}
        </h3>

        <p className="text-xs sm:text-sm font-poem italic text-[#8B737C] max-w-xl mb-4">
          "{category.citation}"
        </p>

        <PearlGarland className="my-2 opacity-80" count={9} />

        {/* The Sealed Decree / Winner Flourish */}
        <div className="relative my-6 py-6 px-8 sm:px-14 rounded-2xl bg-gradient-to-br from-[#FFF9F2] via-[#FAF0F3] to-[#F8E4EA] border border-[#C5A059]/60 shadow-royal max-w-2xl w-full flex flex-col items-center justify-center min-h-[220px]">
          {/* Subtle Wax Seal Monogram */}
          <div className="absolute -top-6">
            <RoyalWaxSeal monogram="XXIII" size={52} />
          </div>

          <AnimatePresence mode="wait">
            {!isUnsealed ? (
              <motion.div
                key="opening-suspense"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center justify-center py-6"
              >
                <div className="w-12 h-12 rounded-full border-2 border-[#C5A059] border-t-transparent animate-spin mb-4" />
                <p className="text-xs uppercase tracking-[0.35em] font-sans text-[#8E4D60] font-semibold animate-pulse">
                  Unsealing the Sovereign Royal Decree...
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="winner-revealed"
                initial={{ opacity: 0, scale: 0.75, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center w-full"
              >
                {/* Winner Callout Banner */}
                <div className="flex items-center space-x-2 text-xs uppercase tracking-[0.4em] font-sans text-[#9A7730] font-bold mb-3">
                  <Sparkles className="w-4 h-4 text-[#C5A059]" />
                  <span>THE SOVEREIGN WINNER IS</span>
                  <Sparkles className="w-4 h-4 text-[#C5A059]" />
                </div>

                {/* The Winner Nameplate with Crown Flourish */}
                <div className="flex items-center justify-center space-x-3 my-2 w-full">
                  <Crown className="w-8 h-8 sm:w-10 sm:h-10 text-[#C5A059] filter drop-shadow-md animate-bounce" />
                  <h2 className="text-4xl sm:text-6xl md:text-7xl font-poem font-bold tracking-tight text-[#2A131A] drop-shadow-sm gold-foil-text text-center">
                    {winnerName}
                  </h2>
                  <Crown className="w-8 h-8 sm:w-10 sm:h-10 text-[#C5A059] filter drop-shadow-md animate-bounce" />
                </div>

                {/* Unique Category Insignia Beside Citation */}
                <div className="mt-4 flex items-center space-x-3 bg-white/60 px-5 py-2 rounded-full border border-[#C5A059]/40 shadow-sm">
                  <RoyalCrest
                    type={category.insigniaType}
                    size={32}
                    color="#C5A059"
                    accentColor={category.accentColor}
                  />
                  <span className="text-xs uppercase tracking-[0.25em] font-sans font-semibold text-[#743F4D]">
                    Bestowed with {category.motifLabel}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Presenter Replay & Navigation Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between w-full pt-6 border-t border-[#DE9EB0]/40 gap-4 mt-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={onPreviousStage}
              className="flex items-center space-x-2 text-xs font-sans uppercase tracking-widest text-[#8B737C] hover:text-[#4D2531] py-2 px-3 rounded-xl hover:bg-[#F8E4EA]/60 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Nominees</span>
            </button>
            <button
              onClick={onReplayReveal}
              className="flex items-center space-x-1.5 text-xs font-sans uppercase tracking-wider text-[#B77973] hover:text-[#4D2531] py-2 px-3 rounded-xl hover:bg-[#F8E4EA]/60 transition-colors"
              title="Replay fanfare & confetti"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay Reveal</span>
            </button>
          </div>

          <button
            onClick={onNextAward}
            className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-[#C98598] via-[#B06B7E] to-[#8E4D60] text-[#FFF9F2] font-poem text-xl sm:text-2xl font-bold tracking-wider shadow-book hover:shadow-rose-glow transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 border border-[#F3CCD7]/50 flex items-center space-x-3 cursor-pointer"
          >
            <span>{isFinalAward ? 'ENTER THE CLOSING BALL' : 'NEXT ROYAL AWARD'}</span>
            <ArrowRight className="w-5 h-5 text-[#FFF1CA] group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

