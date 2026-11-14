import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AwardCategory } from '../types/awards';
import { BotanicalCorner, RoyalWaxSeal, PearlGarland } from './BotanicalFrames';
import { RoyalCrest } from './RoyalCrests';
import {
  X,
  Plus,
  Trash2,
  Check,
  Crown,
  Sparkles,
  Download,
  Upload,
  RefreshCw,
  HelpCircle,
  FileSpreadsheet,
} from 'lucide-react';
import { loadOfficialCategories, clearCeremonyData, saveStoredCategories } from '../services/storage';

interface SetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: AwardCategory[];
  onUpdateCategories: (categories: AwardCategory[]) => void;
}

export const SetupModal: React.FC<SetupModalProps> = ({
  isOpen,
  onClose,
  categories,
  onUpdateCategories,
}) => {
  const [selectedCatId, setSelectedCatId] = useState<number>(1);
  const [newNomineeInput, setNewNomineeInput] = useState<string>('');
  const [showNotification, setShowNotification] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentCategory = categories.find((c) => c.id === selectedCatId) || categories[0];

  const notify = (msg: string) => {
    setShowNotification(msg);
    setTimeout(() => setShowNotification(null), 2500);
  };

  const handleAddNominee = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = newNomineeInput.trim();
    if (!trimmed) return;

    if (currentCategory.nominees.includes(trimmed)) {
      notify('This nominee is already recorded for this category');
      return;
    }

    const updated = categories.map((cat) => {
      if (cat.id === currentCategory.id) {
        const nextNominees = [...cat.nominees, trimmed];
        return {
          ...cat,
          nominees: nextNominees,
          // If no winner chosen yet, keep winner empty until chosen
          winner: cat.winner || (nextNominees.length === 1 ? trimmed : cat.winner),
        };
      }
      return cat;
    });

    onUpdateCategories(updated);
    saveStoredCategories(updated);
    setNewNomineeInput('');
    notify(`Nominee "${trimmed}" added!`);
  };

  const handleRemoveNominee = (nameToRemove: string) => {
    const updated = categories.map((cat) => {
      if (cat.id === currentCategory.id) {
        const nextNominees = cat.nominees.filter((n) => n !== nameToRemove);
        return {
          ...cat,
          nominees: nextNominees,
          winner: cat.winner === nameToRemove ? (nextNominees[0] || '') : cat.winner,
        };
      }
      return cat;
    });

    onUpdateCategories(updated);
    saveStoredCategories(updated);
  };

  const handleSelectWinner = (winnerName: string) => {
    const updated = categories.map((cat) => {
      if (cat.id === currentCategory.id) {
        return { ...cat, winner: winnerName };
      }
      return cat;
    });

    onUpdateCategories(updated);
    saveStoredCategories(updated);
    notify(`Winner selected: ${winnerName}`);
  };

  const handleEditNominee = (oldName: string, newName: string) => {
    const trimmed = newName.trim();
    if (!trimmed || trimmed === oldName) return;

    const updated = categories.map((cat) => {
      if (cat.id === currentCategory.id) {
        const nextNominees = cat.nominees.map((n) => (n === oldName ? trimmed : n));
        return {
          ...cat,
          nominees: nextNominees,
          winner: cat.winner === oldName ? trimmed : cat.winner,
        };
      }
      return cat;
    });

    onUpdateCategories(updated);
    saveStoredCategories(updated);
  };

  const handleLoadOfficial = () => {
    if (window.confirm('Restore official Chapter XXIII nominees and winners for all 12 categories?')) {
      const official = loadOfficialCategories();
      onUpdateCategories(official);
      notify('Official Chapter XXIII awards restored!');
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Clear all nominees and winners for all 12 categories?')) {
      const empty = clearCeremonyData();
      onUpdateCategories(empty);
      notify('All nominees have been cleared.');
    }
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(categories, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'the-jessica-awards-registry.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    notify('Registry downloaded as JSON!');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed) && parsed.length === 12) {
          onUpdateCategories(parsed);
          saveStoredCategories(parsed);
          notify('Registry imported successfully!');
        } else {
          alert('Invalid registry format. Expected 12 categories.');
        }
      } catch {
        alert('Failed to parse the imported JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#2A131A]/70 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-5xl paper-texture rounded-3xl border-2 border-[#DE9EB0] shadow-book-lg p-6 sm:p-10 my-auto max-h-[92vh] flex flex-col"
        >
          {/* Ornate corner filigrees */}
          <BotanicalCorner position="top-left" size={48} color="#B77973" className="absolute top-2 left-2 opacity-80" />
          <BotanicalCorner position="top-right" size={48} color="#B77973" className="absolute top-2 right-2 opacity-80" />
          <BotanicalCorner position="bottom-left" size={48} color="#B77973" className="absolute bottom-2 left-2 opacity-80" />
          <BotanicalCorner position="bottom-right" size={48} color="#B77973" className="absolute bottom-2 right-2 opacity-80" />

          {/* Modal Header */}
          <div className="flex items-center justify-between border-b border-[#DE9EB0]/40 pb-4 mb-4">
            <div className="flex items-center space-x-3">
              <RoyalWaxSeal monogram="XXIII" size={44} />
              <div>
                <h3 className="text-2xl sm:text-3xl font-poem font-bold text-[#4D2531]">
                  The Royal Chancery & Registry
                </h3>
                <p className="text-xs font-sans text-[#8B737C]">
                  Configure nominees and crowned winners for the 12 royal orders.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#F3CCD7] text-[#743F4D] transition-colors"
              title="Close Chancery"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Notification Toast */}
          {showNotification && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-3 p-2 text-center text-xs font-sans font-semibold text-[#4D2531] bg-[#FFF1CA] border border-[#C5A059] rounded-lg shadow-sm"
            >
              {showNotification}
            </motion.div>
          )}

          {/* Chancery Body: Split Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 overflow-hidden flex-1">
            {/* Category Selector Rail (Left) */}
            <div className="md:col-span-4 border-r border-[#DE9EB0]/30 pr-3 overflow-y-auto max-h-[58vh] space-y-1.5 custom-scrollbar">
              <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-bold text-[#8E4D60] block mb-2 px-2">
                The 12 Royal Orders
              </span>
              {categories.map((cat) => {
                const isSelected = cat.id === selectedCatId;
                const hasWinner = Boolean(cat.winner);
                const nomineeCount = cat.nominees.length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCatId(cat.id)}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between text-xs ${
                      isSelected
                        ? 'bg-[#FAF0F3] border-2 border-[#C98598] shadow-sm text-[#4D2531] font-semibold'
                        : 'hover:bg-[#FAF0F3]/50 text-[#654F57] border border-transparent'
                    }`}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <span className="font-poem font-bold text-sm text-[#B77973] w-6 text-center">
                        {cat.roman}
                      </span>
                      <span className="truncate">{cat.title}</span>
                    </div>

                    <div className="flex items-center space-x-1 pl-1 flex-shrink-0">
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                          nomineeCount > 0 ? 'bg-[#FFF9F2] text-[#8E4D60]' : 'text-gray-400'
                        }`}
                      >
                        {nomineeCount}
                      </span>
                      {hasWinner && (
                        <span title={`Winner: ${cat.winner}`}>
                          <Crown className="w-3.5 h-3.5 text-[#C5A059]" />
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Category Editor (Right) */}
            <div className="md:col-span-8 flex flex-col overflow-y-auto max-h-[58vh] pl-2 custom-scrollbar">
              {/* Category Info Header */}
              <div className="bg-[#FAF0F3]/80 p-4 rounded-2xl border border-[#DE9EB0]/50 mb-4">
                <div className="flex items-center space-x-3 mb-1">
                  <RoyalCrest
                    type={currentCategory.insigniaType}
                    size={38}
                    color="#C5A059"
                    accentColor={currentCategory.accentColor}
                  />
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-[#8E4D60] font-bold">
                      Order {currentCategory.roman} · {currentCategory.motifLabel}
                    </span>
                    <h4 className="text-lg font-poem font-bold text-[#4D2531]">
                      {currentCategory.title}
                    </h4>
                  </div>
                </div>
                <p className="text-xs font-poem italic text-[#654F57] mt-1 pl-1">
                  "{currentCategory.citation}"
                </p>
              </div>

              {/* Add Nominee Input Form */}
              <form onSubmit={handleAddNominee} className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Enter courtier / nominee name..."
                  value={newNomineeInput}
                  onChange={(e) => setNewNomineeInput(e.target.value)}
                  className="flex-1 px-4 py-2 text-xs font-sans rounded-xl border border-[#DE9EB0] bg-[#FFF9F2] text-[#392B30] focus:outline-none focus:ring-2 focus:ring-[#C98598]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-[#C98598] to-[#8E4D60] text-white text-xs font-sans font-semibold rounded-xl hover:shadow-sm transition-all flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Nominee</span>
                </button>
              </form>

              {/* Nominee List */}
              <div className="flex-1 space-y-2 mb-4">
                <div className="flex items-center justify-between text-[11px] font-sans text-[#8B737C] px-1">
                  <span>Current Nominees ({currentCategory.nominees.length})</span>
                  <span>Crown Crowned Winner</span>
                </div>

                {currentCategory.nominees.length === 0 ? (
                  <div className="p-6 rounded-xl border border-dashed border-[#DE9EB0] text-center text-xs font-sans text-[#8B737C]">
                    No nominees added for this category yet. Type a name above to add one.
                  </div>
                ) : (
                  currentCategory.nominees.map((nominee, idx) => {
                    const isWinner = currentCategory.winner === nominee;

                    return (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                          isWinner
                            ? 'bg-[#FFFDF9] border-[#C5A059] shadow-sm'
                            : 'bg-[#FFF9F2] border-[#DE9EB0]/40'
                        }`}
                      >
                        <div className="flex items-center space-x-2 flex-1 mr-2">
                          <span className="text-xs font-sans text-[#B06B7E] font-medium w-5">
                            {idx + 1}.
                          </span>
                          <input
                            type="text"
                            defaultValue={nominee}
                            onBlur={(e) => handleEditNominee(nominee, e.target.value)}
                            className="bg-transparent border-b border-transparent hover:border-[#DE9EB0] focus:border-[#C98598] focus:outline-none text-xs sm:text-sm font-poem font-bold text-[#392B30] flex-1 py-0.5"
                          />
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleSelectWinner(nominee)}
                            className={`px-3 py-1 rounded-full text-[10px] font-sans uppercase tracking-wider font-bold transition-all flex items-center space-x-1 ${
                              isWinner
                                ? 'bg-gradient-to-r from-[#C5A059] to-[#9A7730] text-[#FFF9F2] shadow-sm'
                                : 'bg-[#FAF0F3] hover:bg-[#F3CCD7] text-[#743F4D]'
                            }`}
                            title={isWinner ? 'Selected Winner' : 'Click to crown as winner'}
                          >
                            <Crown className="w-3 h-3" />
                            <span>{isWinner ? 'Winner' : 'Make Winner'}</span>
                          </button>

                          <button
                            onClick={() => handleRemoveNominee(nominee)}
                            className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                            title="Remove nominee"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Modal Footer Controls */}
          <div className="border-t border-[#DE9EB0]/40 pt-4 mt-3 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2">
              <button
                onClick={handleLoadOfficial}
                className="px-3 py-1.5 rounded-lg bg-[#FAF0F3] hover:bg-[#F3CCD7] text-[#743F4D] border border-[#DE9EB0] flex items-center space-x-1.5 font-sans"
                title="Restore official nominees and winners for all 12 categories"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Restore Official Awards</span>
              </button>

              <button
                onClick={handleClearAll}
                className="px-3 py-1.5 rounded-lg hover:bg-red-50 text-red-600 border border-red-200 flex items-center space-x-1.5 font-sans"
                title="Erase all nominees"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleExportJSON}
                className="px-3 py-1.5 rounded-lg bg-[#FFF9F2] hover:bg-[#FAF0F3] text-[#4D2531] border border-[#DE9EB0] flex items-center space-x-1.5 font-sans"
                title="Backup registry to file"
              >
                <Download className="w-3.5 h-3.5 text-[#8E4D60]" />
                <span>Export Registry</span>
              </button>

              <label className="px-3 py-1.5 rounded-lg bg-[#FFF9F2] hover:bg-[#FAF0F3] text-[#4D2531] border border-[#DE9EB0] flex items-center space-x-1.5 font-sans cursor-pointer">
                <Upload className="w-3.5 h-3.5 text-[#8E4D60]" />
                <span>Import Registry</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportJSON}
                  className="hidden"
                />
              </label>

              <button
                onClick={onClose}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-[#C98598] to-[#8E4D60] text-white font-sans font-semibold tracking-wider uppercase text-[11px] shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                Done / Begin Ceremony
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
