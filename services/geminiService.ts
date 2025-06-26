import { GoogleGenerativeAI, GenerateContentResponse, GenerateContentResult } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("VITE_GEMINI_API_KEY for Gemini is not defined in environment variables. Please ensure it is set in .env.local.");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Menggunakan model yang stabil dan direkomendasikan

export const generateContent = async (prompt: string): Promise<string> => {
  try {
    const result: GenerateContentResult = await geminiModel.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    if (result && result.response && typeof result.response.text === 'function') {
        return result.response.text(); // Menggunakan .text() sebagai fungsi
    } else {
        // Log objek hasil lengkap untuk debugging jika format tidak diharapkan
        console.error("Unexpected response format from Gemini API. Full result object:", JSON.stringify(result, null, 2));
        
        // Coba cek kandidat teks jika properti text() tidak ada tapi ada candidates
        if (result.response && result.response.candidates && result.response.candidates.length > 0 && 
            result.response.candidates[0].content && result.response.candidates[0].content.parts && 
            result.response.candidates[0].content.parts.length > 0 && result.response.candidates[0].content.parts[0].text) {
            
            const fallbackText = result.response.candidates[0].content.parts[0].text;
            console.warn("Falling back to direct candidate text from parts:", fallbackText);
            return fallbackText; // Mengembalikan teks dari kandidat pertama sebagai fallback
        }
        
        throw new Error("Unexpected response format from Gemini API: 'response.text()' is not available or response is empty.");
    }

  } catch (error) {
    console.error("Gemini API call failed:", error);
    // Log objek error lengkap untuk debugging yang lebih detail
    console.error("Full error object:", JSON.stringify(error, Object.getOwnPropertyNames(error)));

    let finalErrorMessage = "An unknown error occurred.";

    if (error instanceof Error) {
      finalErrorMessage = error.message;
      try {
        const parsedMessage = JSON.parse(finalErrorMessage);
        if (parsedMessage && parsedMessage.error && typeof parsedMessage.error.message === 'string') {
          finalErrorMessage = parsedMessage.error.message;
        }
      } catch (parseError) {
        console.warn("Could not parse API error message as JSON, using original message string.", parseError);
      }
    } else if (typeof error === 'string') {
      finalErrorMessage = error;
    }
    
    throw new Error(`Gemini API error: ${finalErrorMessage}`);
  }
};

export const translateToEnglish = async (indonesianPrompt: string): Promise<string> => {
  const instruction = `You are an expert prompt engineer for AI video generation models like Google Veo. Convert the following Indonesian scene description into a clear, concise, and powerful English prompt.
RULES:
1. Structure: Start with the main subject and action, followed by visual details, camera work, and artistic style.
2. Keywords: Use vivid, descriptive keywords and short phrases, separated by commas. Avoid long conversational sentences.
3. Output: Only output the final English prompt, without any introduction or additional conversational text.

EXAMPLE:
- Input: "Deskripsi Video: Seekor rubah merah berlari di padang salju saat senja. Atmosfer: Mood: Mencekam, Lokasi: Hutan pinpus musim dingin. Sinematografi: Gaya Kamera: Sinematik, Pergerakan Kamera: Tracking Shot. Kualitas: Fotorealistik."
- Output: "A red fox running through a snowy field, cinematic tracking shot, chilling mood, winter pine forest, deep sparkling snow, photorealistic, 4K"

Now, process this Indonesian prompt:
"${indonesianPrompt}"`;
  
  return generateContent(instruction);
};

export const getCreativeSuggestionsAI = async (englishPrompt: string): Promise<string> => {
    const instruction = `Based on the following English prompt for AI video generation, provide 3-5 creative and concise ideas to enhance it. Focus on visual, mood, or narrative aspects that can enrich the video. Format as a bulleted list.
Prompt: "${englishPrompt}"`;
    return generateContent(instruction);
};

export const generateCharacterActionAI = async (mainVideoDesc: string, characterName: string): Promise<string> => {
    const instruction = `Berdasarkan deskripsi video utama: "${mainVideoDesc}", buatkan deskripsi aksi sinematik yang detail untuk "${characterName}". Fokus pada gerakan, interaksi, dan ekspresi.
Output: [Deskripsi aksi]`;
    return generateContent(instruction);
};
