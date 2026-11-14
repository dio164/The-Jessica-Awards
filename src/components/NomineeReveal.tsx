import React from 'react';
import { motion } from 'framer-motion';
import { AwardCategory } from '../types/awards';
import { BotanicalCorner, PearlGarland } from './BotanicalFrames';
import { RoyalCrest } from './RoyalCrests';
import { Sparkles, Trophy, ArrowLeft, PlusCircle } from 'lucide-react';
import { royalAudio } from '../utils/audio';

interface NomineeRevealProps {
  category: AwardCategory;
  onRevealWinner: () => void;
  onBackToCategory: () => void;
  onOpenSetup: () => void;
}

export const NomineeReveal: React.FC<NomineeRevealProps> = ({
  category,
  onRevealWinner,
  onBackToCategory,
  onOpenSetup,
}) => {
  const handleWinnerClick = () => {
    royalAudio.playDrumRoll(1.4);
    onRevealWinner();
  };

  const nominees = category.nominees;
  const hasNominees = nominees && nominees.length > 0;

  return (
    <div className="relative min-h-[82vh] flex flex-col items-center justify-center px-4 py-8 sm:py-16">
      <div className="relative max-w-5xl w-full mx-auto paper-texture rounded-3xl p-6 sm:p-14 border-2 border-[#DE9EB0]/60 shadow-book-lg text-center flex flex-col items-center z-20">
        {/* Ornate corner filigrees */}
        <BotanicalCorner position="top-left" size={54} color="#B77973" className="absolute top-3 left-3 opacity-80" />
        <BotanicalCorner position="top-right" size={54} color="#B77973" className="absolute top-3 right-3 opacity-80" />
        <BotanicalCorner position="bottom-left" size={54} color="#B77973" className="absolute bottom-3 left-3 opacity-80" />
        <BotanicalCorner position="bottom-right" size={54} color="#B77973" className="absolute bottom-3 right-3 opacity-80" />

        {/* Category Header Bar */}
        <div className="flex items-center space-x-3 mb-2">
          <RoyalCrest type={category.insigniaType} size={42} color="#C5A059" accentColor={category.accentColor} />
          <div className="text-left">
            <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-[#8E4D60] font-semibold block">
              NOMINEES FOR AWARD {category.roman}
            </span>
            <h3 className="text-xl sm:text-2xl font-poem font-bold text-[#4D2531]">
              {category.title}
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm font-poem italic text-[#8B737C] max-w-xl mb-6">
          "{category.citation}"
        </p>

        <PearlGarland className="mb-8 opacity-70" count={7} />

        {/* Nominee Cards Grid */}
        {hasNominees ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 w-full max-w-3xl mb-8">
            {nominees.map((nominee, idx) => (
              <motion.div
                key={`${category.id}-${nominee}-${idx}`}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + idx * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="relative group bg-gradient-to-br from-[#FFFDF9] via-[#FFF9F2] to-[#FAF0F3] p-5 sm:p-6 rounded-2xl border border-[#DE9EB0]/50 shadow-page hover:shadow-gold-glow transition-all duration-300 text-center flex flex-col items-center justify-center"
              >
                {/* Delicate Corner accents on nominee plate */}
                <div className="absolute top-2 left-2 text-[#C5A059]/40 text-xs">❦</div>
                <div className="absolute top-2 right-2 text-[#C5A059]/40 text-xs">❦</div>
                <div className="absolute bottom-2 left-2 text-[#C5A059]/40 text-xs">❦</div>
                <div className="absolute bottom-2 right-2 text-[#C5A059]/40 text-xs">❦</div>

                <div className="text-[10px] uppercase tracking-[0.3em] font-sans text-[#B06B7E] mb-1 font-medium">
                  Royal Nominee No. {idx + 1}
                </div>

                <h4 className="text-2xl sm:text-3xl font-poem font-bold text-[#392B30] tracking-wide my-1">
                  {nominee}
                </h4>

                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#C5A059]/60 to-transparent my-1.5" />

                <span className="text-[11px] font-script text-[#B77973] text-sm">
                  Courtier of Chapter XXIII
                </span>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="my-8 p-8 rounded-2xl bg-[#FAF0F3]/80 border border-[#DE9EB0] max-w-lg mx-auto text-center shadow-page">
            <span className="text-2xl mb-2 block">✦</span>
            <p className="text-xl font-poem text-[#743F4D] mb-1 font-bold">
              Bestowed by Sovereign Royal Decree
            </p>
            <p className="text-xs font-sans text-[#8B737C] mb-4 leading-relaxed max-w-md mx-auto">
              {category.id === 12
                ? 'The court deliberated in sacred confidence. No preliminary nominees were announced for this exalted search for wisdom.'
                : 'No nominees have been recorded yet for this order. You may add names now or proceed directly to the coronation.'}
            </p>
            <button
              onClick={onOpenSetup}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#FAF0F3] hover:bg-[#F3CCD7] text-[#4D2531] border border-[#DE9EB0] font-sans text-xs tracking-wider uppercase font-semibold transition-all shadow-sm"
            >
              <PlusCircle className="w-4 h-4 text-[#C98598]" />
              <span>Edit / Add Nominees</span>
            </button>
          </div>
        )}

        {/* Navigation & Reveal Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between w-full pt-4 border-t border-[#DE9EB0]/30 gap-4">
          <button
            onClick={onBackToCategory}
            className="flex items-center space-x-2 text-xs font-sans uppercase tracking-widest text-[#8B737C] hover:text-[#4D2531] py-2 px-4 rounded-xl hover:bg-[#F8E4EA]/60 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Category View</span>
          </button>

          <button
            onClick={handleWinnerClick}
            className="group relative px-9 py-4 rounded-full bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#9A7730] text-[#2A131A] font-poem text-xl sm:text-2xl font-bold tracking-wider shadow-book hover:shadow-gold-glow transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 border border-[#FFF1CA]/60 flex items-center space-x-3 cursor-pointer"
          >
            <Trophy className="w-5 h-5 text-[#2A131A] group-hover:rotate-12 transition-transform duration-300" />
            <span>AND THE WINNER IS...</span>
            <Sparkles className="w-4 h-4 text-[#2A131A]" />
          </button>
        </div>
      </div>
    </div>
  );
};

