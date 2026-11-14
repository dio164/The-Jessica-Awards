import React from 'react';
import { motion } from 'framer-motion';
import { BotanicalCorner, PearlGarland, RoyalWaxSeal } from './BotanicalFrames';
import { RoyalCrest } from './RoyalCrests';
import { Sparkles, RotateCcw, Heart, Home } from 'lucide-react';
import { royalAudio } from '../utils/audio';

interface ClosingScreenProps {
  onRestartCeremony: () => void;
  onReturnToStart: () => void;
}

export const ClosingScreen: React.FC<ClosingScreenProps> = ({
  onRestartCeremony,
  onReturnToStart,
}) => {
  const handleRestart = () => {
    royalAudio.playGentleChime(784, 0.8);
    onRestartCeremony();
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 sm:py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-4xl w-full mx-auto paper-texture rounded-3xl p-8 sm:p-16 border-2 border-[#C5A059] shadow-gold-glow text-center flex flex-col items-center z-20"
      >
        {/* Botanical corner filigrees */}
        <BotanicalCorner position="top-left" size={64} color="#C5A059" className="absolute top-3 left-3 opacity-90" />
        <BotanicalCorner position="top-right" size={64} color="#C5A059" className="absolute top-3 right-3 opacity-90" />
        <BotanicalCorner position="bottom-left" size={64} color="#C5A059" className="absolute bottom-3 left-3 opacity-90" />
        <BotanicalCorner position="bottom-right" size={64} color="#C5A059" className="absolute bottom-3 right-3 opacity-90" />

        {/* Double inner gold border */}
        <div className="absolute inset-4 rounded-2xl border border-dashed border-[#C5A059]/50 pointer-events-none" />

        {/* Top Royal Crest */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mb-4 relative"
        >
          <RoyalCrest type="crown-scepter" size={100} color="#C5A059" accentColor="#DE9EB0" />
          <div className="absolute -top-3 -right-3">
            <RoyalWaxSeal monogram="XXIII" size={48} />
          </div>
        </motion.div>

        {/* Closing Sub-label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex items-center space-x-2 text-xs uppercase tracking-[0.35em] font-sans text-[#8E4D60] font-semibold mb-3"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>The Sovereign Ball of Chapter XXIII</span>
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
        </motion.div>

        {/* Grand Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="text-4xl sm:text-6xl md:text-7xl font-poem font-bold tracking-tight text-[#4D2531] mb-4 leading-none"
        >
          THE ROYAL COURT HAS SPOKEN
        </motion.h1>

        {/* Pearl Divider */}
        <PearlGarland className="my-3 opacity-80" count={11} />

        {/* Supporting Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="my-5 max-w-2xl px-4"
        >
          <p className="text-xl sm:text-2xl font-poem italic text-[#654F57] leading-relaxed">
            "To the remarkable women, unforgettable personalities, beautiful hearts, and extraordinary souls who made this evening special — may you continue to shine in every chapter."
          </p>
        </motion.div>

        {/* Final Benediction */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="my-3 py-3 px-8 rounded-full bg-gradient-to-r from-[#FAF0F3] via-[#FFF9F2] to-[#FAF0F3] border border-[#DE9EB0]/60 shadow-sm"
        >
          <h3 className="text-2xl sm:text-3xl font-poem font-bold tracking-widest text-[#743F4D]">
            LONG LIVE THE QUEENS OF CHAPTER XXIII.
          </h3>
        </motion.div>

        {/* The Winners' Roll of Honour Grid */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="w-full max-w-2xl mt-4 mb-5 p-5 sm:p-6 rounded-2xl bg-[#FFFDF9]/90 border border-[#C5A059]/50 shadow-page text-center"
        >
          <div className="flex items-center justify-center space-x-2 text-[11px] uppercase tracking-[0.3em] font-sans font-bold text-[#8E4D60] mb-3">
            <span className="text-[#C5A059]">✦</span>
            <span>WINNERS' ROLL OF HONOUR</span>
            <span className="text-[#C5A059]">✦</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-3 gap-2.5 sm:gap-3">
            {[
              { name: 'Nahome', crowns: 2 },
              { name: 'Grace', crowns: 2 },
              { name: 'Angel', crowns: 2 },
              { name: 'Virtue', crowns: 1 },
              { name: 'Ife', crowns: 1 },
              { name: 'Mary', crowns: 1 },
              { name: 'Jessica', crowns: 1 },
              { name: 'Claire', crowns: 1 },
              { name: 'Hajar', crowns: 1 },
            ].map((queen) => (
              <div
                key={queen.name}
                className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-b from-[#FFF9F2] to-[#FAF0F3] border border-[#DE9EB0]/40 flex flex-col items-center justify-center shadow-xs"
              >
                <div className="flex items-center space-x-0.5 mb-1">
                  {Array.from({ length: queen.crowns }).map((_, cIdx) => (
                    <span key={cIdx} className="text-[#C5A059] text-xs">👑</span>
                  ))}
                </div>
                <span className="text-base sm:text-lg font-poem font-bold text-[#392B30]">
                  {queen.name}
                </span>
                <span className="text-[10px] font-sans text-[#8E4D60]">
                  {queen.crowns} Award{queen.crowns > 1 ? 's' : ''}
                </span>
              </div>
            ))}
          </div>

          <div className="text-[11px] font-sans text-[#8B737C] mt-3">
            A total of 12 royal orders bestowed across 9 distinct queens of the realm.
          </div>
        </motion.div>

        <p className="text-xs font-sans uppercase tracking-[0.25em] text-[#8B737C] mb-4">
          A Season of Her · November 14, 2026
        </p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-2"
        >
          <button
            onClick={handleRestart}
            className="group relative px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C98598] via-[#B06B7E] to-[#8E4D60] text-[#FFF9F2] font-poem text-lg sm:text-xl font-bold tracking-wider shadow-book hover:shadow-rose-glow transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 border border-[#F3CCD7]/40 flex items-center space-x-2.5 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-[#FFF1CA] group-hover:-rotate-90 transition-transform duration-300" />
            <span>RESTART THE CEREMONY</span>
          </button>

          <button
            onClick={onReturnToStart}
            className="px-6 py-3.5 rounded-full bg-[#FAF0F3] hover:bg-[#F3CCD7] text-[#4D2531] font-sans text-xs uppercase tracking-widest font-semibold border border-[#DE9EB0] transition-colors flex items-center space-x-2"
          >
            <Home className="w-3.5 h-3.5 text-[#B77973]" />
            <span>Return to Opening Gates</span>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

