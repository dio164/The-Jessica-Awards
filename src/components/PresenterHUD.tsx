import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  SlidersHorizontal,
  Keyboard,
  Eye,
  EyeOff,
  HelpCircle,
  X,
} from 'lucide-react';
import { royalAudio } from '../utils/audio';

interface PresenterHUDProps {
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
  onOpenSetup: () => void;
  isPresentationMode: boolean;
  onTogglePresentationMode: () => void;
}

export const PresenterHUD: React.FC<PresenterHUDProps> = ({
  isFullscreen,
  onToggleFullscreen,
  isSoundEnabled,
  onToggleSound,
  onOpenSetup,
  isPresentationMode,
  onTogglePresentationMode,
}) => {
  const [showCheatsheet, setShowCheatsheet] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <>
      {/* Floating Bottom HUD */}
      <div className={`fixed bottom-4 right-4 z-40 transition-all duration-300 ${isPresentationMode ? 'opacity-30 hover:opacity-100' : 'opacity-90'}`}>
        <div className="flex items-center space-x-1.5 p-1.5 rounded-full bg-[#2A131A]/85 backdrop-blur-md border border-[#C5A059]/40 text-[#FFF9F2] shadow-book">
          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              if (isSoundEnabled) {
                royalAudio.setMuted(true);
              } else {
                royalAudio.setMuted(false);
                royalAudio.playGentleChime(880, 0.4);
              }
            }}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            title={isSoundEnabled ? 'Mute Royal Audio' : 'Unmute Royal Audio (Fanfares & Chimes)'}
          >
            {isSoundEnabled ? (
              <Volume2 className="w-4 h-4 text-[#FFF1CA]" />
            ) : (
              <VolumeX className="w-4 h-4 text-white/50" />
            )}
          </button>

          {/* Setup / Registry */}
          <button
            onClick={onOpenSetup}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            title="Curate Royal Nominees & Winners"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#DE9EB0]" />
          </button>

          {/* Keyboard Cheatsheet */}
          <button
            onClick={() => setShowCheatsheet(!showCheatsheet)}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            title="Keyboard Shortcuts Guide"
          >
            <Keyboard className="w-4 h-4 text-[#C5A059]" />
          </button>

          {/* Presentation Mode Toggle */}
          <button
            onClick={onTogglePresentationMode}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            title={isPresentationMode ? 'Exit Presentation Mode (Show Controls)' : 'Enter Presentation Mode (Hide HUD for Audience)'}
          >
            {isPresentationMode ? (
              <Eye className="w-4 h-4 text-[#FFF1CA]" />
            ) : (
              <EyeOff className="w-4 h-4 text-white/60" />
            )}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={onToggleFullscreen}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen (For Big Screen)'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4 text-[#FFF1CA]" />
            ) : (
              <Maximize2 className="w-4 h-4 text-[#C5A059]" />
            )}
          </button>
        </div>
      </div>

      {/* Keyboard Shortcuts Modal / Flyout */}
      <AnimatePresence>
        {showCheatsheet && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="paper-texture rounded-2xl p-6 border-2 border-[#C5A059] shadow-book-lg max-w-sm w-full text-center relative"
            >
              <button
                onClick={() => setShowCheatsheet(false)}
                className="absolute top-3 right-3 text-[#743F4D] hover:text-[#2A131A]"
              >
                <X className="w-4 h-4" />
              </button>

              <h4 className="text-xl font-poem font-bold text-[#4D2531] mb-1">
                Presenter Hotkeys
              </h4>
              <p className="text-[11px] font-sans text-[#8B737C] mb-4">
                Jessica can control the entire ceremony with her laptop keyboard:
              </p>

              <div className="space-y-2 text-xs font-sans text-left">
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#FAF0F3]">
                  <span className="font-semibold text-[#4D2531]">Spacebar / →</span>
                  <span className="text-[#8E4D60]">Advance to next manual stage</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#FAF0F3]">
                  <span className="font-semibold text-[#4D2531]">← (Left Arrow)</span>
                  <span className="text-[#8E4D60]">Return to previous stage</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#FAF0F3]">
                  <span className="font-semibold text-[#4D2531]">F Key</span>
                  <span className="text-[#8E4D60]">Toggle Fullscreen mode</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#FAF0F3]">
                  <span className="font-semibold text-[#4D2531]">M Key</span>
                  <span className="text-[#8E4D60]">Toggle Royal Sound effects</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#FAF0F3]">
                  <span className="font-semibold text-[#4D2531]">Esc</span>
                  <span className="text-[#8E4D60]">Exit Fullscreen or close dialogs</span>
                </div>
              </div>

              <button
                onClick={() => setShowCheatsheet(false)}
                className="mt-4 px-4 py-1.5 rounded-full bg-[#8E4D60] text-white text-xs font-sans font-semibold tracking-wider uppercase"
              >
                Close Guide
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

