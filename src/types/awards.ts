export type CeremonyStage = 
  | 'welcome' 
  | 'category' 
  | 'nominees' 
  | 'winner' 
  | 'ball';

export interface AwardCategory {
  id: number;
  roman: string;
  title: string;
  citation: string;
  insigniaType: 
    | 'main-character' 
    | 'crown-scepter' 
    | 'golden-lyre' 
    | 'fleur-de-lis' 
    | 'hourglass' 
    | 'seal-crest' 
    | 'winged-heart' 
    | 'rococo-mirror' 
    | 'royal-shield' 
    | 'midnight-lamp' 
    | 'golden-key' 
    | 'royal-tome';
  motifLabel: string;
  accentColor: string;
  nominees: string[];
  winner: string;
}

export interface CeremonySettings {
  soundEnabled: boolean;
  presentationMode: boolean;
  showPresenterCheatsheet: boolean;
}

