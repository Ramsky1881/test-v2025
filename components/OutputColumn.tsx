
import React from 'react';
import type { PromptLanguage } from '../types';
import { Button } from './Button';
import { CopyIcon, LightbulbIconSolid, TelegramIcon } from './Icons';
import { useToast } from '../contexts/ToastContext';

interface OutputColumnProps {
  indonesianPrompt: string;
  englishPrompt: string;
  currentLanguage: PromptLanguage;
  onLanguageChange: (lang: PromptLanguage) => void;
  suggestions: string;
  onGetSuggestions: () => Promise<void>;
  isGeneratingSuggestions: boolean;
}

export const OutputColumn: React.FC<OutputColumnProps> = ({
  indonesianPrompt, englishPrompt, currentLanguage, onLanguageChange, suggestions, onGetSuggestions, isGeneratingSuggestions
}) => {
  const { addToast } = useToast();
  const finalPromptOutput = currentLanguage === 'id' ? indonesianPrompt : englishPrompt;

  const copyFinalPrompt = () => {
    if (!finalPromptOutput.trim()) {
        addToast(`Tidak ada prompt untuk disalin.`, 'error');
        return;
    }
    navigator.clipboard.writeText(finalPromptOutput)
      .then(() => addToast('Prompt Video Final berhasil disalin!', 'success'))
      .catch(() => addToast('Gagal menyalin prompt.', 'error'));
  };

  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-bold text-indigo-700 mb-6 text-center leading-tight tracking-wider">Hasil Prompt Anda</h2>

      <div className="bg-blue-100 p-6 rounded-xl shadow-md border border-blue-300 animate-fade-in-up">
        <div className="flex justify-between items-center mb-4">
          <label htmlFor="finalPromptOutput" className="block text-xl font-semibold text-blue-800">Prompt Video Final</label>
          <select 
            id="promptLanguage" 
            value={currentLanguage}
            onChange={(e) => onLanguageChange(e.target.value as PromptLanguage)}
            className="p-2 border border-gray-300 rounded-md text-sm bg-white focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="id">Bahasa Indonesia</option>
            <option value="en">English</option>
          </select>
        </div>
        <textarea 
          id="finalPromptOutput" 
          className="w-full p-4 border border-blue-400 rounded-lg bg-white shadow-inner text-lg" 
          rows={12} 
          placeholder="Prompt final Anda akan muncul di sini..." 
          value={finalPromptOutput}
          readOnly 
        />
        <Button onClick={copyFinalPrompt} icon={<CopyIcon className="w-5 h-5 mr-3"/>} className="mt-4 w-full bg-blue-700 hover:bg-blue-800 text-lg">
          Salin Prompt
        </Button>
      </div>

      <div className="bg-purple-50 p-6 rounded-xl shadow-md border border-purple-200 animate-fade-in-up delay-200">
        <h2 className="text-2xl font-semibold text-purple-800 mb-4">Saran & Ide Kreatif</h2>
        <textarea 
          id="suggestionPrompt" 
          className="w-full p-3 border border-purple-300 rounded-lg bg-white shadow-inner" 
          rows={8} 
          placeholder="Minta saran ide setelah membuat prompt utama..." 
          value={suggestions}
          readOnly 
        />
        {isGeneratingSuggestions && (
            <div className="flex justify-center items-center h-8 mt-4">
                <svg className="animate-spin h-6 w-6 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <p className="ml-2 text-purple-700 text-sm">Mencari Ide...</p>
            </div>
        )}
        <Button 
            onClick={onGetSuggestions} 
            isLoading={isGeneratingSuggestions} 
            icon={<LightbulbIconSolid className="w-5 h-5 mr-3"/>} 
            className="mt-4 w-full bg-purple-600 hover:bg-purple-700"
            disabled={!englishPrompt.trim()}
        >
          {isGeneratingSuggestions ? 'Mencari Saran...' : 'Minta Saran Ide'}
        </Button>
        <div className="mt-6 border-t border-purple-200 pt-4 text-center text-sm text-gray-500 italic">
          <p>Generator prompt ini adalah aset OPEN SOURCE milik BUNTUT GROUP, dibuat eksklusif untuk kebutuhan produksi video berbasis AI kami. Mohon tidak dibagikan atau diperjualbelikan di luar lingkup BUNTUT GROUP.</p>
          <a href="https://t.me/imramsky" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sky-600 hover:text-sky-800 mt-2">
            <TelegramIcon className="w-4 h-4 mr-1" />
            Hubungi @imramsky di Telegram
          </a>
        </div>
      </div>
    </div>
  );
};
