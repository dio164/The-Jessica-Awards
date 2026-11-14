import React, { useState, useEffect, useCallback } from 'react';
import { CeremonyStage, AwardCategory, CeremonySettings } from './types/awards';
import {
  loadStoredCategories,
  saveStoredCategories,
  loadStoredSettings,
  saveStoredSettings,
} from './services/storage';
import { royalAudio } from './utils/audio';

import { RoyalParticles } from './components/RoyalParticles';
import { OpeningScreen } from './components/OpeningScreen';
import { CategoryReveal } from './components/CategoryReveal';
import { NomineeReveal } from './components/NomineeReveal';
import { WinnerReveal } from './components/WinnerReveal';
import { ClosingScreen } from './components/ClosingScreen';
import { CeremonyProgress } from './components/CeremonyProgress';
import { PresenterHUD } from './components/PresenterHUD';
import { SetupModal } from './components/SetupModal';

export function App() {
  const [categories, setCategories] = useState<AwardCategory[]>(loadStoredCategories);
  const [settings, setSettings] = useState<CeremonySettings>(loadStoredSettings);
  const [currentAwardIndex, setCurrentAwardIndex] = useState<number>(0);
  const [currentStage, setCurrentStage] = useState<CeremonyStage>('welcome');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isSetupOpen, setIsSetupOpen] = useState<boolean>(false);
  const [celebrationTrigger, setCelebrationTrigger] = useState<number>(0);

  // Sync sound settings with audio engine
  useEffect(() => {
    royalAudio.setMuted(!settings.soundEnabled);
  }, [settings.soundEnabled]);

  // Handle Fullscreen state change events
  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  const toggleSound = useCallback(() => {
    setSettings((prev) => {
      const next = { ...prev, soundEnabled: !prev.soundEnabled };
      saveStoredSettings(next);
      return next;
    });
  }, []);

  const togglePresentationMode = useCallback(() => {
    setSettings((prev) => {
      const next = { ...prev, presentationMode: !prev.presentationMode };
      saveStoredSettings(next);
      return next;
    });
  }, []);

  // Stage Transitions (EXPLICIT USER ACTIONS ONLY - NO AUTOPLAY)
  const handleEnterCourt = useCallback(() => {
    setCurrentAwardIndex(0);
    setCurrentStage('category');
  }, []);

  const handleRevealNominees = useCallback(() => {
    setCurrentStage('nominees');
  }, []);

  const handleRevealWinner = useCallback(() => {
    setCurrentStage('winner');
    setCelebrationTrigger((prev) => prev + 1);
  }, []);

  const handleNextAward = useCallback(() => {
    if (currentAwardIndex < categories.length - 1) {
      setCurrentAwardIndex((prev) => prev + 1);
      setCurrentStage('category');
      royalAudio.playGentleChime(659, 0.5);
    } else {
      // Reached conclusion of all 12 awards
      setCurrentStage('ball');
      setCelebrationTrigger((prev) => prev + 1);
      royalAudio.playWinnerFanfare();
    }
  }, [currentAwardIndex, categories.length]);

  const handlePrevStage = useCallback(() => {
    if (currentStage === 'winner') {
      setCurrentStage('nominees');
    } else if (currentStage === 'nominees') {
      setCurrentStage('category');
    } else if (currentStage === 'category' && currentAwardIndex > 0) {
      setCurrentAwardIndex((prev) => prev - 1);
      setCurrentStage('winner');
    }
  }, [currentStage, currentAwardIndex]);

  const handleSelectCategory = useCallback((index: number) => {
    if (index >= 0 && index < categories.length) {
      setCurrentAwardIndex(index);
      setCurrentStage('category');
      royalAudio.playGentleChime(784, 0.4);
    }
  }, [categories.length]);

  const handleRestartCeremony = useCallback(() => {
    setCurrentAwardIndex(0);
    setCurrentStage('category');
  }, []);

  const handleReturnHome = useCallback(() => {
    setCurrentStage('welcome');
  }, []);

  // Keyboard navigation controls for presenter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Do not trigger if modal is open or typing inside an input/textarea
      const target = e.target as HTMLElement;
      if (
        isSetupOpen ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      if (e.code === 'Space' || e.key === 'ArrowRight') {
        e.preventDefault();
        if (currentStage === 'welcome') {
          handleEnterCourt();
        } else if (currentStage === 'category') {
          handleRevealNominees();
        } else if (currentStage === 'nominees') {
          handleRevealWinner();
        } else if (currentStage === 'winner') {
          handleNextAward();
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevStage();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        toggleSound();
      } else if (e.key === 'Escape') {
        if (isSetupOpen) {
          setIsSetupOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    currentStage,
    currentAwardIndex,
    isSetupOpen,
    handleEnterCourt,
    handleRevealNominees,
    handleRevealWinner,
    handleNextAward,
    handlePrevStage,
    toggleFullscreen,
    toggleSound,
  ]);

  const currentCategory = categories[currentAwardIndex] || categories[0];
  const isCelebrationStage = currentStage === 'winner' || currentStage === 'ball';

  return (
    <main className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden selection:bg-[#F3CCD7] selection:text-[#743F4D]">
      {/* Background Ambient Particles & Shimmer */}
      <RoyalParticles
        key={`particles-${celebrationTrigger}-${currentStage}`}
        intensity={isCelebrationStage ? 'celebration' : 'ambient'}
      />

      {/* Ceremony Navigation / Progress Bar */}
      <CeremonyProgress
        categories={categories}
        currentIndex={currentAwardIndex}
        currentStage={currentStage}
        onSelectCategory={handleSelectCategory}
        onReturnHome={handleReturnHome}
        onPrevAward={() => handleSelectCategory(Math.max(0, currentAwardIndex - 1))}
        onNextAward={() => handleSelectCategory(Math.min(categories.length - 1, currentAwardIndex + 1))}
        isPresentationMode={settings.presentationMode}
      />

      {/* Main Ceremony Canvas / Stage Container */}
      <div className="flex-1 flex flex-col items-center justify-center w-full z-20">
        {currentStage === 'welcome' && (
          <OpeningScreen
            onEnterCourt={handleEnterCourt}
            onOpenSetup={() => setIsSetupOpen(true)}
            onToggleFullscreen={toggleFullscreen}
            isFullscreen={isFullscreen}
          />
        )}

        {currentStage === 'category' && (
          <CategoryReveal
            category={currentCategory}
            categoryIndex={currentAwardIndex}
            totalCategories={categories.length}
            onRevealNominees={handleRevealNominees}
            onOpenSetup={() => setIsSetupOpen(true)}
          />
        )}

        {currentStage === 'nominees' && (
          <NomineeReveal
            category={currentCategory}
            onRevealWinner={handleRevealWinner}
            onBackToCategory={() => setCurrentStage('category')}
            onOpenSetup={() => setIsSetupOpen(true)}
          />
        )}

        {currentStage === 'winner' && (
          <WinnerReveal
            category={currentCategory}
            categoryIndex={currentAwardIndex}
            totalCategories={categories.length}
            onNextAward={handleNextAward}
            onPreviousStage={() => setCurrentStage('nominees')}
            onReplayReveal={() => {
              setCelebrationTrigger((prev) => prev + 1);
              royalAudio.playWinnerFanfare();
            }}
          />
        )}

        {currentStage === 'ball' && (
          <ClosingScreen
            onRestartCeremony={handleRestartCeremony}
            onReturnToStart={handleReturnHome}
          />
        )}
      </div>

      {/* Presenter Utility Floating HUD */}
      <PresenterHUD
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        isSoundEnabled={settings.soundEnabled}
        onToggleSound={toggleSound}
        onOpenSetup={() => setIsSetupOpen(true)}
        isPresentationMode={settings.presentationMode}
        onTogglePresentationMode={togglePresentationMode}
      />

      {/* Setup / Registry Chancery Modal */}
      <SetupModal
        isOpen={isSetupOpen}
        onClose={() => setIsSetupOpen(false)}
        categories={categories}
        onUpdateCategories={setCategories}
      />
    </main>
  );
}

export default App;

