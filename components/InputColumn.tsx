
import React, { useCallback } from 'react';
import type { FormState, Character, CharacterAction, DialogueLine } from '../types';
import {
    CHARACTER_TYPE_OPTIONS, HUMAN_CATEGORY_OPTIONS, COUNTRY_OPTIONS, FACE_SHAPE_OPTIONS, HAIR_MODEL_OPTIONS, HAIR_COLOR_OPTIONS, SKIN_COLOR_OPTIONS, CLOTHING_OPTIONS,
    EMOTION_OPTIONS, ADDITIONAL_ATTRIBUTE_OPTIONS, CHARACTER_STYLE_OPTIONS, ATMOSPHERE_MOOD_OPTIONS, CAMERA_STYLE_OPTIONS, CAMERA_MOVEMENT_OPTIONS, CAMERA_ANGLE_OPTIONS,
    CAMERA_LIGHTING_OPTIONS, COLOR_GRADING_OPTIONS, NARRATIVE_TYPE_OPTIONS, SOUND_TYPE_OPTIONS, SOUND_VOLUME_OPTIONS, SUBTITLE_OPTIONS, VIDEO_ORIENTATION_OPTIONS,
    VIDEO_RESOLUTION_OPTIONS, VIDEO_QUALITY_OPTIONS
} from '../constants';
import { SectionCard } from './SectionCard';
import { FormField, SelectField, TextareaField, CharacterInputField, CharacterActionInputField, DialogueInputField } from './FormControls';
import { Button } from './Button';
import { CopyIcon, LightbulbIcon, PlusIcon } from './Icons';
import { useToast } from '../contexts/ToastContext';


interface InputColumnProps {
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  onInputChange: <K extends keyof FormState, V extends FormState[K]>(name: K, value: V) => void;
  onGenerateStoryIdea: () => Promise<void>;
  isGeneratingStory: boolean;
  onGenerateFinalPrompt: () => Promise<void>;
  isGeneratingFinalPrompt: boolean;
}

export const InputColumn: React.FC<InputColumnProps> = ({
  formState, setFormState, onInputChange, onGenerateStoryIdea, isGeneratingStory, onGenerateFinalPrompt, isGeneratingFinalPrompt
}) => {
  const { addToast } = useToast();

  const handleCharacterChange = useCallback((index: number, updatedCharacter: Character) => {
    const newCharacters = [...formState.characters];
    newCharacters[index] = updatedCharacter;
    onInputChange('characters', newCharacters);
  }, [formState.characters, onInputChange]);

  const addCharacter = useCallback(() => {
    const newCharacter: Character = { 
        id: crypto.randomUUID(), name: `Karakter ${formState.characters.length + 1}`, type: '', humanCategory: '', country: '', faceShape: '', hairModel: '', hairColor: '', skinColor: '', clothing: '', emotion: '', additionalAttributes: '', otherDetails: '', style: '', imagePrefType: 'description', imagePrefValue: ''
    };
    onInputChange('characters', [...formState.characters, newCharacter]);
  }, [formState.characters, onInputChange]);

  const removeCharacter = useCallback((index: number) => {
    if (formState.characters.length <= 1) {
        addToast("Minimal harus ada satu karakter.", "info");
        return;
    }
    onInputChange('characters', formState.characters.filter((_, i) => i !== index));
  }, [formState.characters, onInputChange, addToast]);

  const handleCharacterActionChange = useCallback((index: number, updatedAction: CharacterAction) => {
    const newActions = [...formState.characterActions];
    newActions[index] = updatedAction;
    onInputChange('characterActions', newActions);
  }, [formState.characterActions, onInputChange]);

  const addCharacterAction = useCallback(() => {
    const newAction: CharacterAction = { id: crypto.randomUUID(), characterName: '', description: '' };
    onInputChange('characterActions', [...formState.characterActions, newAction]);
  }, [formState.characterActions, onInputChange]);

  const removeCharacterAction = useCallback((index: number) => {
    if (formState.characterActions.length <=1) {
        addToast("Minimal harus ada satu aksi karakter.", "info");
        return;
    }
    onInputChange('characterActions', formState.characterActions.filter((_, i) => i !== index));
  }, [formState.characterActions, onInputChange, addToast]);
  
  const handleDialogueChange = useCallback((index: number, updatedDialogue: DialogueLine) => {
    const newDialogues = [...formState.dialogues];
    newDialogues[index] = updatedDialogue;
    onInputChange('dialogues', newDialogues);
  }, [formState.dialogues, onInputChange]);

  const addDialogue = useCallback(() => {
    const newDialogue: DialogueLine = { id: crypto.randomUUID(), speaker: '', line: '' };
    onInputChange('dialogues', [...formState.dialogues, newDialogue]);
  }, [formState.dialogues, onInputChange]);

  const removeDialogue = useCallback((index: number) => {
    onInputChange('dialogues', formState.dialogues.filter((_, i) => i !== index));
  }, [formState.dialogues, onInputChange]);


  const copyMainDescription = () => {
    if (!formState.mainVideoDescription.trim()) {
        addToast(`Tidak ada deskripsi untuk disalin.`, 'error');
        return;
    }
    navigator.clipboard.writeText(formState.mainVideoDescription)
      .then(() => addToast('Deskripsi Utama berhasil disalin!', 'success'))
      .catch(() => addToast('Gagal menyalin deskripsi.', 'error'));
  };


  return (
    <div className="space-y-8">
      <SectionCard title="Deskripsikan Video yang Diinginkan" titleColor="text-blue-800" bgColor="bg-blue-50" borderColor="border-blue-200">
        <TextareaField
          id="mainVideoDescription"
          value={formState.mainVideoDescription}
          onChange={(e) => onInputChange('mainVideoDescription', e.target.value)}
          placeholder="Contoh: Sebuah pesawat luar angkasa meluncur melewati galaksi nebula yang berputar, dengan meteorit melintas cepat."
          rows={4}
        />
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button onClick={onGenerateStoryIdea} isLoading={isGeneratingStory} icon={<LightbulbIcon className="w-5 h-5 mr-3"/>} className="flex-1 bg-purple-600 hover:bg-purple-700">
            {isGeneratingStory ? 'Membuat Ide...' : 'Buat Ide Cerita (Dibantu AI)'}
          </Button>
          <Button onClick={copyMainDescription} icon={<CopyIcon className="w-5 h-5 mr-3"/>} className="flex-1 bg-blue-600 hover:bg-blue-700">
            Salin Deskripsi
          </Button>
        </div>
      </SectionCard>

      <SectionCard title="1. Karakter" titleColor="text-green-800" bgColor="bg-green-50" borderColor="border-green-200">
        <div className="space-y-4">
          {formState.characters.map((char, index) => (
            <CharacterInputField
              key={char.id}
              character={char}
              onChange={(updatedChar) => handleCharacterChange(index, updatedChar)}
              onRemove={() => removeCharacter(index)}
              isRemovable={formState.characters.length > 1}
            />
          ))}
        </div>
        <Button onClick={addCharacter} icon={<PlusIcon className="w-5 h-5 mr-3"/>} className="mt-4 w-full bg-green-600 hover:bg-green-700">
          Tambah Karakter
        </Button>
      </SectionCard>

      <SectionCard title="2. Aksi Karakter" titleColor="text-yellow-800" bgColor="bg-yellow-50" borderColor="border-yellow-200">
        <div className="space-y-4">
          {formState.characterActions.map((action, index) => (
            <CharacterActionInputField
              key={action.id}
              action={action}
              characterOptions={formState.characters.map(c => ({value: c.name, text: c.name || `Karakter Tanpa Nama (${c.id.substring(0,4)})`}))}
              mainVideoDescription={formState.mainVideoDescription}
              onChange={(updatedAction) => handleCharacterActionChange(index, updatedAction)}
              onRemove={() => removeCharacterAction(index)}
              isRemovable={formState.characterActions.length > 1}
            />
          ))}
        </div>
        <Button onClick={addCharacterAction} icon={<PlusIcon className="w-5 h-5 mr-3"/>} className="mt-4 w-full bg-yellow-600 hover:bg-yellow-700">
          Tambah Aksi Karakter
        </Button>
      </SectionCard>

      <SectionCard title="3. Atmosfer" titleColor="text-red-800" bgColor="bg-red-50" borderColor="border-red-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField label="Mood / Suasana:" id="atmosphereMood" value={formState.atmosphereMood} onChange={(e) => onInputChange('atmosphereMood', e.target.value)} options={ATMOSPHERE_MOOD_OPTIONS} />
          <FormField label="Lokasi / Latar Belakang:" id="atmosphereLocation">
            <input type="text" id="atmosphereLocation" value={formState.atmosphereLocation} onChange={(e) => onInputChange('atmosphereLocation', e.target.value)} className="w-full p-3 border border-gray-300 rounded-md shadow-inner" placeholder="Contoh: Hutan pinus musim dingin, kota metropolitan futuristic"/>
          </FormField>
        </div>
      </SectionCard>
      
      <SectionCard title="4. Cinematografi" titleColor="text-indigo-800" bgColor="bg-indigo-50" borderColor="border-indigo-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField label="Gaya Kamera:" id="cameraStyle" value={formState.cameraStyle} onChange={(e) => onInputChange('cameraStyle', e.target.value)} options={CAMERA_STYLE_OPTIONS} />
            <SelectField label="Pergerakan Kamera:" id="cameraMovement" value={formState.cameraMovement} onChange={(e) => onInputChange('cameraMovement', e.target.value)} options={CAMERA_MOVEMENT_OPTIONS} />
            <SelectField label="Sudut Kamera:" id="cameraAngle" value={formState.cameraAngle} onChange={(e) => onInputChange('cameraAngle', e.target.value)} options={CAMERA_ANGLE_OPTIONS} />
            <SelectField label="Pencahayaan:" id="cameraLighting" value={formState.cameraLighting} onChange={(e) => onInputChange('cameraLighting', e.target.value)} options={CAMERA_LIGHTING_OPTIONS} />
            <div className="col-span-1 md:col-span-2">
                <SelectField label="Gradasi Warna:" id="colorGrading" value={formState.colorGrading} onChange={(e) => onInputChange('colorGrading', e.target.value)} options={COLOR_GRADING_OPTIONS} />
            </div>
        </div>
      </SectionCard>

      <SectionCard title="5. Narasi / Dialog" titleColor="text-pink-800" bgColor="bg-pink-50" borderColor="border-pink-200">
          <SelectField label="Tipe Narasi:" id="narrativeType" value={formState.narrativeType} onChange={(e) => onInputChange('narrativeType', e.target.value)} options={NARRATIVE_TYPE_OPTIONS} />
          
          {formState.narrativeType === 'Dialog Antar Karakter' && (
              <div className="mt-4 space-y-4">
                  {formState.dialogues.map((dialogue, index) => (
                      <DialogueInputField
                          key={dialogue.id}
                          dialogue={dialogue}
                          onChange={(updatedDialogue) => handleDialogueChange(index, updatedDialogue)}
                          onRemove={() => removeDialogue(index)}
                          isRemovable={formState.dialogues.length > 0} 
                      />
                  ))}
                  <Button onClick={addDialogue} icon={<PlusIcon className="w-4 h-4 mr-2"/>} className="w-full bg-pink-600 hover:bg-pink-700 text-sm">
                      Tambah Baris Dialog
                  </Button>
              </div>
          )}
          {(formState.narrativeType === 'Narasi Suara (Voiceover)' || formState.narrativeType === 'Monolog Internal') && (
              <TextareaField
                  id="narrativeContent"
                  value={formState.narrativeContent}
                  onChange={(e) => onInputChange('narrativeContent', e.target.value)}
                  placeholder="Tulis narasi atau monolog di sini..."
                  rows={3}
                  className="mt-4"
              />
          )}
      </SectionCard>

      <SectionCard title="6. Suara" titleColor="text-teal-800" bgColor="bg-teal-50" borderColor="border-teal-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectField label="Tipe Suara & Musik:" id="soundType" value={formState.soundType} onChange={(e) => onInputChange('soundType', e.target.value)} options={SOUND_TYPE_OPTIONS} />
              <SelectField label="Volume Suara (Deskriptif):" id="soundVolume" value={formState.soundVolume} onChange={(e) => onInputChange('soundVolume', e.target.value)} options={SOUND_VOLUME_OPTIONS} />
              <div className="col-span-1 md:col-span-2">
                  <FormField label="Detail Suara Kustom (Opsional):" id="customSoundDetails">
                      <input type="text" id="customSoundDetails" value={formState.customSoundDetails} onChange={(e) => onInputChange('customSoundDetails', e.target.value)} className="w-full p-3 border border-gray-300 rounded-md shadow-inner" placeholder="Contoh: Suara burung hantu di malam hari, musik latar yang sedih" />
                  </FormField>
              </div>
          </div>
      </SectionCard>

      <SectionCard title="7. Subtitle" titleColor="text-orange-800" bgColor="bg-orange-50" borderColor="border-orange-200">
          <SelectField label="Pilihan Subtitle:" id="subtitleOption" value={formState.subtitleOption} onChange={(e) => onInputChange('subtitleOption', e.target.value)} options={SUBTITLE_OPTIONS} />
      </SectionCard>

      <SectionCard title="8. Pengaturan Video" titleColor="text-gray-800" bgColor="bg-gray-50" borderColor="border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField label="Orientasi Video:" id="videoOrientation" value={formState.videoOrientation} onChange={(e) => onInputChange('videoOrientation', e.target.value)} options={VIDEO_ORIENTATION_OPTIONS} />
            <SelectField label="Ukuran Resolusi:" id="videoResolution" value={formState.videoResolution} onChange={(e) => onInputChange('videoResolution', e.target.value)} options={VIDEO_RESOLUTION_OPTIONS} />
        </div>
      </SectionCard>

      <SectionCard title="9. Pilihan Kualitas" titleColor="text-purple-800" bgColor="bg-purple-100" borderColor="border-purple-200">
          <SelectField label="Kualitas Visual & Detail:" id="videoQuality" value={formState.videoQuality} onChange={(e) => onInputChange('videoQuality', e.target.value)} options={VIDEO_QUALITY_OPTIONS} />
      </SectionCard>

      <div className="mt-8">
          <Button 
            onClick={onGenerateFinalPrompt} 
            isLoading={isGeneratingFinalPrompt} 
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white font-bold py-5 px-8 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 text-2xl tracking-wide"
            disabled={isGeneratingFinalPrompt}
          >
            {isGeneratingFinalPrompt ? 'Membuat Prompt...' : 'Buat Prompt Veo 3!'}
          </Button>
      </div>
    </div>
  );
};

