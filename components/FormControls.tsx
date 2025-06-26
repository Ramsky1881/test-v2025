
import React, { useState, useCallback } from 'react';
import type { DropdownOption, Character, CharacterAction, DialogueLine } from '../types';
import { 
    CHARACTER_TYPE_OPTIONS, HUMAN_CATEGORY_OPTIONS, COUNTRY_OPTIONS, FACE_SHAPE_OPTIONS, HAIR_MODEL_OPTIONS, 
    HAIR_COLOR_OPTIONS, SKIN_COLOR_OPTIONS, CLOTHING_OPTIONS, EMOTION_OPTIONS, ADDITIONAL_ATTRIBUTE_OPTIONS, 
    CHARACTER_STYLE_OPTIONS 
} from '../constants';
import { Button } from './Button';
import { RemoveIcon, LightbulbIcon } from './Icons';
import { generateCharacterActionAI } from '../services/geminiService';
import { useToast } from '../contexts/ToastContext';


interface FormFieldProps {
  label: string;
  id: string;
  children: React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({ label, id, children, className }) => (
  <div className={className}>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    {children}
  </div>
);

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  options: DropdownOption[];
}

export const SelectField: React.FC<SelectFieldProps> = ({ label, id, options, ...props }) => (
  <FormField label={label} id={id}>
    <select id={id} {...props} className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white">
      {options.map(opt => <option key={opt.value} value={opt.value}>{opt.text}</option>)}
    </select>
  </FormField>
);

interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label?: string;
}

export const TextareaField: React.FC<TextareaFieldProps> = ({ label, id, ...props }) => {
  const content = <textarea id={id} {...props} className={`w-full p-3 border border-gray-300 rounded-lg shadow-inner bg-white text-lg ${props.className || ''}`} />;
  return label ? <FormField label={label} id={id}>{content}</FormField> : content;
};

// Character Input Field
interface CharacterInputFieldProps {
  character: Character;
  onChange: (character: Character) => void;
  onRemove: () => void;
  isRemovable: boolean;
}

export const CharacterInputField: React.FC<CharacterInputFieldProps> = ({ character, onChange, onRemove, isRemovable }) => {
  const handleChange = <K extends keyof Character,>(field: K, value: Character[K]) => {
    onChange({ ...character, [field]: value });
  };

  return (
    <div className="bg-green-100 p-4 rounded-lg shadow-inner border border-green-200 space-y-3">
      <div className="flex justify-between items-center mb-3">
        <input 
          type="text" 
          value={character.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder={`Karakter Tanpa Nama (${character.id.substring(0,4)})`}
          className="w-full p-2 font-semibold text-green-800 text-lg bg-transparent border-b border-green-300 focus:outline-none"
        />
        {isRemovable && (
          <button onClick={onRemove} className="p-1 text-red-600 hover:text-red-800 transition duration-200" title="Hapus Karakter">
            <RemoveIcon className="w-6 h-6" />
          </button>
        )}
      </div>
      
      <SelectField label="Jenis Karakter:" id={`charType-${character.id}`} options={CHARACTER_TYPE_OPTIONS} value={character.type} onChange={(e) => handleChange('type', e.target.value)} />

      {character.type === 'Manusia' && (
        <div className="character-human-details space-y-3 mt-3 border-t border-green-200 pt-3">
            <SelectField label="Kategori:" id={`humanCat-${character.id}`} options={HUMAN_CATEGORY_OPTIONS} value={character.humanCategory} onChange={(e) => handleChange('humanCategory', e.target.value)} />
            <SelectField label="Negara Asal:" id={`country-${character.id}`} options={COUNTRY_OPTIONS} value={character.country} onChange={(e) => handleChange('country', e.target.value)} />
            <SelectField label="Bentuk Wajah:" id={`faceShape-${character.id}`} options={FACE_SHAPE_OPTIONS} value={character.faceShape} onChange={(e) => handleChange('faceShape', e.target.value)} />
            <SelectField label="Model Rambut:" id={`hairModel-${character.id}`} options={HAIR_MODEL_OPTIONS} value={character.hairModel} onChange={(e) => handleChange('hairModel', e.target.value)} />
            <SelectField label="Warna Rambut:" id={`hairColor-${character.id}`} options={HAIR_COLOR_OPTIONS} value={character.hairColor} onChange={(e) => handleChange('hairColor', e.target.value)} />
            <SelectField label="Warna Kulit:" id={`skinColor-${character.id}`} options={SKIN_COLOR_OPTIONS} value={character.skinColor} onChange={(e) => handleChange('skinColor', e.target.value)} />
            <SelectField label="Pakaian:" id={`clothing-${character.id}`} options={CLOTHING_OPTIONS} value={character.clothing} onChange={(e) => handleChange('clothing', e.target.value)} />
        </div>
      )}

      <SelectField label="Emosi Karakter:" id={`emotion-${character.id}`} options={EMOTION_OPTIONS} value={character.emotion} onChange={(e) => handleChange('emotion', e.target.value)} />
      <SelectField label="Atribut Tambahan:" id={`addAttr-${character.id}`} options={ADDITIONAL_ATTRIBUTE_OPTIONS} value={character.additionalAttributes} onChange={(e) => handleChange('additionalAttributes', e.target.value)} />
      <TextareaField label="Detail Lainnya:" id={`otherDetails-${character.id}`} value={character.otherDetails} onChange={(e) => handleChange('otherDetails', e.target.value)} rows={2} placeholder="Tambahkan detail lain tentang karakter di sini..." />
      <SelectField label="Gaya atau Style:" id={`style-${character.id}`} options={CHARACTER_STYLE_OPTIONS} value={character.style} onChange={(e) => handleChange('style', e.target.value)} />
      
      <FormField label="Menu Gambar Preferensi:" id={`imgPrefType-${character.id}`}>
          <div className="flex items-center space-x-4 mb-2">
              {(['description', 'url'] as const).map(prefType => (
                  <label key={prefType} className="inline-flex items-center">
                      <input type="radio" className="form-radio text-indigo-600" name={`imagePref_${character.id}`} value={prefType} checked={character.imagePrefType === prefType} onChange={() => handleChange('imagePrefType', prefType)} />
                      <span className="ml-2 text-sm text-gray-700">{prefType === 'description' ? 'Deskripsi Gambar' : 'URL Gambar'}</span>
                  </label>
              ))}
          </div>
          <input type="text" id={`imgPrefValue-${character.id}`} value={character.imagePrefValue} onChange={(e) => handleChange('imagePrefValue', e.target.value)} className="w-full p-2 border-gray-300 rounded-md shadow-inner" placeholder={character.imagePrefType === 'description' ? "Misalnya: 'sebuah gambar lansekap pegunungan'" : "Misalnya: 'https://example.com/image.jpg'"}/>
      </FormField>
    </div>
  );
};


// Character Action Input Field
interface CharacterActionInputFieldProps {
  action: CharacterAction;
  characterOptions: DropdownOption[];
  mainVideoDescription: string;
  onChange: (action: CharacterAction) => void;
  onRemove: () => void;
  isRemovable: boolean;
}

export const CharacterActionInputField: React.FC<CharacterActionInputFieldProps> = ({ action, characterOptions, mainVideoDescription, onChange, onRemove, isRemovable }) => {
  const [isGeneratingAction, setIsGeneratingAction] = useState(false);
  const { addToast } = useToast();

  const handleChange = <K extends keyof CharacterAction,>(field: K, value: CharacterAction[K]) => {
    onChange({ ...action, [field]: value });
  };
  
  const allCharOptions = [{value: "", text: "Pilih Karakter"}, ...characterOptions, {value: "Objek/Lingkungan", text: "Objek/Lingkungan"}];

  const handleGenerateActionAI = useCallback(async () => {
    if (!action.characterName) {
        addToast("Pilih karakter atau 'Objek/Lingkungan' terlebih dahulu.", "error");
        return;
    }
    if (!mainVideoDescription.trim()) {
        addToast("Mohon isi 'Deskripsikan Video yang Diinginkan' terlebih dahulu.", "error");
        return;
    }

    setIsGeneratingAction(true);
    try {
        const result = await generateCharacterActionAI(mainVideoDescription, action.characterName);
        onChange({ ...action, description: result.trim() });
        addToast("Aksi berhasil dibuat!", "success");
    } catch (error) {
        console.error("Error generating character action:", error);
        addToast(`Gagal membuat aksi: ${(error as Error).message}`, "error");
    } finally {
        setIsGeneratingAction(false);
    }
  }, [action, mainVideoDescription, onChange, addToast]);

  return (
    <div className="bg-yellow-100 p-4 rounded-lg shadow-inner border border-yellow-200">
      <div className="flex justify-between items-center mb-3">
        <select 
            value={action.characterName} 
            onChange={(e) => handleChange('characterName', e.target.value)}
            className="p-2 border-gray-300 rounded-md bg-white w-full mr-2"
        >
          {allCharOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.text}</option>)}
        </select>
        {isRemovable && (
          <button onClick={onRemove} className="p-1 text-red-600 hover:text-red-800 transition duration-200" title="Hapus Aksi">
            <RemoveIcon className="w-6 h-6" />
          </button>
        )}
      </div>
      <TextareaField 
        id={`actionDesc-${action.id}`} 
        value={action.description}
        onChange={(e) => handleChange('description', e.target.value)}
        rows={2} 
        placeholder="Deskripsikan aksi (misal: berjalan perlahan, terbang cepat, berinteraksi dengan X)..."
        className="mb-3"
      />
      <Button onClick={handleGenerateActionAI} isLoading={isGeneratingAction} icon={<LightbulbIcon className="w-4 h-4 mr-2"/>} className="w-full bg-yellow-600 hover:bg-yellow-700 text-sm">
        {isGeneratingAction ? 'Membuat Aksi...' : 'Bantuan AI Otomatis'}
      </Button>
    </div>
  );
};


// Dialogue Input Field
interface DialogueInputFieldProps {
  dialogue: DialogueLine;
  onChange: (dialogue: DialogueLine) => void;
  onRemove: () => void;
  isRemovable: boolean;
}

export const DialogueInputField: React.FC<DialogueInputFieldProps> = ({ dialogue, onChange, onRemove, isRemovable }) => {
    const handleChange = <K extends keyof DialogueLine,>(field: K, value: DialogueLine[K]) => {
        onChange({ ...dialogue, [field]: value });
    };

    return (
        <div className="bg-pink-100 p-4 rounded-lg shadow-inner border border-pink-200">
            <div className="flex justify-between items-center mb-3">
                <input 
                    type="text" 
                    value={dialogue.speaker}
                    onChange={(e) => handleChange('speaker', e.target.value)}
                    placeholder="Pembicara (e.g., Narator)"
                    className="w-full p-2 font-semibold text-pink-800 text-lg bg-transparent border-b border-pink-300 focus:outline-none"
                />
                {isRemovable && (
                     <button onClick={onRemove} className="p-1 text-red-600 hover:text-red-800 transition duration-200" title="Hapus Dialog">
                        <RemoveIcon className="w-6 h-6" />
                    </button>
                )}
            </div>
            <TextareaField 
                id={`dialogueLine-${dialogue.id}`}
                value={dialogue.line}
                onChange={(e) => handleChange('line', e.target.value)}
                rows={2}
                placeholder="Tulis baris dialog di sini..."
            />
        </div>
    );
};

