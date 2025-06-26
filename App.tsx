
import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { InputColumn } from './components/InputColumn';
import { OutputColumn } from './components/OutputColumn';
import { ToastContainer } from './components/Toast';
import { useToast } from './contexts/ToastContext';
import { generateContent, translateToEnglish, getCreativeSuggestionsAI } from './services/geminiService';
import type { FormState, Character, CharacterAction, DialogueLine, PromptLanguage } from './types';
import { INITIAL_FORM_STATE } from './constants';

const App: React.FC = () => {
  const [formState, setFormState] = useState<FormState>(INITIAL_FORM_STATE);
  const [generatedIndonesianPrompt, setGeneratedIndonesianPrompt] = useState<string>('');
  const [generatedEnglishPrompt, setGeneratedEnglishPrompt] = useState<string>('');
  const [currentPromptLanguage, setCurrentPromptLanguage] = useState<PromptLanguage>('id');
  const [suggestions, setSuggestions] = useState<string>('');
  
  const [isGeneratingStory, setIsGeneratingStory] = useState<boolean>(false);
  const [isGeneratingFinalPrompt, setIsGeneratingFinalPrompt] = useState<boolean>(false);
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState<boolean>(false);

  const { addToast } = useToast();

  const handleInputChange = useCallback(<K extends keyof FormState, V extends FormState[K]>(name: K, value: V) => {
    setFormState(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleGenerateStoryIdea = useCallback(async () => {
    if (!formState.mainVideoDescription.trim()) {
      addToast("Mohon isi 'Deskripsikan Video yang Diinginkan' terlebih dahulu.", "error");
      return;
    }
    setIsGeneratingStory(true);
    try {
      const instruction = `Buatkan ide cerita yang lebih detail dan kreatif dari deskripsi video berikut. Kembangkan menjadi paragraf singkat yang sinematik.
Deskripsi: "${formState.mainVideoDescription}"
Output: [Ide cerita detail]`;
      const result = await generateContent(instruction);
      setFormState(prev => ({ ...prev, mainVideoDescription: result.trim() }));
      addToast("Ide cerita berhasil dibuat!", "success");
    } catch (error) {
      console.error("Error generating story idea:", error);
      addToast(`Gagal membuat ide cerita: ${(error as Error).message}`, "error");
    } finally {
      setIsGeneratingStory(false);
    }
  }, [formState.mainVideoDescription, addToast]);

  const buildPromptParts = useCallback((): string => {
    const parts: string[] = [];
    const { 
      mainVideoDescription, characters, characterActions, atmosphereMood, atmosphereLocation,
      cameraStyle, cameraMovement, cameraAngle, cameraLighting, colorGrading,
      narrativeType, narrativeContent, dialogues, soundType, soundVolume, customSoundDetails,
      subtitleOption, videoOrientation, videoResolution, videoQuality
    } = formState;

    if (mainVideoDescription) parts.push(`Deskripsi Video: ${mainVideoDescription}`);

    const validCharacters = characters.filter(char => char.name.trim() || char.type.trim() || char.emotion.trim() || char.style.trim() || char.imagePrefValue.trim() || char.otherDetails.trim());
    if (validCharacters.length > 0) {
        const charDetails = validCharacters.map(char => {
            let desc = char.name.trim() ? char.name.trim() : `Karakter Tanpa Nama (${char.id.substring(0,4)})`;
            if (char.type) desc += `, Jenis: ${char.type}`;
            if (char.type === 'Manusia') {
                if (char.humanCategory) desc += `, Kategori: ${char.humanCategory}`;
                if (char.country) desc += `, Negara Asal: ${char.country}`;
                if (char.faceShape) desc += `, Bentuk Wajah: ${char.faceShape}`;
                if (char.hairModel) desc += `, Model Rambut: ${char.hairModel}`;
                if (char.hairColor) desc += `, Warna Rambut: ${char.hairColor}`;
                if (char.skinColor) desc += `, Warna Kulit: ${char.skinColor}`;
                if (char.clothing) desc += `, Pakaian: ${char.clothing}`;
            }
            if (char.emotion) desc += `, Emosi: ${char.emotion}`;
            if (char.additionalAttributes) desc += `, Atribut Tambahan: ${char.additionalAttributes}`;
            if (char.otherDetails) desc += `, Detail Lainnya: ${char.otherDetails}`;
            if (char.style) desc += `, Gaya/Style: ${char.style}`;
            if (char.imagePrefValue) {
                desc += `, Preferensi Gambar: ${char.imagePrefType === 'description' ? 'Deskripsi' : 'URL'}: ${char.imagePrefValue}`;
            }
            return desc;
        }).join('; ');
        if (charDetails) parts.push(`Karakter: ${charDetails}.`);
    }
    
    const validActions = characterActions.filter(action => (action.characterName.trim()) && action.description.trim());
    if (validActions.length > 0) {
        const actionDetails = validActions.map(action => {
            const charOrObj = action.characterName.trim();
            return `${charOrObj}: ${action.description.trim()}`;
        }).join('; ');
        if (actionDetails) parts.push(`Aksi Karakter: ${actionDetails}.`);
    }

    const atmosphereParts = [];
    if (atmosphereMood) atmosphereParts.push(`Mood: ${atmosphereMood}`);
    if (atmosphereLocation) atmosphereParts.push(`Lokasi: ${atmosphereLocation}`);
    if (atmosphereParts.length > 0) parts.push(`Atmosfer: ${atmosphereParts.join(', ')}.`);

    const cinematographyParts = [];
    if (cameraStyle) cinematographyParts.push(`Gaya Kamera: ${cameraStyle}`);
    if (cameraMovement) cinematographyParts.push(`Pergerakan Kamera: ${cameraMovement}`);
    if (cameraAngle) cinematographyParts.push(`Sudut Kamera: ${cameraAngle}`);
    if (cameraLighting) cinematographyParts.push(`Pencahayaan: ${cameraLighting}`);
    if (colorGrading) cinematographyParts.push(`Gradasi Warna: ${colorGrading}`);
    if (cinematographyParts.length > 0) parts.push(`Sinematografi: ${cinematographyParts.join(', ')}.`);

    if (narrativeType && narrativeType !== 'Tidak Ada') {
        if (narrativeType === 'Dialog Antar Karakter' && dialogues.length > 0) {
            const dialogueText = dialogues.filter(d => d.speaker.trim() && d.line.trim()).map(d => `${d.speaker}: "${d.line.trim()}"`).join('\n');
            if (dialogueText) parts.push(`Narasi: ${narrativeType}.\n${dialogueText}`);
        } else if ((narrativeType === 'Narasi Suara (Voiceover)' || narrativeType === 'Monolog Internal') && narrativeContent.trim()) {
            parts.push(`Narasi: ${narrativeType}.\nIsi Narasi: ${narrativeContent}`);
        }
    }
    
    const soundParts = [];
    if (soundType) soundParts.push(`Tipe Suara/Musik: ${soundType}`);
    if (soundVolume) soundParts.push(`Volume Suara: ${soundVolume}`);
    if (customSoundDetails) soundParts.push(`Detail Kustom: ${customSoundDetails}`);
    if (soundParts.length > 0) parts.push(`Suara: ${soundParts.join(', ')}.`);

    if (subtitleOption && subtitleOption !== 'Tidak Ada') parts.push(`Subtitle: ${subtitleOption}.`);
    
    const videoSettingsParts = [];
    if (videoOrientation) videoSettingsParts.push(`Orientasi: ${videoOrientation}`);
    if (videoResolution) videoSettingsParts.push(`Resolusi: ${videoResolution}`);
    if (videoSettingsParts.length > 0) parts.push(`Pengaturan Video: ${videoSettingsParts.join(', ')}.`);

    if (videoQuality) parts.push(`Kualitas: ${videoQuality}.`);

    return parts.filter(Boolean).join('\n\n');
  }, [formState]);


  const handleGenerateFinalPrompt = useCallback(async () => {
    setIsGeneratingFinalPrompt(true);
    setSuggestions(''); 
    try {
      const indonesianPrompt = buildPromptParts();
      if (!indonesianPrompt.trim()) {
        addToast("Mohon isi setidaknya 'Deskripsi Video yang Diinginkan' untuk membuat prompt.", "error");
        return;
      }
      setGeneratedIndonesianPrompt(indonesianPrompt);

      const englishPrompt = await translateToEnglish(indonesianPrompt);
      setGeneratedEnglishPrompt(englishPrompt);
      
      addToast("Prompt berhasil dibuat!", "success");
    } catch (error) {
      console.error("Error generating final prompt:", error);
      addToast(`Gagal membuat prompt: ${(error as Error).message}`, "error");
    } finally {
      setIsGeneratingFinalPrompt(false);
    }
  }, [buildPromptParts, addToast]);

  const handleGetSuggestions = useCallback(async () => {
    if (!generatedEnglishPrompt.trim()) {
        addToast('Buat prompt utama dahulu untuk mendapat saran.', 'error');
        return;
    }
    setIsGeneratingSuggestions(true);
    setSuggestions('');
    try {
        const result = await getCreativeSuggestionsAI(generatedEnglishPrompt);
        setSuggestions(result);
        addToast('Saran berhasil dibuat!', 'success');
    } catch (error) {
        console.error("Error getting suggestions:", error);
        addToast(`Gagal membuat saran: ${(error as Error).message}`, "error");
    } finally {
        setIsGeneratingSuggestions(false);
    }
  }, [generatedEnglishPrompt, addToast]);

  useEffect(() => {
    // Add initial character and action
    if (formState.characters.length === 0) {
      const newChar: Character = { 
        id: crypto.randomUUID(), name: `Karakter 1`, type: '', humanCategory: '', country: '', faceShape: '', hairModel: '', hairColor: '', skinColor: '', clothing: '', emotion: '', additionalAttributes: '', otherDetails: '', style: '', imagePrefType: 'description', imagePrefValue: '' 
      };
      setFormState(prev => ({...prev, characters: [newChar]}));
    }
    if (formState.characterActions.length === 0) {
       const newAction: CharacterAction = { id: crypto.randomUUID(), characterName: '', description: '' };
       setFormState(prev => ({...prev, characterActions: [newAction]}));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  return (
    <>
      <div className="w-full text-center mb-8 max-w-7xl animate-fade-in">
        <Header />
      </div>
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10 animate-fade-in delay-100">
        <InputColumn
          formState={formState}
          setFormState={setFormState}
          onInputChange={handleInputChange}
          onGenerateStoryIdea={handleGenerateStoryIdea}
          isGeneratingStory={isGeneratingStory}
          onGenerateFinalPrompt={handleGenerateFinalPrompt}
          isGeneratingFinalPrompt={isGeneratingFinalPrompt}
        />
        <OutputColumn
          indonesianPrompt={generatedIndonesianPrompt}
          englishPrompt={generatedEnglishPrompt}
          currentLanguage={currentPromptLanguage}
          onLanguageChange={setCurrentPromptLanguage}
          suggestions={suggestions}
          onGetSuggestions={handleGetSuggestions}
          isGeneratingSuggestions={isGeneratingSuggestions}
        />
      </div>
      <ToastContainer />
    </>
  );
};

export default App;
