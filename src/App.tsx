To make authentication optional, we need to redesign the application flow so that the main layout is always visible. If a user is not logged in, they should see a "Sign In" button instead of the XP counter, and their progress will simply not be saved to Firebase.

Here is the updated `src/App.tsx` that removes the mandatory login wall and elegantly integrates the authentication state into the header.

Replace your entire `src/App.tsx` file with this code:

```tsx
import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import Auth from './Auth';

// --- INLINE SVGS ---
const Volume2 = (p: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>;
const ChevronDown = (p: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="6 9 12 15 18 9"></polyline></svg>;
const GraduationCap = (p: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>;
const BookOpen = (p: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>;
const Trophy = (p: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>;
const Mic = (p: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v1a7 7 0 0 1-14 0v-1"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>;
const Type = (p: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>;
const Headphones = (p: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"></path><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>;
const ArrowLeft = (p: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>;
const Layers = (p: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>;

// --- HELPER COMPONENT FOR BILINGUAL TEXT ---
const DualText = ({ eng, ger, align = "left", engClass = "block", gerClass = "block text-[0.8em] text-indigo-300 italic mt-0.5" }: { eng: string; ger?: string; align?: "left" | "center" | "right"; engClass?: string; gerClass?: string }) => (
  <span className={`inline-flex flex-col ${align === 'center' ? 'items-center text-center' : align === 'right' ? 'items-end text-right' : 'items-start text-left'}`}>
    <span className={engClass}>{eng}</span>
    {ger && <span className={gerClass}>{ger}</span>}
  </span>
);

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

const LEVELS = [
  { id: 'A1', name: 'Beginner', deName: 'Anfänger', xpRequired: 0, color: 'bg-green-500', shadow: 'shadow-green-500/50' },
  { id: 'A2', name: 'Elementary', deName: 'Grundstufe', xpRequired: 1000, color: 'bg-teal-500', shadow: 'shadow-teal-500/50' },
  { id: 'B1', name: 'Intermediate', deName: 'Mittelstufe', xpRequired: 2500, color: 'bg-blue-500', shadow: 'shadow-blue-500/50' },
  { id: 'B2', name: 'Upper Intermediate', deName: 'Obere Mittelstufe', xpRequired: 4500, color: 'bg-indigo-500', shadow: 'shadow-indigo-500/50' },
  { id: 'C1', name: 'Advanced', deName: 'Fortgeschritten', xpRequired: 7000, color: 'bg-purple-500', shadow: 'shadow-purple-500/50' },
  { id: 'C2', name: 'Mastery', deName: 'Meisterschaft', xpRequired: 10000, color: 'bg-pink-500', shadow: 'shadow-pink-500/50' }
];

const CURRICULUM = {
  A1: [
    { title: "Definite & Indefinite Articles", de: "Bestimmte & Unbestimmte Artikel", desc: "Master masculine, feminine, neuter articles and negation with 'kein'.", content: `### 1. Definite & Indefinite Articles\n**Definite (the):** der Mann (masculine), die Frau (feminine), das Kind (neuter), die Kinder (plural).` },
    { title: "Cases (Kasus)", de: "Kasus", desc: "Understand Nominative, Accusative, and Dative.", content: `### 2. Cases\n**Nominativ:** Subject\n**Akkusativ:** Direct object\n**Dativ:** Indirect object` },
    { title: "Verb Conjugation", de: "Verbkonjugation", desc: "Learn regular present tense endings.", content: `### 3. Verb Conjugation\nich spiele, du spielst, er/sie/es spielt.` }
  ],
  A2: [{ title: "Advanced Nomengruppe", de: "Erweiterte Nomengruppe", desc: "Adjective endings across cases.", content: `### 1. Nomengruppe\nder große Tisch, die rote Jacke.` }],
  B1: [{ title: "Passiv", de: "Passiv", desc: "Passive voice.", content: "### Passiv" }],
  B2: [{ title: "Nominalstil", de: "Nominalstil", desc: "Academic style.", content: "### Nominalstil" }],
  C1: [{ title: "Redewendungen", de: "Redewendungen", desc: "Idioms.", content: "### Redewendungen" }],
  C2: [{ title: "Stylistics", de: "Stylistik", desc: "Mastery.", content: "### Stylistics" }]
};

const WRITING_PROMPTS: Record<string, string[]> = {
  A1: [
    "Hello, my name is Anna and I live in Berlin.",
    "Where is the train station, please?",
    "I have a dog and a cat.",
    "I would like a coffee, please.",
    "Today the weather is very beautiful."
  ],
  A2: [
    "Yesterday I went to the cinema with my friends.",
    "Because it is raining, I am staying at home today.",
    "I bought a new book on the weekend.",
    "We have to work late today.",
    "Can you help me with my homework, please?"
  ],
  B1: [
    "If I had more time, I would learn Spanish.",
    "It is very important to eat healthy food every day.",
    "Although I was tired, I went jogging in the park.",
    "I am really looking forward to my summer holidays.",
    "She told me that she is moving to Munich next month."
  ],
  B2: [
    "The ongoing digitalization offers numerous opportunities for education.",
    "It is essential to consider the environmental impact of our actions.",
    "I highly doubt that this is the most effective solution to the problem.",
    "Despite the major challenges, we managed to successfully complete the project.",
    "I would argue that remote work significantly increases overall productivity."
  ],
  C1: [
    "It cannot be denied that linguistic competence is key to professional success.",
    "The ambivalence of the current economic situation is quite apparent.",
    "I would like to elaborate on this specific aspect of the sociological theory.",
    "In retrospect, the committee's initial decision was somewhat premature.",
    "The new policy aims to foster sustainable development in urban areas."
  ],
  C2: [
    "The successive implementation of advanced algorithms optimizes complex workflows.",
    "It is incumbent upon us to mitigate these systemic risks proactively.",
    "The esoteric nature of the academic discourse completely alienated the layperson.",
    "He circumvented the controversial issue with remarkable rhetorical finesse.",
    "This paradigm shift necessitates a fundamental reassessment of our core corporate values."
  ]
};

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [xp, setXp] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState('A1');
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Listen for login/logout and sync with Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setShowAuthModal(false);
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setXp(userDoc.data().xp || 0);
          setSelectedLevel(userDoc.data().level || 'A1');
        } else {
          await setDoc(userDocRef, { xp: 0, level: 'A1' });
        }
      } else {
        setXp(0); // Reset XP for guests
      }
    });
    return () => unsubscribe();
  }, []);

  // Save XP and Level to Firestore whenever they change (only if logged in)
  useEffect(() => {
    if (user) {
      setDoc(doc(db, 'users', user.uid), { xp, level: selectedLevel }, { merge: true });
    }
  }, [xp, selectedLevel, user]);

  const [currentView, setCurrentView] = useState<'hub' | 'lesson' | 'game'>('hub');
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  
  const [activeGameModule, setActiveGameModule] = useState<'flashcards' | 'reading' | 'writing' | 'listening' | 'speaking' | null>(null);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const [speakingStatus, setSpeakingStatus] = useState<'idle' | 'listening' | 'evaluating'>('idle');
  const [speakingTranscript, setSpeakingTranscript] = useState('');
  const [speakingFeedback, setSpeakingFeedback] = useState('');

  const [currentWritingPrompt, setCurrentWritingPrompt] = useState('');
  const [userWritingText, setUserWritingText] = useState('');
  const [writingFeedback, setWritingFeedback] = useState('');
  const [isEvaluatingWriting, setIsEvaluatingWriting] = useState(false);

  const [readingQuizAnswer, setReadingQuizAnswer] = useState<number | null>(null);
  const [readingSubmitted, setReadingSubmitted] = useState(false);

  useEffect(() => {
    if (activeGameModule === 'writing') {
      generateNewWritingPrompt();
    }
  }, [activeGameModule, selectedLevel]);

  const generateNewWritingPrompt = () => {
    const prompts = WRITING_PROMPTS[selectedLevel] || WRITING_PROMPTS['A1'];
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setCurrentWritingPrompt(randomPrompt);
    setUserWritingText('');
    setWritingFeedback('');
  };

  const vocabularyData: Record<string, { de: string; en: string; hint: string }[]> = {
    A1: [
      { de: "Hallo", en: "Hello", hint: "Standard greeting" },
      { de: "Das Buch", en: "The book", hint: "Neuter noun" }
    ],
    A2: [{ de: "Die Erfahrung", en: "The experience", hint: "Feminine noun" }],
    B1: [{ de: "Die Verantwortung", en: "The responsibility", hint: "Feminine noun" }],
    B2: [{ de: "Die Voraussetzung", en: "The prerequisite", hint: "Feminine noun" }],
    C1: [{ de: "Die Ambivalenz", en: "The ambivalence", hint: "Complex concept" }],
    C2: [{ de: "Die Eruierung", en: "The ascertainment", hint: "Formal academic noun" }]
  };

  const currentVocabulary = vocabularyData[selectedLevel] || vocabularyData['A1'];

  const playGermanSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.rate = 0.9;
      setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleEvaluateWriting = async () => {
    if (!userWritingText.trim()) return;
    setIsEvaluatingWriting(true);
    setWritingFeedback('');
    try {
      if (!API_KEY) {
        setWritingFeedback("API Error: Missing Gemini API Key. Ensure VITE_GEMINI_API_KEY is set in your .env file.");
        setIsEvaluatingWriting(false);
        return;
      }

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ 
            text: `You are an expert German language tutor. The student (Level ${selectedLevel}) was asked to translate this English sentence into German:\n\nEnglish: "${currentWritingPrompt}"\n\nStudent's German translation: "${userWritingText}"\n\nEvaluate if the German translation accurately conveys the semantic meaning of the English sentence (it doesn't need to be word-for-word). Provide friendly, concise feedback, point out any grammar or spelling mistakes, and offer a natural-sounding alternative if theirs is awkward.` 
          }] }]
        })
      });
      const data = await response.json();

      if (data.error) {
        setWritingFeedback(`API Error: ${data.error.message}`);
      } else if (data.candidates && data.candidates[0].content.parts[0].text) {
        setWritingFeedback(data.candidates[0].content.parts[0].text);
        setXp(prev => prev + 50);
      } else {
        setWritingFeedback("Could not generate feedback. The API returned an empty response.");
      }
    } catch (e: any) {
      setWritingFeedback("Network Error: Could not connect to Gemini AI. " + e.message);
    } finally {
      setIsEvaluatingWriting(false);
    }
  };

  const handleSimulateSpeaking = () => {
    setSpeakingStatus('listening');
    setSpeakingTranscript('');
    setSpeakingFeedback('');
    setTimeout(() => {
      setSpeakingStatus('evaluating');
      setSpeakingTranscript("Hallo, ich lerne Deutsch.");
      setTimeout(() => {
        setSpeakingStatus('idle');
        setSpeakingFeedback("Ausgezeichnet! +50 XP");
        setXp(prev => prev + 50);
      }, 1500);
    }, 3000);
  };

  const handleLogout = () => signOut(auth);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative">
      
      {/* Auth Modal overlay for when users want to log in */}
      {showAuthModal && !user && (
        <div className="absolute inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex justify-center items-center p-6">
          <div className="relative w-full max-w-md">
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white z-10"
            >
              ✕
            </button>
            <Auth />
          </div>
        </div>
      )}

      <header className="border-b border-slate-800 bg-slate-900/80 sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => { setCurrentView('hub'); setActiveGameModule(null); }}>
          <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-500/30">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
              GermanQuest <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">A1-C2</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <button onClick={handleLogout} className="text-xs font-bold text-slate-400 hover:text-rose-400 transition-colors">
                Sign Out
              </button>
              <div className="flex items-center space-x-2 bg-slate-800 px-4 py-2 rounded-2xl">
                <Trophy className="w-5 h-5 text-amber-400" />
                <div className="text-sm font-bold text-amber-300">{xp} XP</div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-2 bg-slate-800 px-4 py-2 rounded-2xl opacity-50">
                <Trophy className="w-5 h-5 text-amber-400" />
                <div className="text-sm font-bold text-amber-300">{xp} XP</div>
              </div>
              <button 
                onClick={() => setShowAuthModal(true)} 
                className="text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl transition-all"
              >
                Sign In to Save
              </button>
            </>
          )}

          <div className="flex bg-slate-800 p-1 rounded-2xl">
            {LEVELS.map(lvl => (
              <button
                key={lvl.id}
                onClick={() => setSelectedLevel(lvl.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${selectedLevel === lvl.id ? `${lvl.color} text-white` : 'text-slate-400 hover:text-white'}`}
              >
                {lvl.id}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 flex flex-col gap-12">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-900/50 via-purple-900/40 to-slate-900 border border-indigo-500/30 p-8 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-white">
              {LEVELS.find(l => l.id === selectedLevel)?.name} <span className="text-indigo-400 font-normal text-xl">({LEVELS.find(l => l.id === selectedLevel)?.deName})</span>
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              <DualText eng={`Active curriculum for level ${selectedLevel}.`} ger={`Aktiver Lehrplan für Stufe ${selectedLevel}.`} />
            </p>
          </div>
          <button 
            onClick={() => document.getElementById('practice-arena')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-2xl flex items-center gap-2"
          >
            <span>Practice Arena</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>

        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              <span>Learning Hub</span>
            </h3>
          </div>

          {currentView === 'lesson' && selectedLesson ? (
            <div className="bg-slate-900 border border-indigo-500/30 rounded-3xl p-8 flex flex-col gap-6">
              <button onClick={() => setCurrentView('hub')} className="self-start px-4 py-2 bg-slate-800 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <h3 className="text-2xl font-black text-white">{selectedLesson.title}</h3>
              <div className="prose prose-invert max-w-none text-slate-300 text-sm bg-slate-950/60 p-6 rounded-2xl">
                {selectedLesson.content}
              </div>
              <button onClick={() => { setXp(p => p + 100); setCurrentView('hub'); }} className="self-end bg-green-600 text-white font-bold px-6 py-3 rounded-2xl text-xs">
                Mark as Mastered (+100 XP)
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {((CURRICULUM as any)[selectedLevel] || []).map((lesson: any, idx: number) => (
                <div key={idx} onClick={() => { setSelectedLesson(lesson); setCurrentView('lesson'); }} className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-3xl p-6 cursor-pointer flex flex-col justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-white">{lesson.title}</h4>
                    <p className="text-xs text-indigo-300 italic mt-1 mb-3">{lesson.de}</p>
                    <p className="text-xs text-slate-400">{lesson.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <div id="practice-arena" className="pt-8 border-t border-slate-800">
          <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
            <Trophy className="w-6 h-6 text-amber-400" />
            <span>Interactive Practice Arena</span>
          </h3>

          {activeGameModule === null ? (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {[
                { id: 'flashcards', title: 'Flashcards', icon: Layers },
                { id: 'reading', title: 'Reading', icon: BookOpen },
                { id: 'writing', title: 'Writing', icon: Type },
                { id: 'listening', title: 'Listening', icon: Headphones },
                { id: 'speaking', title: 'Speaking', icon: Mic }
              ].map((mod) => {
                const IconComponent = mod.icon;
                return (
                  <div key={mod.id} onClick={() => setActiveGameModule(mod.id as any)} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 cursor-pointer hover:border-indigo-500 flex flex-col items-center text-center">
                    <IconComponent className="w-8 h-8 text-indigo-400 mb-3" />
                    <h4 className="font-bold text-white text-sm">{mod.title}</h4>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-slate-900 border border-indigo-500/30 rounded-3xl p-8 flex flex-col gap-6">
              <button onClick={() => setActiveGameModule(null)} className="self-start px-4 py-2 bg-slate-800 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>

              {activeGameModule === 'flashcards' && (
                <div className="flex flex-col items-center gap-6 py-6">
                  <div onClick={() => setIsFlipped(!isFlipped)} className="w-full max-w-md h-64 bg-slate-950 border border-indigo-500/40 rounded-3xl p-8 flex flex-col items-center justify-center cursor-pointer text-center">
                    {!isFlipped ? <div className="text-2xl font-bold">{currentVocabulary[flashcardIndex].en}</div> : <div className="text-2xl font-bold text-amber-400">{currentVocabulary[flashcardIndex].de}</div>}
                  </div>
                  <button onClick={() => { setIsFlipped(false); setXp(p => p + 10); setFlashcardIndex((i) => (i + 1) % currentVocabulary.length); }} className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold">
                    Next Card (+10 XP)
                  </button>
                </div>
              )}

              {activeGameModule === 'reading' && (
                <div className="flex flex-col gap-4">
                  <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-sm">
                    Guten Tag! Mein Name ist Anna. Ich lerne jeden Tag Deutsch.
                  </div>
                  <div className="flex flex-col gap-2">
                    {["Learning German", "Cooking", "Traveling"].map((opt, idx) => (
                      <button key={idx} onClick={() => setReadingQuizAnswer(idx)} className={`p-3 rounded-xl text-xs text-left ${readingQuizAnswer === idx ? 'bg-indigo-600' : 'bg-slate-800'}`}>
                        {opt}
                      </button>
                    ))}
                  </div>
                  {readingQuizAnswer !== null && !readingSubmitted && (
                    <button onClick={() => { setReadingSubmitted(true); if(readingQuizAnswer === 0) setXp(p => p + 50); }} className="px-6 py-2 bg-green-600 rounded-xl text-xs font-bold w-fit">
                      Submit
                    </button>
                  )}
                </div>
              )}

              {activeGameModule === 'writing' && (
                <div className="flex flex-col gap-4">
                  <div className="bg-slate-950 p-6 rounded-2xl border border-indigo-500/30">
                    <p className="text-xs text-indigo-300 font-bold mb-1 uppercase tracking-wider">Translate to German:</p>
                    <p className="text-xl text-white font-medium">"{currentWritingPrompt}"</p>
                  </div>
                  <textarea 
                    rows={4} 
                    value={userWritingText} 
                    onChange={(e) => setUserWritingText(e.target.value)} 
                    placeholder="Type your German translation here..." 
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 outline-none rounded-2xl p-4 text-sm text-white transition-colors" 
                  />
                  <div className="flex gap-4">
                    <button onClick={handleEvaluateWriting} disabled={isEvaluatingWriting || !userWritingText.trim()} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 transition-all rounded-2xl text-xs font-bold shadow-lg shadow-indigo-600/30">
                      {isEvaluatingWriting ? "Evaluating Translation..." : "Submit for Evaluation (+50 XP)"}
                    </button>
                    <button onClick={generateNewWritingPrompt} className="px-6 py-3 bg-slate-800 hover:bg-slate-700 transition-all rounded-2xl text-xs font-bold text-slate-200">
                      Skip / Get New Sentence
                    </button>
                  </div>
                  {writingFeedback && (
                    <div className="bg-slate-950 border border-indigo-500/30 p-6 rounded-2xl text-sm text-slate-200 whitespace-pre-line leading-relaxed mt-2">
                      <p className="text-indigo-400 font-bold mb-2">AI Tutor Feedback:</p>
                      {writingFeedback}
                    </div>
                  )}
                </div>
              )}

              {activeGameModule === 'listening' && (
                <div className="flex flex-col items-center gap-4">
                  <button onClick={() => playGermanSpeech("Guten Tag, wie geht es Ihnen?")} className="px-6 py-3 bg-indigo-600 rounded-2xl text-xs font-bold flex items-center gap-2">
                    <Volume2 className="w-4 h-4" /> {isPlayingAudio ? "Playing..." : "Play Audio"}
                  </button>
                </div>
              )}

              {activeGameModule === 'speaking' && (
                <div className="flex flex-col items-center gap-4">
                  <div className="p-6 bg-slate-950 rounded-full border border-slate-800"><Mic className="w-8 h-8 text-rose-500" /></div>
                  {speakingTranscript && <div className="text-xs text-indigo-300">"{speakingTranscript}"</div>}
                  {speakingFeedback && <div className="text-xs text-green-300 font-bold">{speakingFeedback}</div>}
                  <button onClick={handleSimulateSpeaking} disabled={speakingStatus !== 'idle'} className="px-6 py-3 bg-rose-600 rounded-2xl text-xs font-bold">
                    {speakingStatus === 'idle' ? "Start Speaking" : "Processing..."}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <<footer className="border-t border-slate-800 bg-slate-900/40 py-6 px-6 text-center text-xs text-slate-500">
        GermanQuest AI Platform • Developed by Ayush Goley (GitHub: backlogAK)
      </footer>
    </div>
  );
}