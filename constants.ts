
import type { DropdownOption, FormState, Character, CharacterAction } from './types';

export const CHARACTER_TYPE_OPTIONS: DropdownOption[] = [
    { value: "", text: "Pilih Jenis Karakter" }, { value: "Manusia", text: "Manusia" }, { value: "Hewan", text: "Hewan" }, { value: "Robot", text: "Robot" }, { value: "Manusia-Hewan (Hybrid)", text: "Manusia-Hewan (Hybrid)" }, { value: "Fantasi (Monster/Makhluk Mitologi)", text: "Fantasi (Monster/Makhluk Mitologi)" }
];
export const HUMAN_CATEGORY_OPTIONS: DropdownOption[] = [
    { value: "", text: "Pilih Kategori" }, { value: "Pria", text: "Pria" }, { value: "Wanita", text: "Wanita" }, { value: "Anak-anak", text: "Anak-anak" }, { value: "Lansia", text: "Lansia" }
];
export const COUNTRY_OPTIONS: DropdownOption[] = [
    { value: "", text: "Pilih Negara Asal" }, { value: "Indonesia", text: "Indonesia" }, { value: "Jepang", text: "Jepang" }, { value: "Korea", text: "Korea" }, { value: "Amerika", text: "Amerika" }, { value: "Eropa", text: "Eropa" }, { value: "Timur Tengah", text: "Timur Tengah" }, { value: "India", text: "India" }, { value: "Afrika", text: "Afrika" }, { value: "China", text: "China" }, { value: "Lainnya", text: "Lainnya" }
];
export const FACE_SHAPE_OPTIONS: DropdownOption[] = [
    { value: "", text: "Pilih Bentuk Wajah" }, { value: "Oval", text: "Oval" }, { value: "Bulat", text: "Bulat" }, { value: "Kotak", text: "Kotak" }, { value: "Hati", text: "Hati" }, { value: "Panjang", text: "Panjang" }, { value: "Diamond", text: "Diamond" }
];
export const HAIR_MODEL_OPTIONS: DropdownOption[] = [
    { value: "", text: "Pilih Model Rambut" }, { value: "Pendek", text: "Pendek" }, { value: "Panjang", text: "Panjang" }, { value: "Keriting", text: "Keriting" }, { value: "Lurus", text: "Lurus" }, { value: "Bergelombang", text: "Bergelombang" }, { value: "Botak", text: "Botak" }, { value: "Kepang", text: "Kepang" }
];
export const HAIR_COLOR_OPTIONS: DropdownOption[] = [
    { value: "", text: "Pilih Warna Rambut" }, { value: "Hitam", text: "Hitam" }, { value: "Coklat", text: "Coklat" }, { value: "Pirang", text: "Pirang" }, { value: "Merah", text: "Merah" }, { value: "Abu-abu", text: "Abu-abu" }, { value: "Putih", text: "Putih" }, { value: "Warna-warni", text: "Warna-warni" }
];
export const SKIN_COLOR_OPTIONS: DropdownOption[] = [
    { value: "", text: "Pilih Warna Kulit" }, { value: "Putih Pucat", text: "Putih Pucat" }, { value: "Cerah", text: "Cerah" }, { value: "Sawo Matang", text: "Sawo Matang" }, { value: "Gelap", text: "Gelap" }, { value: "Sangat Gelap", text: "Sangat Gelap" }
];
export const CLOTHING_OPTIONS: DropdownOption[] = [
    { value: "", text: "Pilih Pakaian" }, { value: "Kasual", text: "Kasual" }, { value: "Formal", text: "Formal" }, { value: "Olahraga", text: "Olahraga" }, { value: "Tradisional", text: "Tradisional" }, { value: "Fantasi", text: "Fantasi" }, { value: "Futuristik", text: "Futuristik" }, { value: "Vintage", text: "Vintage" }
];
export const EMOTION_OPTIONS: DropdownOption[] = [
    { value: "", text: "Pilih Emosi" }, { value: "Senang", text: "Senang" }, { value: "Sedih", text: "Sedih" }, { value: "Marah", text: "Marah" }, { value: "Cemas", text: "Cemas" }, { value: "Takut", text: "Takut" }, { value: "Bingung", text: "Bingung" }, { value: "Tenang", text: "Tenang" }, { value: "Semangat", text: "Semangat" }
];
export const ADDITIONAL_ATTRIBUTE_OPTIONS: DropdownOption[] = [
    { value: "", text: "Pilih Atribut Tambahan" }, { value: "Memakai Kacamata", text: "Memakai Kacamata" }, { value: "Membawa Tas", text: "Membawa Tas" }, { value: "Ada Tato", text: "Ada Tato" }, { value: "Ada Bekas Luka", text: "Ada Bekas Luka" }, { value: "Memiliki Hewan Peliharaan", text: "Memiliki Hewan Peliharaan" }, { value: "Berotot", text: "Berotot" }, { value: "Gemuk", text: "Gemuk" }, { value: "Kurang Gizi", text: "Kurang Gizi" }, { value: "Tinggi", text: "Tinggi" }, { value: "Pendek", text: "Pendek" }
];
export const CHARACTER_STYLE_OPTIONS: DropdownOption[] = [
    { value: "", text: "Pilih Gaya/Style" }, { value: "Realistis", text: "Realistis" }, { value: "Kartun", text: "Kartun" }, { value: "Anime", text: "Anime" }, { value: "Lukisan", text: "Lukisan" }, { value: "Sketsa", text: "Sketsa" }, { value: "Seni Digital", text: "Seni Digital" }, { value: "Gaya Film (Noir/Vintage)", text: "Gaya Film (Noir/Vintage)" }, { value: "Gaya Video Game", text: "Gaya Video Game" }
];

export const ATMOSPHERE_MOOD_OPTIONS: DropdownOption[] = [
    { value: "", text: "Pilih Mood" }, { value: "Ceria", text: "Ceria" }, { value: "Mencekam", text: "Mencekam" }, { value: "Misterius", text: "Misterius" }, { value: "Mengharukan", text: "Mengharukan" }, { value: "Enerjik", text: "Enerjik" }, { value: "Tenang", text: "Tenang" }, { value: "Kacau", text: "Kacau" }
];
export const CAMERA_STYLE_OPTIONS: DropdownOption[] = [
    { value: "", text: "Pilih Gaya" }, { value: "Sinematik", text: "Sinematik" }, { value: "Dokumenter", text: "Dokumenter" }, { value: "Vertikal", text: "Vertikal" }, { value: "Horizontal", text: "Horizontal" }, { value: "Anime", text: "Anime" }, { value: "Film Noir", text: "Film Noir" }
];
export const CAMERA_MOVEMENT_OPTIONS: DropdownOption[] = [
    { value: "", text: "Pilih Pergerakan" }, { value: "Static (Diam)", text: "Static (Diam)" }, { value: "Pan (Horizontal)", text: "Pan (Horizontal)" }, { value: "Tilt (Vertikal)", text: "Tilt (Vertikal)" }, { value: "Dolly (Maju/Mundur)", text: "Dolly (Maju/Mundur)" }, { value: "Tracking Shot", text: "Tracking Shot" }, { value: "Handheld (Genggam)", text: "Handheld (Genggam)" }, { value: "Crane Shot", text: "Crane Shot" }
];
export const CAMERA_ANGLE_OPTIONS: DropdownOption[] = [
    { value: "", text: "Pilih Sudut" }, { value: "Close-up", text: "Close-up" }, { value: "Medium Shot", text: "Medium Shot" }, { value: "Full Shot", text: "Full Shot" }, { value: "Extreme Wide Shot", text: "Extreme Wide Shot" }, { value: "Low Angle", text: "Low Angle" }, { value: "High Angle", text: "High Angle" }, { value: "Dutch Angle", text: "Dutch Angle" }
];
export const CAMERA_LIGHTING_OPTIONS: DropdownOption[] = [
    { value: "", text: "Pilih Pencahayaan" }, { value: "Natural (Alami)", text: "Natural (Alami)" }, { value: "Studio Lighting (Profesional)", text: "Studio Lighting" }, { value: "Low Key (Gelap/Misterius)", text: "Low Key (Gelap/Misterius)" }, { value: "High Key (Terang/Ceria)", text: "High Key (Terang/Ceria)" }, { value: "Golden Hour", text: "Golden Hour" }, { value: "Blue Hour", text: "Blue Hour" }
];
export const COLOR_GRADING_OPTIONS: DropdownOption[] = [
    { value: "", text: "Pilih Gradasi Warna" }, { value: "Hangat (Warm Tone)", text: "Hangat (Warm Tone)" }, { value: "Dingin (Cool Tone)", text: "Dingin (Cool Tone)" }, { value: "Monokrom (Hitam Putih)", text: "Monokrom (Hitam Putih)" }, { value: "Sepia", text: "Sepia" }, { value: "Vibrant (Cerah)", text: "Vibrant (Cerah)" }, { value: "Muted (Pudar)", text: "Muted (Pudar)" }
];
export const NARRATIVE_TYPE_OPTIONS: DropdownOption[] = [
    { value: "", text: "Pilih Tipe Narasi" }, { value: "Tidak Ada", text: "Tidak Ada" }, { value: "Narasi Suara (Voiceover)", text: "Narasi Suara (Voiceover)" }, { value: "Dialog Antar Karakter", text: "Dialog Antar Karakter" }, { value: "Monolog Internal", text: "Monolog Internal" }
];
export const SOUND_TYPE_OPTIONS: DropdownOption[] = [
    { value: "", text: "Pilih Tipe Suara" }, { value: "Musik Orkestra Dramatis", text: "Musik Orkestra Dramatis" }, { value: "Musik Jazz Lembut", text: "Musik Jazz Lembut" }, { value: "Musik Pop Ceria", text: "Musik Pop Ceria" }, { value: "Suara Alam (Hutan, Ombak)", text: "Suara Alam (Hutan, Ombak)" }, { value: "Suara Kota (Hiruk Pikuk)", text: "Suara Kota (Hiruk Pikuk)" }, { value: "Suara Hewan (Spesifik)", text: "Suara Hewan (Spesifik)" }, { value: "Efek Suara (Ledakan, Desir)", text: "Efek Suara (Ledakan, Desir)" }, { value: "Hening Total", text: "Hening Total" }
];
export const SOUND_VOLUME_OPTIONS: DropdownOption[] = [
    { value: "", text: "Pilih Volume" }, { value: "Hening", text: "Hening" }, { value: "Lirih", text: "Lirih" }, { value: "Normal", text: "Normal" }, { value: "Keras", text: "Keras" }, { value: "Mengaum", text: "Mengaum" }
];
export const SUBTITLE_OPTIONS: DropdownOption[] = [
    { value: "Tidak Ada", text: "Tidak Ada" }, { value: "Hardcoded (Selalu Tampil)", text: "Hardcoded (Selalu Tampil)" }, { value: "Opsional (Bisa Diaktifkan)", text: "Opsional (Bisa Diaktifkan)" }
];
export const VIDEO_ORIENTATION_OPTIONS: DropdownOption[] = [
    { value: "Horizontal (Lanskap)", text: "Horizontal (Lanskap)" }, { value: "Vertikal (Potret)", text: "Vertikal (Potret)" }, { value: "Persegi", text: "Persegi" }
];
export const VIDEO_RESOLUTION_OPTIONS: DropdownOption[] = [
    { value: "HD (1280x720)", text: "HD (1280x720)" }, { value: "Full HD (1920x1080)", text: "Full HD (1920x1080)" }, { value: "4K (3840x2160)", text: "4K (3840x2160)" }
];
export const VIDEO_QUALITY_OPTIONS: DropdownOption[] = [
    { value: "Fotorealistik, Detail Tinggi", text: "Fotorealistik, Detail Tinggi" }, { value: "Gaya Animasi 3D, Modern", text: "Gaya Animasi 3D, Modern" }, { value: "Gaya Lukisan Cat Air", text: "Gaya Lukisan Cat Air" }, { value: "Gaya Pixel Art", text: "Gaya Pixel Art" }, { value: "Minimalis, Bersih", text: "Minimalis, Bersih" }
];

export const INITIAL_FORM_STATE: FormState = {
  mainVideoDescription: '',
  characters: [],
  characterActions: [],
  atmosphereMood: '',
  atmosphereLocation: '',
  cameraStyle: '',
  cameraMovement: '',
  cameraAngle: '',
  cameraLighting: '',
  colorGrading: '',
  narrativeType: '',
  narrativeContent: '',
  dialogues: [],
  soundType: '',
  soundVolume: '',
  customSoundDetails: '',
  subtitleOption: 'Tidak Ada',
  videoOrientation: 'Horizontal (Lanskap)',
  videoResolution: 'Full HD (1920x1080)',
  videoQuality: 'Fotorealistik, Detail Tinggi',
};

