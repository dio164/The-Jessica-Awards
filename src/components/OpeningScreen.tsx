import React from 'react';
import { motion } from 'framer-motion';
import { BotanicalCorner, PearlGarland, RoyalWaxSeal } from './BotanicalFrames';
import { RoyalCrest } from './RoyalCrests';
import { Sparkles, SlidersHorizontal, Maximize2 } from 'lucide-react';
import { royalAudio } from '../utils/audio';

interface OpeningScreenProps {
  onEnterCourt: () => void;
  onOpenSetup: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
}

export const OpeningScreen: React.FC<OpeningScreenProps> = ({
  onEnterCourt,
  onOpenSetup,
  onToggleFullscreen,
  isFullscreen,
}) => {
  const handleEnter = () => {
    royalAudio.playCourtEntrance();
    onEnterCourt();
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 sm:py-20">
      {/* Centerpiece Rococo Parchment Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-3xl w-full mx-auto paper-texture rounded-3xl p-8 sm:p-16 border-2 border-[#DE9EB0]/60 shadow-book-lg text-center flex flex-col items-center z-20"
      >
        {/* Botanical filigree corners */}
        <BotanicalCorner position="top-left" size={64} color="#B77973" className="absolute top-3 left-3 opacity-80" />
        <BotanicalCorner position="top-right" size={64} color="#B77973" className="absolute top-3 right-3 opacity-80" />
        <BotanicalCorner position="bottom-left" size={64} color="#B77973" className="absolute bottom-3 left-3 opacity-80" />
        <BotanicalCorner position="bottom-right" size={64} color="#B77973" className="absolute bottom-3 right-3 opacity-80" />

        {/* Outer dashed hairline border */}
        <div className="absolute inset-4 rounded-2xl border border-dashed border-[#C5A059]/40 pointer-events-none" />

        {/* Top Royal Insignia Crest */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mb-5 relative"
        >
          <RoyalCrest type="crown-scepter" size={96} color="#C5A059" accentColor="#DE9EB0" />
          <div className="absolute -top-3 -right-3">
            <RoyalWaxSeal monogram="XXIII" size={44} />
          </div>
        </motion.div>

        {/* Chapter Designation */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex items-center space-x-3 mb-2"
        >
          <span className="text-xs uppercase tracking-[0.35em] font-sans text-[#8E4D60] font-semibold">
            A Season of Her · The Jessica Edition
          </span>
        </motion.div>

        {/* Grand Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="text-4xl sm:text-6xl md:text-7xl font-poem font-bold tracking-tight text-[#4D2531] mb-2 leading-none"
        >
          THE JESSICA AWARDS
        </motion.h1>

        {/* Cursive Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="text-2xl sm:text-3xl font-script text-[#B06B7E] mb-4"
        >
          A Celebration of Excellence, Elegance & Extraordinary Personalities
        </motion.p>

        {/* Pearl Divider */}
        <PearlGarland className="my-3 opacity-75" count={9} />

        {/* Royal Court of Chapter XXIII */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="my-3 text-center"
        >
          <p className="text-sm uppercase tracking-[0.3em] font-poem font-semibold text-[#743F4D]">
            THE ROYAL COURT OF CHAPTER XXIII
          </p>
          <p className="text-xs tracking-[0.25em] font-sans text-[#8B737C] mt-1">
            November 14, 2026
          </p>
        </motion.div>

        {/* Enter The Royal Court Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-6 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={handleEnter}
            className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-[#C98598] via-[#B06B7E] to-[#8E4D60] text-[#FFF9F2] font-poem text-xl sm:text-2xl font-bold tracking-wider shadow-book hover:shadow-rose-glow transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 border border-[#F3CCD7]/40 flex items-center space-x-3 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-[#FFF1CA] group-hover:rotate-12 transition-transform duration-300" />
            <span>ENTER THE ROYAL COURT</span>
            <span className="text-sm font-sans tracking-widest text-[#FFF1CA] opacity-90 pl-1">✦</span>
          </button>
        </motion.div>

        {/* Discreet Setup / Presenter Utilities */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-8 pt-6 border-t border-[#DE9EB0]/30 w-full flex items-center justify-between text-xs text-[#8B737C]"
        >
          <button
            onClick={onOpenSetup}
            className="flex items-center space-x-1.5 hover:text-[#4D2531] transition-colors py-1 px-3 rounded-lg hover:bg-[#F8E4EA]/50"
            title="Configure nominees & winners"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#B77973]" />
            <span>Curate Nominees & Winners</span>
          </button>

          <button
            onClick={onToggleFullscreen}
            className="flex items-center space-x-1.5 hover:text-[#4D2531] transition-colors py-1 px-3 rounded-lg hover:bg-[#F8E4EA]/50"
            title="Toggle Fullscreen for Presentation Screen"
          >
            <Maximize2 className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>{isFullscreen ? 'Exit Fullscreen' : 'Presentation Fullscreen'}</span>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

