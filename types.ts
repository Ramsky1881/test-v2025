
export interface DropdownOption {
  value: string;
  text: string;
}

export interface Character {
  id: string;
  name: string;
  type: string;
  humanCategory?: string;
  country?: string;
  faceShape?: string;
  hairModel?: string;
  hairColor?: string;
  skinColor?: string;
  clothing?: string;
  emotion: string;
  additionalAttributes: string;
  otherDetails: string;
  style: string;
  imagePrefType: 'description' | 'url';
  imagePrefValue: string;
}

export interface CharacterAction {
  id: string;
  characterName: string;
  description: string;
}

export interface DialogueLine {
  id: string;
  speaker: string;
  line: string;
}

export interface FormState {
  mainVideoDescription: string;
  characters: Character[];
  characterActions: CharacterAction[];
  atmosphereMood: string;
  atmosphereLocation: string;
  cameraStyle: string;
  cameraMovement: string;
  cameraAngle: string;
  cameraLighting: string;
  colorGrading: string;
  narrativeType: string;
  narrativeContent: string;
  dialogues: DialogueLine[];
  soundType: string;
  soundVolume: string;
  customSoundDetails: string;
  subtitleOption: string;
  videoOrientation: string;
  videoResolution: string;
  videoQuality: string;
}

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

export type PromptLanguage = 'id' | 'en';
