import { AwardCategory, CeremonySettings } from '../types/awards';
import { INITIAL_CATEGORIES } from '../config/categories';

const STORAGE_KEY_CATEGORIES = 'jessica_royal_awards_official_v3';
const STORAGE_KEY_SETTINGS = 'jessica_royal_awards_settings_v3';

export const loadStoredCategories = (): AwardCategory[] => {
  if (typeof window === 'undefined') return INITIAL_CATEGORIES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CATEGORIES);
    if (!raw) {
      // First load: initialize with the official list
      localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
      return INITIAL_CATEGORIES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length === 12) {
      return INITIAL_CATEGORIES.map((base, idx) => {
        const match = parsed.find((p: AwardCategory) => p.id === base.id) || parsed[idx];
        return {
          ...base,
          nominees: Array.isArray(match?.nominees) ? match.nominees : base.nominees,
          winner: typeof match?.winner === 'string' && match.winner ? match.winner : base.winner,
        };
      });
    }
  } catch (e) {
    console.error('Failed to load ceremony categories from localStorage', e);
  }
  return INITIAL_CATEGORIES;
};

export const saveStoredCategories = (categories: AwardCategory[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(categories));
  } catch (e) {
    console.error('Failed to save ceremony categories to localStorage', e);
  }
};

export const loadStoredSettings = (): CeremonySettings => {
  const defaults: CeremonySettings = {
    soundEnabled: false,
    presentationMode: false,
    showPresenterCheatsheet: false,
  };
  if (typeof window === 'undefined') return defaults;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SETTINGS);
    if (!raw) return defaults;
    return { ...defaults, ...JSON.parse(raw) };
  } catch {
    return defaults;
  }
};

export const saveStoredSettings = (settings: CeremonySettings): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings', e);
  }
};

export const loadOfficialCategories = (): AwardCategory[] => {
  saveStoredCategories(INITIAL_CATEGORIES);
  return INITIAL_CATEGORIES;
};

export const clearCeremonyData = (): AwardCategory[] => {
  const reset = INITIAL_CATEGORIES.map(cat => ({
    ...cat,
    nominees: [],
    winner: '',
  }));
  saveStoredCategories(reset);
  return reset;
};
