import React from 'react';
import { motion } from 'framer-motion';
import { AwardCategory } from '../types/awards';
import { BotanicalCorner, PearlGarland, RoyalWaxSeal } from './BotanicalFrames';
import { RoyalCrest } from './RoyalCrests';
import { Sparkles, Users } from 'lucide-react';
import { royalAudio } from '../utils/audio';

interface CategoryRevealProps {
  category: AwardCategory;
  categoryIndex: number;
  totalCategories: number;
  onRevealNominees: () => void;
  onOpenSetup: () => void;
}

export const CategoryReveal: React.FC<CategoryRevealProps> = ({
  category,
  categoryIndex,
  totalCategories,
  onRevealNominees,
  onOpenSetup,
}) => {
  const handleReveal = () => {
    royalAudio.playHarpSweep();
    onRevealNominees();
  };

  return (
    <div className="relative min-h-[82vh] flex items-center justify-center px-4 py-8 sm:py-16">
      <motion.div
        key={`category-${category.id}`}
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-4xl w-full mx-auto paper-texture rounded-3xl p-8 sm:p-16 border-2 border-[#DE9EB0]/60 shadow-book-lg text-center flex flex-col items-center z-20"
      >
        {/* Ornate corner filigrees */}
        <BotanicalCorner position="top-left" size={60} color="#B77973" className="absolute top-3 left-3 opacity-80" />
        <BotanicalCorner position="top-right" size={60} color="#B77973" className="absolute top-3 right-3 opacity-80" />
        <BotanicalCorner position="bottom-left" size={60} color="#B77973" className="absolute bottom-3 left-3 opacity-80" />
        <BotanicalCorner position="bottom-right" size={60} color="#B77973" className="absolute bottom-3 right-3 opacity-80" />

        {/* Inner gold frame border */}
        <div className="absolute inset-4 rounded-2xl border border-dashed border-[#C5A059]/40 pointer-events-none" />

        {/* Category Number Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex items-center space-x-3 mb-4"
        >
          <span className="text-xs uppercase tracking-[0.35em] font-sans font-semibold text-[#8E4D60] bg-[#FAF0F3] px-4 py-1.5 rounded-full border border-[#DE9EB0]/50 shadow-sm">
            ORDER OF MERIT · AWARD {category.roman} OF {totalCategories}
          </span>
        </motion.div>

        {/* Unique Category Insignia */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0, rotate: -6 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
          className="relative mb-5"
        >
          <RoyalCrest
            type={category.insigniaType}
            size={110}
            color="#C5A059"
            accentColor={category.accentColor}
          />
          <div className="absolute -bottom-2 -right-2">
            <RoyalWaxSeal monogram={category.roman} size={38} />
          </div>
        </motion.div>

        {/* Motif Tag */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-xs uppercase tracking-[0.28em] font-sans text-[#B06B7E] mb-3"
        >
          {category.motifLabel}
        </motion.span>

        {/* Award Category Title */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="text-3xl sm:text-5xl md:text-6xl font-poem font-bold tracking-tight text-[#4D2531] mb-5 max-w-3xl leading-tight"
        >
          {category.title}
        </motion.h2>

        {/* Pearl Divider */}
        <PearlGarland className="my-2 opacity-80" count={7} />

        {/* Citation in Refined Serif Italic */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="my-5 max-w-2xl px-4"
        >
          <p className="text-xl sm:text-2xl md:text-3xl font-poem italic text-[#654F57] leading-relaxed">
            "{category.citation}"
          </p>
        </motion.div>

        {/* Nominee Count Preview or Warning */}
        <div className="mb-6">
          {category.nominees.length > 0 ? (
            <span className="text-xs font-sans text-[#8B737C] tracking-widest uppercase">
              {category.nominees.length} Distinguished Nominee{category.nominees.length > 1 ? 's' : ''} Awaiting Reveal
            </span>
          ) : (
            <div className="inline-flex items-center space-x-2 text-xs font-sans text-[#8E4D60] bg-[#FFF1CA]/40 px-3 py-1.5 rounded-full border border-[#C5A059]/40">
              <span>No nominees entered yet.</span>
              <button
                onClick={onOpenSetup}
                className="underline font-semibold hover:text-[#4D2531]"
              >
                Add nominees now
              </button>
            </div>
          )}
        </div>

        {/* Reveal Nominees Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-2"
        >
          <button
            onClick={handleReveal}
            className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-[#C98598] via-[#B06B7E] to-[#8E4D60] text-[#FFF9F2] font-poem text-xl sm:text-2xl font-bold tracking-wider shadow-book hover:shadow-rose-glow transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 border border-[#F3CCD7]/40 flex items-center space-x-3 cursor-pointer"
          >
            <Users className="w-5 h-5 text-[#FFF1CA] group-hover:scale-110 transition-transform duration-300" />
            <span>REVEAL THE NOMINEES</span>
            <Sparkles className="w-4 h-4 text-[#FFF1CA]" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

