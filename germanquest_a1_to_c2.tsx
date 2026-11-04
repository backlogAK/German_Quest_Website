import React, { useState, useEffect, useRef } from 'react';

// --- INLINE SVGS (To prevent React child errors) ---
const Volume2 = (p) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={p.className} {...p}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>;
const ChevronDown = (p) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={p.className} {...p}><polyline points="6 9 12 15 18 9"/></svg>;
const GraduationCap = (p) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={p.className} {...p}><path d="M21.42 10.922a2 2 0 0 0-.019-3.838L12.83 4.32a2 2 0 0 0-1.66 0L2.6 7.08a2 2 0 0 0 0 3.832l8.57 3.26a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>;
const XCircle = (p) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={p.className} {...p}><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>;
const BookOpen = (p) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={p.className} {...p}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
const Star = (p) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={p.className} {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const Trophy = (p) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={p.className} {...p}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>;
const Mic = (p) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={p.className} {...p}><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>;
const Type = (p) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={p.className} {...p}><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" x2="15" y1="20" y2="20"/><line x1="12" x2="12" y1="4" y2="20"/></svg>;
const Headphones = (p) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={p.className} {...p}><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg>;
const Lock = (p) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={p.className} {...p}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const ArrowLeft = (p) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={p.className} {...p}><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>;
const Layers = (p) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={p.className} {...p}><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>;

// --- HELPER COMPONENT FOR BILINGUAL TEXT ---
const DualText = ({ eng, ger, align = "left", engClass = "block", gerClass = "block text-[0.8em] text-indigo-300/80 font-medium italic mt-0.5" }) => (
  <span className={`inline-flex flex-col ${align === 'center' ? 'items-center text-center' : align === 'right' ? 'items-end text-right' : 'items-start text-left'} leading-tight`}>
    <span className={engClass}>{eng}</span>
    {ger && <span className={gerClass}>{ger}</span>}
  </span>
);

// --- CONFIGURATION & CONSTANTS ---
const API_KEY = "YOUR_GEMINI_API_KEY"; // Ensure your API key is configured if deploying

const LEVELS = [
  { id: 'A1', name: 'Beginner', deName: 'Anfänger', xpRequired: 0, color: 'bg-green-500', shadow: 'shadow-green-500/50' },
  { id: 'A2', name: 'Elementary', deName: 'Grundstufe', xpRequired: 1000, color: 'bg-teal-500', shadow: 'shadow-teal-500/50' },
  { id: 'B1', name: 'Intermediate', deName: 'Mittelstufe', xpRequired: 2500, color: 'bg-blue-500', shadow: 'shadow-blue-500/50' },
  { id: 'B2', name: 'Upper Intermediate', deName: 'Obere Mittelstufe', xpRequired: 4500, color: 'bg-violet-500', shadow: 'shadow-violet-500/50' },
  { id: 'C1', name: 'Advanced', deName: 'Fortgeschritten', xpRequired: 7000, color: 'bg-purple-500', shadow: 'shadow-purple-500/50' },
  { id: 'C2', name: 'Mastery', deName: 'Meisterschaft', xpRequired: 10000, color: 'bg-indigo-500', shadow: 'shadow-indigo-500/50' }
];

const CURRICULUM = {
  A1: [
    { id: 'alphabet', name: 'Alphabet & Basics', deName: 'Alphabet & Grundlagen' },
    { id: 'articles_cases', name: '1 & 2. Articles & Cases', deName: 'Artikel & Kasus' },
    { id: 'verb_conjugation', name: '3. Verb Conjugation (Präsens)', deName: 'Verbkombination (Präsens)' },
    { id: 'word_order', name: '4. Word Order', deName: 'Satzbau' },
    { id: 'possessive_articles', name: '5. Possessive Articles', deName: 'Possessivartikel' },
    { id: 'prepositions', name: '6. Prepositions (Akk/Dat)', deName: 'Präpositionen' },
    { id: 'tenses', name: '7. Tenses (Präsens)', deName: 'Zeitformen' },
    { id: 'question_words', name: '8. Question Words', deName: 'W-Fragen' },
    { id: 'adjectives', name: '9. Adjectives (Basic Use)', deName: 'Adjektive (Grundnutzung)' },
  ],
  A2: [
    { id: 'noun_groups', name: '1. Nouns, Articles & Plurals', deName: 'Nomen, Artikel & Plural' },
    { id: 'pronouns', name: '2. Pronouns (Possessive & Personal)', deName: 'Pronomen (Possessiv & Personal)' },
    { id: 'verbs_present_imperative', name: '3. Verbs: Present & Imperative', deName: 'Verben: Präsens & Imperativ' },
    { id: 'verbs_past_tenses', name: '4. Verbs: Past Tenses (Perfekt & Präteritum)', deName: 'Verben: Vergangenheitsformen' },
    { id: 'verbs_special_prefix', name: '5. Haben, Sein, Modals & Prefix Verbs', deName: 'Haben, Sein, Modal- & Präfixverben' },
    { id: 'prepositions_a2', name: '6. Prepositions (Akk, Dat, Wechsel)', deName: 'Präpositionen' },
    { id: 'adjective_comparison', name: '7. Adjective Comparison', deName: 'Komparation der Adjektive' },
    { id: 'sentence_structure', name: '8. Sentence Structure & Conjunctions', deName: 'Satzbau & Konjunktionen' },
    { id: 'verb_rektion', name: '9. Verb Government (Rektion)', deName: 'Verben: Rektion' },
    { id: 'konjunktiv_2', name: '10. Konjunktiv II', deName: 'Konjunktiv II' },
  ],
  B1: [
    { id: 'simple_past', name: 'Simple Past (Präteritum)', deName: 'Präteritum (Einfache Vergangenheit)' },
    { id: 'relative_clauses', name: 'Relative Clauses', deName: 'Relativsätze' },
    { id: 'passive_voice', name: 'Passive Voice (Present & Past)', deName: 'Passiv (Gegenwart & Vergangenheit)' },
    { id: 'konjunktiv_2', name: 'Subjunctive II', deName: 'Konjunktiv II' },
    { id: 'genitive', name: 'The Genitive Case', deName: 'Der Genitiv' },
  ],
  B2: [
    { id: 'adjective_declension', name: 'Adjective Declensions', deName: 'Adjektivdeklinationen' },
    { id: 'n_declension', name: 'N-Declension', deName: 'N-Deklination' },
    { id: 'advanced_passive', name: 'Advanced Passive structures', deName: 'Erweiterte Passivstrukturen' },
    { id: 'konjunktiv_1', name: 'Subjunctive I (Indirect Speech)', deName: 'Konjunktiv I (Indirekte Rede)' },
  ],
  C1: [
    { id: 'nominalization', name: 'Nominalization (Verbs to Nouns)', deName: 'Nominalisierung (Verben zu Nomen)' },
    { id: 'complex_sentences', name: 'Complex Sentence Structures', deName: 'Komplexe Satzstrukturen' },
    { id: 'participles', name: 'Extended Participle Phrases', deName: 'Erweiterte Partizipialattribute' },
  ],
  C2: [
    { id: 'nuances', name: 'Nuances of Expression', deName: 'Ausdrucksnuancen' },
    { id: 'idioms', name: 'German Idioms & Proverbs', deName: 'Deutsche Redewendungen & Sprichwörter' },
    { id: 'stylistic_devices', name: 'Stylistic Devices & Rhetoric', deName: 'Stilmittel & Rhetorik' },
  ]
};

const MODULES = [
  { id: 'flashcards', name: 'Vocabulary', deName: 'Wortschatz', icon: Layers, xp: 50, color: 'bg-orange-500' },
  { id: 'reading', name: 'Reading', deName: 'Lesen', icon: BookOpen, xp: 100, color: 'bg-emerald-500' },
  { id: 'writing', name: 'Writing', deName: 'Schreiben', icon: Type, xp: 150, color: 'bg-blue-500' },
  { id: 'listening', name: 'Listening', deName: 'Hören', icon: Headphones, xp: 150, color: 'bg-purple-500' },
  { id: 'speaking', name: 'Speaking', deName: 'Sprechen', icon: Mic, xp: 200, color: 'bg-rose-500' },
];

// --- MAIN APPLICATION COMPONENT ---
export default function App() {
  const [userData, setUserData] = useState({ xp: 0, unlockedLevels: ['A1'], completed: {}, plaques: [] });
  const [currentView, setCurrentView] = useState('dashboard'); // dashboard, level
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);

  // Curriculum State
  const [activeLearningLevel, setActiveLearningLevel] = useState('A1');
  const [activeLesson, setActiveLesson] = useState(null);

  const SelectedModuleIcon = selectedModule?.icon;

  const addXP = (amount, levelId, moduleId) => {
    setUserData(prev => {
      const newXP = prev.xp + amount;
      const newCompleted = { ...prev.completed, [`${levelId}-${moduleId}`]: true };
      const newUnlocked = [...prev.unlockedLevels];
      
      // Check for level unlocks
      LEVELS.forEach(level => {
        if (newXP >= level.xpRequired && !newUnlocked.includes(level.id)) {
          newUnlocked.push(level.id);
        }
      });

      return { ...prev, xp: newXP, completed: newCompleted, unlockedLevels: newUnlocked };
    });
    setSelectedModule(null); // Go back after completion
  };

  const goBack = () => {
    if (selectedModule) {
      setSelectedModule(null);
    } else {
      setCurrentView('dashboard');
      setSelectedLevel(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 flex flex-col">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => {setCurrentView('dashboard'); setSelectedModule(null);}}>
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/30">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">German<span className="text-indigo-400">Quest</span></h1>
          </div>
          
          <div className="flex items-center gap-4 bg-slate-900 rounded-full px-5 py-2.5 border border-slate-800">
            <Star className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-lg">{userData.xp} <span className="text-slate-400 text-sm font-medium">XP</span></span>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-12 flex-1 w-full">
        
        {/* LEARNING HUB SECTION (Always visible at top unless deeply inside a game module) */}
        {!selectedModule && (
          <section className="mb-32 animate-in fade-in duration-500">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center p-4 bg-indigo-500/10 rounded-3xl mb-6">
                <GraduationCap className="w-10 h-10 text-indigo-400" />
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight flex justify-center">
                <DualText eng="The Learning Hub" ger="Das Lernzentrum" align="center" gerClass="block text-2xl text-indigo-400 mt-2" />
              </h2>
              <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed flex justify-center">
                <DualText 
                  eng="Master the theory before you practice. Select your level to access comprehensive grammar and vocabulary lessons." 
                  ger="Beherrschen Sie die Theorie, bevor Sie üben. Wählen Sie Ihr Niveau, um auf umfassende Lektionen zuzugreifen."
                  align="center"
                />
              </p>
            </div>

            {/* Level Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {LEVELS.map(level => (
                <button
                  key={level.id}
                  onClick={() => { setActiveLearningLevel(level.id); setActiveLesson(null); }}
                  className={`px-8 py-3 rounded-2xl font-bold transition-all duration-300 ${
                    activeLearningLevel === level.id 
                      ? `${level.color} text-white shadow-xl ${level.shadow} scale-105` 
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <DualText eng={`${level.id} - ${level.name}`} ger={level.deName} align="center" gerClass={activeLearningLevel === level.id ? 'block text-xs text-white/80 font-medium italic mt-0.5' : 'block text-xs text-slate-500 font-medium italic mt-0.5'} />
                </button>
              ))}
            </div>

            {/* Topics Grid */}
            {!activeLesson ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
                {CURRICULUM[activeLearningLevel].map(topic => (
                  <button
                    key={topic.id}
                    onClick={() => setActiveLesson({ ...topic, levelId: activeLearningLevel })}
                    className="flex flex-col items-start p-6 bg-slate-900 border border-slate-800 rounded-3xl hover:border-indigo-500 hover:bg-slate-800 transition-all text-left group shadow-lg shadow-black/20"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
                      <BookOpen className="w-5 h-5 text-slate-400 group-hover:text-indigo-400" />
                    </div>
                    <span className="font-bold text-lg text-slate-200 group-hover:text-white leading-tight">
                      <DualText eng={topic.name} ger={topic.deName} />
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <LessonViewer lesson={activeLesson} onClose={() => setActiveLesson(null)} />
            )}
            
            {/* Scroll Down Divider */}
            <div className="mt-24 flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => document.getElementById('practice-arena').scrollIntoView({ behavior: 'smooth' })}>
              <div className="h-32 w-px bg-gradient-to-b from-transparent via-indigo-500 to-transparent"></div>
              <p className="uppercase tracking-[0.2em] text-xs font-bold text-indigo-400 mt-6 mb-3 text-center">
                <DualText eng="Scroll down to Practice" ger="Nach unten scrollen zum Üben" align="center" />
              </p>
              <ChevronDown className="w-8 h-8 text-indigo-400 animate-bounce" />
            </div>
          </section>
        )}

        {/* GAMIFIED PRACTICE SECTION */}
        {currentView === 'dashboard' && !selectedModule && (
          <section id="practice-arena" className="pt-10 pb-20">
            <Dashboard 
              userData={userData} 
              onSelectLevel={(level) => { setSelectedLevel(level); setCurrentView('level'); }} 
            />
          </section>
        )}
        
        {currentView === 'level' && !selectedModule && (
          <section id="level-view" className="pt-10 pb-20">
            <LevelView 
              level={selectedLevel} 
              userData={userData}
              onSelectModule={setSelectedModule}
              onBack={goBack}
            />
          </section>
        )}

        {currentView === 'level' && selectedModule && (
          <div className="animate-in slide-in-from-bottom-8 duration-500">
            <div className="flex items-center gap-4 mb-8">
              <button onClick={goBack} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  {SelectedModuleIcon && <SelectedModuleIcon className={`w-8 h-8 text-${selectedModule.color.split('-')[1]}-400`} />}
                  <DualText eng={`${selectedLevel.id} ${selectedModule.name}`} ger={`${selectedLevel.id} ${selectedModule.deName}`} gerClass="block text-xl text-indigo-300/80 font-medium italic mt-0.5" />
                </h2>
                <p className="text-slate-400 mt-2">
                  <DualText eng={`Complete this module to earn ${selectedModule.xp} XP.`} ger={`Schließe dieses Modul ab, um ${selectedModule.xp} XP zu verdienen.`} />
                </p>
              </div>
            </div>

            {selectedModule.id === 'flashcards' && <FlashcardModule level={selectedLevel} onComplete={() => addXP(selectedModule.xp, selectedLevel.id, selectedModule.id)} />}
            {selectedModule.id === 'reading' && <ReadingModule level={selectedLevel} onComplete={() => addXP(selectedModule.xp, selectedLevel.id, selectedModule.id)} />}
            {selectedModule.id === 'writing' && <WritingModule level={selectedLevel} onComplete={() => addXP(selectedModule.xp, selectedLevel.id, selectedModule.id)} />}
            {selectedModule.id === 'listening' && <ListeningModule level={selectedLevel} onComplete={() => addXP(selectedModule.xp, selectedLevel.id, selectedModule.id)} />}
            {selectedModule.id === 'speaking' && <SpeakingModule level={selectedLevel} onComplete={() => addXP(selectedModule.xp, selectedLevel.id, selectedModule.id)} />}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 bg-slate-950 py-10 mt-auto">
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mb-4 border border-slate-800">
            <Trophy className="w-5 h-5 text-indigo-500" />
          </div>
          <p className="font-bold text-slate-300 text-lg mb-2">
            <DualText eng="Developed by me" ger="Entwickelt von mir" align="center" />
          </p>
          <p className="text-sm text-slate-500 max-w-md flex justify-center">
            <DualText eng="GermanQuest is a comprehensive open-source language learning ecosystem. From absolute beginner (A1) to total mastery (C2)." ger="GermanQuest ist ein umfassendes Open-Source-Ökosystem zum Sprachenlernen. Vom absoluten Anfänger (A1) bis zur völligen Beherrschung (C2)." align="center" />
          </p>
        </div>
      </footer>
    </div>
  );
}

// --- LESSON VIEWER COMPONENT (DYNAMIC LEARNING CONTENT) ---
function LessonViewer({ lesson, onClose }) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    // Elaborate fallback content based on A1 Notes Images
    const getElaborateContent = (lessonId, name) => {
      const db = {
        articles_cases: {
          title: "1 & 2. Definite & Indefinite Articles & Cases",
          introduction: "German nouns have genders (masculine, feminine, neuter) and cases (Nominative, Accusative, Dative). (Deutsche Nomen haben Geschlechter (männlich, weiblich, sächlich) und Fälle (Nominativ, Akkusativ, Dativ).) Understanding these is the foundation of German grammar. (Das Verständnis dieser ist die Grundlage der deutschen Grammatik.)",
          rules: [
            "Definite Articles (The): Masculine = der, Feminine = die, Neuter = das, Plural = die. (Bestimmte Artikel: Männlich = der, Weiblich = die, Sächlich = das, Plural = die.)",
            "Indefinite Articles (A/An): Masculine = ein, Feminine = eine, Neuter = ein, Plural = none. (Unbestimmte Artikel: Männlich = ein, Weiblich = eine, Sächlich = ein, Plural = keine.)",
            "Negation (No/None): Masculine = kein, Feminine = keine, Neuter = kein, Plural = keine. (Verneinung: Männlich = kein, Weiblich = keine, Sächlich = kein, Plural = keine.)",
            "Nominative Case is used for the subject. (Der Nominativ wird für das Subjekt verwendet.): der Mann, die Frau, das Kind, die Kinder.",
            "Accusative Case is used for the direct object. (Der Akkusativ wird für das direkte Objekt verwendet.): den Mann, die Frau, das Kind, die Kinder.",
            "Dative Case is used for the indirect object or after certain prepositions. (Der Dativ wird für das indirekte Objekt oder nach bestimmten Präpositionen verwendet.): dem Mann, der Frau, dem Kind, den Kindern."
          ],
          examples: [
            { german: "Der Mann sieht den Hund.", english: "The man (subject) sees the dog (direct object)." },
            { german: "Ich gebe der Frau das Buch.", english: "I give the woman (indirect object) the book (direct object)." }
          ],
          tips: ["Always learn a noun with its definite article! (Lerne ein Nomen immer mit seinem bestimmten Artikel!)"]
        },
        verb_conjugation: {
          title: "3. Verb Conjugation (Präsens - Present Tense)",
          introduction: "In German, verbs change their endings based on the pronoun (I, you, he/she/it). (Im Deutschen ändern Verben ihre Endungen basierend auf dem Pronomen (ich, du, er/sie/es).) We will use 'spielen' (to play) as an example. (Wir werden 'spielen' als Beispiel verwenden.)",
          rules: [
            "ich (I) -> add '-e' (spiele). (ich -> füge '-e' hinzu (spiele).)",
            "du (you, informal) -> add '-st' (spielst). (du -> füge '-st' hinzu (spielst).)",
            "er/sie/es (he/she/it) -> add '-t' (spielt). (er/sie/es -> füge '-t' hinzu (spielt).)",
            "wir (we) -> add '-en' (spielen). (wir -> füge '-en' hinzu (spielen).)",
            "ihr (you all) -> add '-t' (spielt). (ihr -> füge '-t' hinzu (spielt).)",
            "sie/Sie (they/you formal) -> add '-en' (spielen). (sie/Sie -> füge '-en' hinzu (spielen).)"
          ],
          examples: [
            { german: "Ich spiele Fußball.", english: "I play football." },
            { german: "Spielst du Gitarre?", english: "Do you play guitar?" }
          ],
          tips: ["Notice that 'wir' and 'sie/Sie' almost always use the infinitive form of the verb! (Beachte, dass 'wir' und 'sie/Sie' fast immer die Infinitivform des Verbs verwenden!)"]
        },
        word_order: {
          title: "4. Word Order (Satzbau)",
          introduction: "German sentence structure has strict rules, especially regarding the position of the verb. (Der deutsche Satzbau hat strenge Regeln, besonders was die Position des Verbs angeht.)",
          rules: [
            "Statement (Aussage): Subject + Verb + Rest. The conjugated verb is always in position 2. (Das konjugierte Verb steht immer an Position 2.)",
            "Yes/No Question (Ja/Nein Frage): Verb + Subject + Rest. The verb moves to position 1. (Das Verb rückt an Position 1.)",
            "Adverb First (Adverb Zuerst): Adverb + Verb + Subject. Even if an adverb starts the sentence, the verb stays in position 2! (Auch wenn ein Adverb den Satz beginnt, bleibt das Verb an Position 2!)",
            "With Two Verbs (Mit Zwei Verben): Conjugated verb 2nd + infinitive at the very end. (Konjugiertes Verb an 2. Stelle + Infinitiv ganz am Ende.)"
          ],
          examples: [
            { german: "Ich lerne Deutsch.", english: "I learn German. (Statement)" },
            { german: "Lernst du Deutsch?", english: "Do you learn German? (Question)" },
            { german: "Heute lerne ich Deutsch.", english: "Today I learn German. (Adverb first)" },
            { german: "Ich möchte Deutsch lernen.", english: "I want to learn German. (Two verbs)" }
          ],
          tips: ["Verb at position 2 is the most important rule in German main clauses! (Verb an Position 2 ist die wichtigste Regel in deutschen Hauptsätzen!)"]
        },
        possessive_articles: {
          title: "5. Possessive Articles (Possessivartikel)",
          introduction: "Possessive articles show ownership (my, your, his). They change endings just like 'ein' and 'kein'. (Possessivartikel zeigen Besitz an (mein, dein, sein). Sie ändern ihre Endungen genau wie 'ein' und 'kein'.)",
          rules: [
            "ich (I) -> mein/meine (my). (ich -> mein/meine (mein).)",
            "du (you) -> dein/deine (your). (du -> dein/deine (dein).)",
            "er (he) -> sein/seine (his). (er -> sein/seine (sein).)",
            "sie (she) -> ihr/ihre (her). (sie -> ihr/ihre (ihr).)",
            "es (it) -> sein/seine (its). (es -> sein/seine (sein).)",
            "wir (we) -> unser/unsere (our). (wir -> unser/unsere (unser).)",
            "ihr (you all) -> euer/eure (your pl.). (ihr -> euer/eure (euer).)",
            "sie/Sie (they/You formal) -> ihr/Ihr (their/Your). (sie/Sie -> ihr/Ihr (ihr/Ihr).)"
          ],
          examples: [
            { german: "Das ist mein Hund.", english: "That is my dog. (Masculine)" },
            { german: "Wo ist deine Schwester?", english: "Where is your sister? (Feminine)" }
          ],
          tips: ["Use the '-e' ending (meine, deine, seine) when the owned noun is feminine or plural. (Benutze die Endung '-e' (meine, deine, seine), wenn das besessene Nomen weiblich oder im Plural ist.)"]
        },
        prepositions: {
          title: "6. Prepositions (Präpositionen)",
          introduction: "Prepositions link words together. In German, certain prepositions ALWAYS force the following noun into a specific case. (Präpositionen verbinden Wörter. Im Deutschen zwingen bestimmte Präpositionen das folgende Nomen IMMER in einen bestimmten Fall.)",
          rules: [
            "Akkusativ Prepositions (Akkusativ-Präpositionen): für, durch, gegen, ohne, um. They strictly take the Accusative case. (Sie verlangen strikt den Akkusativ.)",
            "Dativ Prepositions (Dativ-Präpositionen): mit, nach, bei, seit, von, zu, aus. They strictly take the Dative case. (Sie verlangen strikt den Dativ.)",
            "Two-way Prepositions (Wechselpräpositionen): in, an, auf, über, unter, vor, hinter, zwischen, neben.",
            "For Two-way Prepositions: Use Accusative if there is motion towards a destination. (Für Wechselpräpositionen: Benutze Akkusativ, wenn es eine Bewegung zu einem Ziel gibt.)",
            "For Two-way Prepositions: Use Dative if describing a fixed location. (Für Wechselpräpositionen: Benutze Dativ, wenn ein fester Ort beschrieben wird.)"
          ],
          examples: [
            { german: "Das Geschenk ist für dich.", english: "The gift is for you. (für -> Akkusativ)" },
            { german: "Ich spiele mit dem Hund.", english: "I am playing with the dog. (mit -> Dativ)" },
            { german: "Ich gehe in die Schule.", english: "I go into the school. (motion -> Akkusativ)" },
            { german: "Ich bin in der Schule.", english: "I am in the school. (location -> Dativ)" }
          ],
          tips: ["Memorize the Dative prepositions with a song! (Lerne die Dativ-Präpositionen mit einem Lied auswendig!)"]
        },
        tenses: {
          title: "7. Tenses (Präsens Only in A1)",
          introduction: "In level A1, we primarily focus on the Present Tense (Präsens). (Im Niveau A1 konzentrieren wir uns hauptsächlich auf das Präsens.)",
          rules: [
            "Present Use: It is used to express things happening right now or general facts. (Gegenwartsgebrauch: Es wird verwendet, um Dinge auszudrücken, die gerade passieren, oder allgemeine Fakten.)",
            "Future Meaning: In German, you can use the Present Tense to talk about the future, often by adding a time word (like 'tomorrow'). (Zukünftige Bedeutung: Im Deutschen kann man das Präsens verwenden, um über die Zukunft zu sprechen, oft indem man ein Zeitwort hinzufügt (wie 'morgen').)"
          ],
          examples: [
            { german: "Ich lerne Deutsch.", english: "I am learning German. (Present)" },
            { german: "Morgen arbeite ich nicht.", english: "I'm not working tomorrow. (Future meaning)" }
          ],
          tips: ["You don't need a complicated future tense in A1; just use the present tense with a future time word! (Du brauchst im A1 kein kompliziertes Futur; benutze einfach das Präsens mit einem zukünftigen Zeitwort!)"]
        },
        question_words: {
          title: "8. Question Words (W-Fragen)",
          introduction: "Question words are essential for gathering information. They all start with 'W' in German. (Fragewörter sind wichtig, um Informationen zu sammeln. Sie beginnen auf Deutsch alle mit 'W'.)",
          rules: [
            "Wer? = Who? (Wer? = Who?)",
            "Was? = What? (Was? = What?)",
            "Wo? = Where? (Wo? = Where?)",
            "Wohin? = Where to? (Wohin? = Where to?)",
            "Woher? = Where from? (Woher? = Where from?)",
            "Wie? = How? (Wie? = How?)",
            "Wann? = When? (Wann? = When?)",
            "Warum? = Why? (Warum? = Why?)",
            "Wie viel / viele? = How much / many? (Wie viel / viele? = How much / many?)"
          ],
          examples: [
            { german: "Wer bist du?", english: "Who are you?" },
            { german: "Was machst du?", english: "What are you doing?" },
            { german: "Woher kommst du?", english: "Where do you come from?" },
            { german: "Wie viel kostet das?", english: "How much does that cost?" }
          ],
          tips: ["Don't confuse 'Wo' (Where - location), 'Wohin' (Where to - destination), and 'Woher' (Where from - origin)! (Verwechsle nicht 'Wo', 'Wohin' und 'Woher'!)"]
        },
        adjectives: {
          title: "9. Adjectives (Adjektive - Basic Use)",
          introduction: "Adjectives describe nouns. In A1, we learn the absolute basics of how to place them. (Adjektive beschreiben Nomen. In A1 lernen wir die absoluten Grundlagen ihrer Platzierung.)",
          rules: [
            "Before noun (no article): Adjectives take an ending based on the gender of the noun. (Vor dem Nomen (ohne Artikel): Adjektive erhalten eine Endung basierend auf dem Geschlecht des Nomens.)",
            "After verb (sein, bleiben): The adjective acts as a predicate and takes NO ending! (Nach dem Verb (sein, bleiben): Das Adjektiv fungiert als Prädikat und erhält KEINE Endung!)",
            "With articles: Adjective endings change depending on the case. You will learn this deeply in level A2. (Mit Artikeln: Adjektivendungen ändern sich je nach Fall. Du wirst das im Niveau A2 intensiv lernen.)"
          ],
          examples: [
            { german: "Schöner Tag!", english: "Beautiful day! (Before noun, no article)" },
            { german: "Der Tag ist schön.", english: "The day is beautiful. (After verb, no ending)" }
          ],
          tips: ["If the adjective is separated from the noun by 'ist' (is), leave it in its basic dictionary form! (Wenn das Adjektiv durch 'ist' vom Nomen getrennt ist, belasse es in seiner Grundform!)"]
        },
        noun_groups: {
          title: "1. Nouns, Articles & Plurals",
          introduction: "In level A2, we expand our knowledge of nouns to include the Genitive case and plural formations. (Im Niveau A2 erweitern wir unser Wissen über Nomen um den Genitiv und die Pluralbildung.)",
          rules: [
            "Nominativ (Subject): der, die, das, die. (Nominativ (Subjekt): der, die, das, die.)",
            "Akkusativ (Direct Object): den, die, das, die. (Akkusativ (Direktes Objekt): den, die, das, die.)",
            "Dativ (Indirect Object): dem, der, dem, den (+n). (Dativ (Indirektes Objekt): dem, der, dem, den (+n).)",
            "Genitiv (Possession): des (+s/es), der, des (+s/es), der. (Genitiv (Besitz): des (+s/es), der, des (+s/es), der.)",
            "Plural endings include -e (die Telefone), -er (die Bilder), -(e)n (die Menschen), -s (die Büros). (Pluralendungen umfassen -e, -er, -(e)n, -s.)",
            "Many plurals also add an Umlaut to the main vowel (der Baum -> die Bäume). (Viele Plurale fügen auch einen Umlaut zum Hauptvokal hinzu.)"
          ],
          examples: [
            { german: "Das Buch des Lehrers ist neu.", english: "The teacher's book is new. (Genitiv)" },
            { german: "Die Bäume haben grüne Blätter.", english: "The trees have green leaves. (Plural with Umlaut & -er)" }
          ],
          tips: ["Always learn the plural form together with the gender of the noun! (Lerne immer die Pluralform zusammen mit dem Geschlecht des Nomens!)"]
        },
        pronouns: {
          title: "2. Pronouns (Possessive & Personal)",
          introduction: "Pronouns replace or accompany nouns and change based on the grammatical case. (Pronomen ersetzen oder begleiten Nomen und ändern sich je nach grammatikalischem Fall.)",
          rules: [
            "Personal Pronouns Nominativ: ich, du, er, sie, es, wir, ihr, sie, Sie. (Personalpronomen Nominativ: ich, du, er, sie, es, wir, ihr, sie, Sie.)",
            "Personal Pronouns Akkusativ: mich, dich, ihn, sie, es, uns, euch, sie, Sie. (Personalpronomen Akkusativ: mich, dich, ihn, sie, es, uns, euch, sie, Sie.)",
            "Personal Pronouns Dativ: mir, dir, ihm, ihr, ihm, uns, euch, ihnen, Ihnen. (Personalpronomen Dativ: mir, dir, ihm, ihr, ihm, uns, euch, ihnen, Ihnen.)",
            "Possessive Articles (mein, dein, sein, ihr, unser, euer, ihr, Ihr) take the same endings as the indefinite article 'ein'. (Possessivartikel nehmen die gleichen Endungen wie der unbestimmte Artikel 'ein'.)"
          ],
          examples: [
            { german: "Ich helfe dir.", english: "I help you. (Dativ)" },
            { german: "Das ist unser neues Auto.", english: "That is our new car. (Possessive, Nominativ)" }
          ],
          tips: ["Notice that 'ihr' can mean 'her' (possessive), 'their' (possessive), 'you all' (nominative), or 'to her' (dative)! Context is key! (Beachte, dass 'ihr' viele Bedeutungen haben kann! Der Kontext ist entscheidend!)"]
        },
        verbs_present_imperative: {
          title: "3. Verbs: Present Tense & Imperative",
          introduction: "Review the present tense irregularities and learn how to give commands using the Imperative. (Wiederhole die Unregelmäßigkeiten im Präsens und lerne, wie man mit dem Imperativ Befehle erteilt.)",
          rules: [
            "Irregular verbs often change their stem vowel in the 2nd and 3rd person singular (e.g., lesen -> du liest, fahren -> er fährt). (Unregelmäßige Verben ändern oft ihren Stammvokal in der 2. und 3. Person Singular.)",
            "Imperative 'du' (informal singular): Drop the '-en' and the pronoun (Kommen -> Komm!). (Imperativ 'du': Lass das '-en' und das Pronomen weg (Komm!).)",
            "Imperative 'ihr' (informal plural): Use the normal conjugation but drop the pronoun (Kommen -> Kommt!). (Imperativ 'ihr': Benutze die normale Konjugation, aber lass das Pronomen weg (Kommt!).)",
            "Imperative 'Sie' (formal): Use the infinitive followed by 'Sie' (Kommen -> Kommen Sie!). (Imperativ 'Sie': Benutze den Infinitiv gefolgt von 'Sie' (Kommen Sie!).)"
          ],
          examples: [
            { german: "Nimm das Buch!", english: "Take the book! (du)" },
            { german: "Fahren Sie bitte langsam!", english: "Please drive slowly! (Sie)" }
          ],
          tips: ["For verbs ending in -d or -t, add an '-e' in the 'du' imperative (z.B. arbeiten -> Arbeite!). (Für Verben auf -d oder -t füge im 'du' Imperativ ein '-e' hinzu.)"]
        },
        verbs_past_tenses: {
          title: "4. Verbs: Past Tenses (Perfekt & Präteritum)",
          introduction: "To talk about the past, Germans use the Perfekt mostly in spoken language, and the Präteritum in written language or for specific verbs. (Um über die Vergangenheit zu sprechen, nutzen Deutsche das Perfekt meist in der gesprochenen Sprache und das Präteritum in der Schriftsprache oder für bestimmte Verben.)",
          rules: [
            "Perfekt = haben or sein + Partizip II (ge...t / ge...en). (Perfekt = haben oder sein + Partizip II.)",
            "Use 'sein' for movement (gehen, fahren) or change of state (werden, sterben). (Benutze 'sein' für Bewegung oder Zustandsänderung.)",
            "Regular verbs form Partizip II with 'ge- -t' (kaufen -> gekauft). (Regelmäßige Verben bilden das Partizip II mit 'ge- -t'.)",
            "Irregular verbs often use 'ge- -en' and change the vowel (singen -> gesungen). (Unregelmäßige Verben nutzen oft 'ge- -en' und ändern den Vokal.)",
            "Präteritum (Simple Past) is mainly used for 'haben' (hatte), 'sein' (war), and modal verbs (musste, konnte). (Präteritum wird hauptsächlich für 'haben', 'sein' und Modalverben verwendet.)"
          ],
          examples: [
            { german: "Ich bin nach Berlin gefahren.", english: "I drove to Berlin. (Perfekt with sein)" },
            { german: "Als Kind war ich oft krank.", english: "As a child, I was often sick. (Präteritum of sein)" }
          ],
          tips: ["Verbs ending in '-ieren' (studieren, telefonieren) do NOT get a 'ge-' in the Perfekt (studiert, telefoniert)! (Verben auf '-ieren' bekommen KEIN 'ge-' im Perfekt!)"]
        },
        verbs_special_prefix: {
          title: "5. Haben, Sein, Modals & Prefix Verbs",
          introduction: "Master the most important helping verbs and verbs with prefixes to construct more complex meanings. (Beherrsche die wichtigsten Hilfsverben und Verben mit Präfixen, um komplexere Bedeutungen zu bilden.)",
          rules: [
            "Modal verbs (können, müssen, sollen, wollen, dürfen, mögen) send the second verb to the VERY END of the sentence in its infinitive form. (Modalverben schicken das zweite Verb GANZ ANS ENDE des Satzes im Infinitiv.)",
            "Inseparable prefixes (be-, emp-, ent-, er-, ge-, ver-, zer-) stay permanently attached to the verb. (Untrennbare Präfixe bleiben dauerhaft am Verb.)",
            "Separable prefixes (ab-, an-, auf-, aus-, ein-, mit-, vor-, zu-) split from the verb and go to the end of the main clause. (Trennbare Präfixe trennen sich vom Verb und gehen ans Ende des Hauptsatzes.)",
            "In the Perfekt, separable verbs put '-ge-' between the prefix and the stem (eingekauft). (Im Perfekt setzen trennbare Verben das '-ge-' zwischen Präfix und Stamm.)"
          ],
          examples: [
            { german: "Ich muss heute lange arbeiten.", english: "I must work long today. (Modal)" },
            { german: "Ich stehe jeden Tag um 7 Uhr auf.", english: "I get up at 7 o'clock every day. (Separable prefix 'auf') " }
          ],
          tips: ["Memorize the inseparable prefixes: Be-emp-ent-er-ge-ver-zer! (Lerne die untrennbaren Präfixe auswendig: Be-emp-ent-er-ge-ver-zer!)"]
        },
        prepositions_a2: {
          title: "6. Prepositions (Akkusativ, Dativ, Wechsel)",
          introduction: "Prepositions link words and strictly determine the case of the noun that follows them. (Präpositionen verbinden Wörter und bestimmen strikt den Fall des folgenden Nomens.)",
          rules: [
            "Strictly Akkusativ: bis, durch, für, gegen, ohne, um. (Strikt Akkusativ: bis, durch, für, gegen, ohne, um.)",
            "Strictly Dativ: ab, aus, bei, mit, nach, seit, von, zu. (Strikt Dativ: ab, aus, bei, mit, nach, seit, von, zu.)",
            "Two-Way Prepositions (Wechselpräpositionen): an, auf, hinter, in, neben, über, unter, vor, zwischen. (Wechselpräpositionen: an, auf, hinter, in, neben, über, unter, vor, zwischen.)",
            "Use Akkusativ with Two-Way Prepositions if there is movement towards a destination (Question: Wohin?). (Benutze Akkusativ bei Wechselpräpositionen, wenn es eine Bewegung zu einem Ziel gibt (Frage: Wohin?).)",
            "Use Dativ with Two-Way Prepositions if it describes a fixed location (Question: Wo?). (Benutze Dativ bei Wechselpräpositionen, wenn es einen festen Ort beschreibt (Frage: Wo?).)"
          ],
          examples: [
            { german: "Die Blumen sind für meine Frau.", english: "The flowers are for my wife. (für + Akkusativ)" },
            { german: "Das Bild hängt an der Wand.", english: "The picture hangs on the wall. (Wo? -> Dativ)" }
          ],
          tips: ["Prepositions often merge with articles: an dem = am, in das = ins, zu der = zur. (Präpositionen verschmelzen oft mit Artikeln: an dem = am, in das = ins, zu der = zur.)"]
        },
        adjective_comparison: {
          title: "7. Adjective Comparison",
          introduction: "You can compare things using the Positiv (basic), Komparativ (more), and Superlativ (most). (Du kannst Dinge mit dem Positiv, Komparativ und Superlativ vergleichen.)",
          rules: [
            "Komparativ: Add '-er' to the adjective (billig -> billiger). (Komparativ: Füge '-er' an das Adjektiv an.)",
            "Superlativ: Use 'am' + adjective + '-sten' (am billigsten) OR definite article + adjective + '-ste' (der billigste). (Superlativ: Nutze 'am ... -sten' ODER den bestimmten Artikel + '-ste'.)",
            "Short adjectives with a, o, or u often get an Umlaut (warm -> wärmer -> am wärmsten). (Kurze Adjektive mit a, o oder u bekommen oft einen Umlaut.)",
            "Irregular forms: gut - besser - am besten / viel - mehr - am meisten / gern - lieber - am liebsten. (Unregelmäßige Formen: gut - besser - am besten / viel - mehr - am meisten...)"
          ],
          examples: [
            { german: "Ein Porsche ist schneller als ein VW.", english: "A Porsche is faster than a VW. (Komparativ + als)" },
            { german: "Der Gepard ist am schnellsten.", english: "The cheetah is the fastest. (Superlativ)" }
          ],
          tips: ["Use 'wie' (as) for equality (so schnell wie) and 'als' (than) for differences (schneller als). (Benutze 'wie' für Gleichheit und 'als' für Unterschiede.)"]
        },
        sentence_structure: {
          title: "8. Sentence Structure & Conjunctions",
          introduction: "Learn how to connect clauses using conjunctions and structure complex sentences. (Lerne, wie man Sätze mit Konjunktionen verbindet und komplexe Sätze strukturiert.)",
          rules: [
            "Hauptsatz + Hauptsatz (Position 0): und, oder, aber, denn, sondern. The verb in the second clause stays in position 2. (Hauptsatz + Hauptsatz: und, oder, aber, denn, sondern. Das Verb bleibt auf Position 2.)",
            "Hauptsatz + Nebensatz (Subjunktionen): weil, obwohl, dass, wenn, als. The conjugated verb is pushed to the VERY END of the Nebensatz! (Hauptsatz + Nebensatz: weil, obwohl, dass... Das konjugierte Verb wird ganz ans ENDE geschoben!)",
            "Relative Clauses (Relativsätze): Describe a noun using relative pronouns (der, die, das, die). They behave like a Nebensatz (verb at the end). (Relativsätze: Beschreiben ein Nomen mit Relativpronomen. Sie verhalten sich wie ein Nebensatz.)"
          ],
          examples: [
            { german: "Ich bleibe zu Hause, denn ich bin krank.", english: "I am staying home because I am sick. (denn = Position 0)" },
            { german: "Ich bleibe zu Hause, weil ich krank bin.", english: "I am staying home because I am sick. (weil = Verb am Ende)" },
            { german: "Das ist der Mann, der mir gefällt.", english: "That is the man who I like. (Relativsatz, Nominativ)" }
          ],
          tips: ["When a sentence STARTS with a Nebensatz, the Hauptsatz immediately starts with its verb! (Wenn ein Satz mit einem Nebensatz beginnt, fängt der Hauptsatz sofort mit seinem Verb an!)"]
        },
        verb_rektion: {
          title: "9. Verb Government (Rektion)",
          introduction: "Verbs dictate which case their objects must take, or which prepositions they are permanently paired with. (Verben diktieren, welchen Fall ihre Objekte haben müssen, oder mit welchen Präpositionen sie fest verbunden sind.)",
          rules: [
            "Verbs requiring Nominativ: sein, werden. (Verben, die Nominativ verlangen: sein, werden.)",
            "Verbs requiring Akkusativ (most verbs): haben, brauchen, sehen, finden, suchen. (Verben, die Akkusativ verlangen: haben, brauchen...)",
            "Verbs requiring Dativ: danken, gefallen, gehören, helfen, passen, schmecken. (Verben, die Dativ verlangen: danken, gefallen...)",
            "Verbs taking both Dativ (Person) and Akkusativ (Thing): bringen, geben, kaufen, schenken, schicken, zeigen. (Verben mit Dativ und Akkusativ: bringen, geben...)",
            "Verbs with Prepositions: warten auf (+Akk), sich interessieren für (+Akk), teilnehmen an (+Dat). (Verben mit Präpositionen: warten auf, sich interessieren für...)"
          ],
          examples: [
            { german: "Das Auto gehört meinem Bruder.", english: "The car belongs to my brother. (Dativ)" },
            { german: "Ich freue mich auf den Urlaub.", english: "I am looking forward to the vacation. (auf + Akkusativ)" }
          ],
          tips: ["When learning a new verb, ALWAYS learn its required case or preposition immediately! (Wenn du ein neues Verb lernst, lerne IMMER sofort seinen Fall oder seine Präposition mit!)"]
        },
        konjunktiv_2: {
          title: "10. Konjunktiv II",
          introduction: "Express wishes, unreal situations, and politeness using the Subjunctive II. (Drücke Wünsche, irreale Situationen und Höflichkeit mit dem Konjunktiv II aus.)",
          rules: [
            "Use 'wäre' (would be), 'hätte' (would have), or 'würde' + Infinitive (would do). (Benutze 'wäre', 'hätte' oder 'würde' + Infinitiv.)",
            "Conjugation 'wäre': ich wäre, du wärst, er/sie/es wäre, wir wären, ihr wärt, sie/Sie wären. (Konjugation 'wäre': ich wäre...)",
            "Conjugation 'hätte': ich hätte, du hättest, er/sie/es hätte, wir hätten, ihr hättet, sie/Sie hätten. (Konjugation 'hätte': ich hätte...)"
          ],
          examples: [
            { german: "Wenn ich eine Million gewinnen würde, wäre ich reich.", english: "If I won a million, I would be rich. (würde + wäre)" },
            { german: "Ich hätte gern einen Kaffee.", english: "I would like to have a coffee. (Polite request)" }
          ],
          tips: ["'Würde' + infinitive is mostly used for all verbs except 'sein' (wäre), 'haben' (hätte), and modal verbs. ('Würde' + Infinitiv wird meistens für alle Verben außer 'sein', 'haben' und Modalverben verwendet.)"]
        }
      };
      
      if (db[lessonId]) return db[lessonId];
      
      // Default elaborate structure for non-A1 or general topics
      return {
        title: `${name}`,
        introduction: `Welcome to this comprehensive guide on ${name}. In this module, we will explore the fundamental rules and concepts. (Willkommen zu diesem umfassenden Leitfaden über ${name}. In diesem Modul werden wir die grundlegenden Regeln und Konzepte untersuchen.)`,
        rules: ["Rule 1: Always ensure subject-verb agreement. (Regel 1: Achte immer auf die Übereinstimmung von Subjekt und Verb.)", "Rule 2: Practice consistently. (Regel 2: Übe beständig.)"],
        examples: [{ german: "Ich lerne jeden Tag.", english: "I learn every day." }],
        tips: ["Don't translate word for word. (Übersetze nicht Wort für Wort.)"]
      };
    };

    const fetchLessonContent = async () => {
      if (!lesson) return;
      setLoading(true);
      
      // Always use the elaborate hardcoded data if it's an A1 specific topic we defined, 
      // or if the API key isn't set. This ensures a rich experience for A1 immediately.
      if (API_KEY === "YOUR_GEMINI_API_KEY" || lesson.levelId === 'A1' || lesson.levelId === 'A2') {
        setTimeout(() => {
          if (isMounted) {
            setContent(getElaborateContent(lesson.id, lesson.name));
            setLoading(false);
          }
        }, 1000);
        return;
      }

      try {
        const schema = {
          type: "OBJECT",
          properties: {
            title: { type: "STRING" },
            introduction: { type: "STRING" },
            rules: { type: "ARRAY", items: { type: "STRING" } },
            examples: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: { german: { type: "STRING" }, english: { type: "STRING" } }
              }
            },
            tips: { type: "ARRAY", items: { type: "STRING" } }
          }
        };

        const prompt = `Act as an expert German teacher. Write a highly detailed, easy-to-understand lesson about "${lesson.name}" (German: ${lesson.deName}) for CEFR level ${lesson.levelId}. IMPORTANT RULE: For EVERY English sentence, phrase, or explanation you provide in the 'introduction', 'rules', or 'tips', you MUST include the German translation immediately after it in parentheses. For example: "The nominative case is used for the subject of a sentence. (Der Nominativ wird für das Subjekt eines Satzes verwendet.)"`;
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
        const payload = {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json", responseSchema: schema }
        };
        
        const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        const data = await response.json();
        const jsonText = data.candidates[0].content.parts[0].text;
        
        if (isMounted) {
          setContent(JSON.parse(jsonText));
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to generate lesson:", err);
        if (isMounted) {
          setContent({
            title: "Content Unavailable",
            introduction: "Sorry, we couldn't load the lesson content at this time. Please check your connection or try again.",
            rules: [], examples: [], tips: []
          });
          setLoading(false);
        }
      }
    };
    
    fetchLessonContent();
    return () => { isMounted = false; };
  }, [lesson]);

  const formatDual = (text) => {
    if (typeof text !== 'string') return text;
    // Matches text ending with a parenthesis block, e.g. "English text. (German text.)"
    const match = text.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
    if (match) {
      return <DualText eng={match[1]} ger={match[2]} gerClass="block text-[0.9em] text-indigo-300/80 font-medium italic mt-1" />;
    }
    return text;
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 md:p-10 relative animate-in zoom-in-95 duration-300 shadow-2xl shadow-indigo-900/20">
      <button onClick={onClose} className="absolute top-6 right-6 text-slate-500 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-full p-2 transition-all">
        <XCircle className="w-7 h-7" />
      </button>

      {loading || !content ? (
        <div className="py-20 flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-6"></div>
          <p className="text-xl font-medium text-slate-300">
            <DualText eng="Generating your personalized lesson..." ger="Erstelle deine personalisierte Lektion..." align="center" />
          </p>
        </div>
      ) : (
        <div className="space-y-10">
          <div>
            <span className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-400 font-bold uppercase tracking-wider text-xs rounded-full mb-4">
              <DualText eng={`Level ${lesson.levelId} Lesson`} ger={`Niveau ${lesson.levelId} Lektion`} />
            </span>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              <DualText eng={content.title} ger={lesson.deName} />
            </h3>
            <p className="text-lg text-slate-300 leading-relaxed">{formatDual(content.introduction)}</p>
          </div>

          {content.rules && content.rules.length > 0 && (
            <div className="bg-slate-950 p-6 md:p-8 rounded-3xl border border-slate-800">
              <h4 className="text-xl font-bold text-white mb-6 flex items-center">
                <BookOpen className="w-6 h-6 mr-3 text-indigo-400" /> 
                <DualText eng="Core Grammar Rules" ger="Kern-Grammatikregeln" />
              </h4>
              <ul className="space-y-4 text-slate-300">
                {content.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="w-6 h-6 mt-0.5 mr-4 bg-indigo-900 text-indigo-300 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{idx + 1}</div>
                    <span className="leading-relaxed text-lg">{formatDual(rule)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {content.examples && content.examples.length > 0 && (
            <div>
              <h4 className="text-xl font-bold text-white mb-6 flex items-center">
                <Volume2 className="w-6 h-6 mr-3 text-teal-400" /> 
                <DualText eng="Practical Examples" ger="Praktische Beispiele" />
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.examples.map((ex, idx) => (
                  <div key={idx} className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50 hover:bg-slate-800 transition-colors">
                    <p className="text-white font-bold text-xl mb-2">{ex.german}</p>
                    <p className="text-teal-300/80 font-medium">{ex.english}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {content.tips && content.tips.length > 0 && (
            <div className="bg-amber-900/10 p-6 md:p-8 rounded-3xl border border-amber-500/20">
              <h4 className="text-xl font-bold text-amber-400 mb-5 flex items-center">
                <Star className="w-6 h-6 mr-3" /> 
                <DualText eng="Pro Tips" ger="Profi-Tipps" />
              </h4>
              <ul className="space-y-3 text-amber-100/70">
                {content.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="mr-3 text-amber-400">⚡</span>
                    <span className="text-lg">{formatDual(tip)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="pt-8 flex justify-end">
            <button onClick={onClose} className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-600/30 scale-100 hover:scale-105">
              <DualText eng="I've got it! Back to Topics" ger="Ich hab's! Zurück zu den Themen" align="center" gerClass="block text-xs text-indigo-200 mt-1 font-normal italic" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// --- DASHBOARD COMPONENT ---
function Dashboard({ userData, onSelectLevel }) {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight flex justify-center">
          <DualText eng="Practice Arena" ger="Übungsarena" align="center" gerClass="block text-2xl text-indigo-400 mt-2" />
        </h2>
        <p className="text-slate-400 text-xl max-w-2xl mx-auto flex justify-center">
          <DualText 
            eng="Select an unlocked difficulty level to begin your training. Earn XP to unlock higher mastery levels." 
            ger="Wählen Sie einen freigeschalteten Schwierigkeitsgrad, um Ihr Training zu beginnen. Verdienen Sie XP, um höhere Stufen freizuschalten." 
            align="center" 
          />
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {LEVELS.map((level) => {
          const isUnlocked = userData.unlockedLevels.includes(level.id);
          const progress = Math.min(100, Math.max(0, (userData.xp / level.xpRequired) * 100)) || (isUnlocked ? 100 : 0);

          return (
            <div 
              key={level.id}
              onClick={() => isUnlocked && onSelectLevel(level)}
              className={`relative overflow-hidden rounded-3xl p-8 border-2 transition-all duration-300 flex flex-col h-full ${
                isUnlocked 
                  ? `border-slate-700 bg-slate-900 cursor-pointer hover:-translate-y-2 hover:border-${level.color.split('-')[1]}-500 shadow-xl hover:shadow-${level.color.split('-')[1]}-500/20` 
                  : 'border-slate-800 bg-slate-950/50'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black ${isUnlocked ? `${level.color} text-white` : 'bg-slate-800 text-slate-500'}`}>
                  {level.id}
                </div>
              </div>

              <h3 className={`text-2xl font-bold mb-2 ${isUnlocked ? 'text-white' : 'text-slate-500'}`}>
                <DualText eng={level.name} ger={level.deName} gerClass={`block text-sm mt-0.5 ${isUnlocked ? 'text-indigo-300/80' : 'text-slate-600'} font-medium italic`} />
              </h3>
              
              <div className="mt-auto pt-8 w-full">
                <div className="flex justify-between text-sm mb-2 font-medium">
                  <span className="text-slate-400"><DualText eng="Requirements" ger="Anforderungen" /></span>
                  <span className={isUnlocked ? 'text-indigo-400 text-right' : 'text-slate-500 text-right'}>
                    {isUnlocked ? <DualText eng="Unlocked" ger="Freigeschaltet" align="right" /> : <DualText eng={`${level.xpRequired} XP`} ger="benötigt" align="right" />}
                  </span>
                </div>
                {!isUnlocked ? (
                  <div className="w-full flex justify-center p-3 bg-slate-800/50 rounded-xl mt-4">
                    <Lock className="w-5 h-5 text-slate-500" />
                  </div>
                ) : (
                  <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden mt-4">
                    <div className={`h-full rounded-full ${level.color} transition-all duration-1000`} style={{ width: `${progress}%` }}></div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- LEVEL VIEW COMPONENT ---
function LevelView({ level, userData, onSelectModule, onBack }) {
  return (
    <div className="animate-in slide-in-from-right-8 duration-500 max-w-5xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors group">
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> 
        <DualText eng="Back to Arena" ger="Zurück zur Arena" />
      </button>

      <div className="flex items-center gap-6 mb-12">
        <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-4xl font-black ${level.color} text-white shadow-lg ${level.shadow}`}>
          {level.id}
        </div>
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            <DualText eng={`${level.name} Training`} ger={`${level.deName} Training`} gerClass="block text-2xl text-indigo-400 mt-2" />
          </h2>
          <p className="text-xl text-slate-400 mt-2">
            <DualText eng="Select a module to test your skills." ger="Wählen Sie ein Modul, um Ihre Fähigkeiten zu testen." />
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MODULES.map(mod => {
          const isCompleted = userData.completed[`${level.id}-${mod.id}`];
          const ModIcon = mod.icon;
          return (
            <div 
              key={mod.id}
              onClick={() => onSelectModule(mod)}
              className="group bg-slate-900 border border-slate-800 p-6 rounded-3xl cursor-pointer hover:border-slate-600 hover:bg-slate-800 transition-all shadow-lg hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl ${mod.color} bg-opacity-20 text-${mod.color.split('-')[1]}-400 group-hover:scale-110 transition-transform`}>
                  <ModIcon className="w-8 h-8" />
                </div>
                {isCompleted && (
                  <div className="w-8 h-8 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5" />
                  </div>
                )}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                <DualText eng={mod.name} ger={mod.deName} />
              </h3>
              <p className="text-slate-400 font-medium">
                <DualText eng={`Earn ${mod.xp} XP`} ger={`Verdiene ${mod.xp} XP`} />
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- MODULES ---

function FlashcardModule({ level, onComplete }) {
  const [cards, setCards] = useState([]);
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Generate cards logic based on level
    const generate = async () => {
      setLoading(true);
      // In a real app, you would hit the Gemini API here to get dynamic vocabulary.
      // We will simulate it for stability and immediate testing.
      setTimeout(() => {
        const mockCards = [
          { german: "das Haus", english: "the house", example: "Das Haus ist groß." },
          { german: "der Hund", english: "the dog", example: "Der Hund bellt laut." },
          { german: "schnell", english: "fast", example: "Das Auto fährt schnell." },
          { german: "verstehen", english: "to understand", example: "Ich verstehe dich nicht." },
          { german: "immer", english: "always", example: "Er kommt immer zu spät." }
        ];
        setCards(mockCards);
        setLoading(false);
      }, 1000);
    };
    generate();
  }, [level]);

  const nextCard = () => {
    if (current < cards.length - 1) {
      setFlipped(false);
      setTimeout(() => setCurrent(current + 1), 150); // slight delay for flip animation
    } else {
      onComplete(); // Award XP if finished
    }
  };

  if (loading) return (
    <div className="p-20 flex justify-center text-xl text-slate-400 animate-pulse">
      <DualText eng="Generating your custom vocabulary deck..." ger="Erstelle dein benutzerdefiniertes Vokabeldeck..." align="center" />
    </div>
  );

  const progress = ((current) / cards.length) * 100;

  return (
    <div className="max-w-2xl mx-auto w-full">
      <div className="mb-8 flex items-center justify-between">
         <span className="font-bold text-slate-400">
           <DualText eng={`Card ${current + 1} of ${cards.length}`} ger={`Karte ${current + 1} von ${cards.length}`} />
         </span>
         <div className="w-1/2 bg-slate-800 rounded-full h-2">
            <div className="bg-orange-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
         </div>
      </div>

      <div 
        className={`w-full aspect-video bg-slate-800 rounded-3xl cursor-pointer perspective-1000 mb-8 border border-slate-700 shadow-xl`}
        onClick={() => setFlipped(!flipped)}
      >
        <div className={`relative w-full h-full transition-transform duration-500 preserve-3d ${flipped ? 'rotate-y-180' : ''}`}>
          
          {/* Front */}
          <div className="absolute w-full h-full backface-hidden flex flex-col items-center justify-center p-8 bg-slate-800 rounded-3xl">
            <span className="text-orange-400 font-bold mb-4 uppercase tracking-widest text-sm">German</span>
            <h3 className="text-5xl md:text-6xl font-black text-white text-center">{cards[current].german}</h3>
            <p className="text-slate-500 mt-6 text-sm font-medium">
              <DualText eng="Click to flip" ger="Klicken zum Umdrehen" align="center" />
            </p>
          </div>

          {/* Back */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 flex flex-col items-center justify-center p-8 bg-orange-600 rounded-3xl">
            <span className="text-orange-200 font-bold mb-4 uppercase tracking-widest text-sm">English</span>
            <h3 className="text-5xl md:text-6xl font-black text-white text-center mb-6">{cards[current].english}</h3>
            <div className="px-6 py-3 bg-black/20 rounded-xl text-center">
              <p className="text-white text-lg font-medium italic">"{cards[current].example}"</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button 
          onClick={nextCard}
          className="px-8 py-4 bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/20 transition-all scale-100 hover:scale-105"
        >
          {current === cards.length - 1 
            ? <DualText eng="Finish & Claim XP" ger="Abschließen & XP sammeln" align="center" gerClass="block text-xs text-orange-200 mt-1 font-normal italic" /> 
            : <DualText eng="Next Card" ger="Nächste Karte" align="center" gerClass="block text-xs text-orange-200 mt-1 font-normal italic" />}
        </button>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
}

function ReadingModule({ level, onComplete }) {
  const [step, setStep] = useState('read'); // 'read', 'quiz', 'done'
  
  // Dummy data for example
  const story = {
    title: "Ein Wochenende in Berlin",
    text: "Letztes Wochenende bin ich nach Berlin gefahren. Die Stadt ist sehr groß und es gibt viele Menschen. Am Samstag habe ich das Brandenburger Tor besucht. Das Wetter war sehr schön, die Sonne hat geschienen. Am Abend habe ich Currywurst gegessen, das ist typisch für Berlin. Am Sonntag bin ich im Park spazieren gegangen. Es war ein tolles Wochenende und ich möchte bald wieder dorthin.",
    questions: [
      { q: "Wo war die Person am Wochenende?", options: ["In München", "In Berlin", "Zu Hause"], a: 1 },
      { q: "Wie war das Wetter?", options: ["Es hat geregnet", "Es war kalt", "Die Sonne hat geschienen"], a: 2 },
      { q: "Was hat die Person am Abend gegessen?", options: ["Pizza", "Currywurst", "Salat"], a: 1 }
    ]
  };

  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);

  const handleQuiz = () => {
    let correct = 0;
    answers.forEach((ans, i) => { if(ans === story.questions[i].a) correct++; });
    setScore(correct);
    setStep('done');
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      {step === 'read' && (
        <div className="bg-slate-900 p-8 md:p-12 rounded-3xl border border-slate-800 shadow-xl">
          <h3 className="text-3xl font-bold mb-6 text-white">{story.title}</h3>
          <p className="text-xl text-slate-300 leading-loose mb-10">{story.text}</p>
          <button onClick={() => setStep('quiz')} className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 rounded-2xl font-bold text-lg transition-colors">
            <DualText eng="I'm ready for the Quiz" ger="Ich bin bereit für das Quiz" align="center" gerClass="block text-sm text-emerald-200 mt-1 font-normal italic" />
          </button>
        </div>
      )}

      {step === 'quiz' && (
        <div className="space-y-8">
          {story.questions.map((q, i) => (
            <div key={i} className="bg-slate-900 p-8 rounded-3xl border border-slate-800">
              <p className="text-xl font-bold mb-6 text-white">{i+1}. {q.q}</p>
              <div className="space-y-3">
                {q.options.map((opt, j) => (
                  <button 
                    key={j} 
                    onClick={() => { const newA = [...answers]; newA[i] = j; setAnswers(newA); }}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${answers[i] === j ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold' : 'border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button onClick={handleQuiz} disabled={answers.length !== story.questions.length} className="w-full py-4 bg-emerald-600 disabled:opacity-50 rounded-2xl font-bold text-lg">
            <DualText eng="Submit Answers" ger="Antworten einreichen" align="center" gerClass="block text-sm text-emerald-200 mt-1 font-normal italic" />
          </button>
        </div>
      )}

      {step === 'done' && (
        <div className="text-center py-20 bg-slate-900 rounded-3xl border border-emerald-500/30">
          <div className="text-7xl mb-6">{score === story.questions.length ? '🎉' : '👍'}</div>
          <h3 className="text-4xl font-bold mb-4 flex justify-center">
            <DualText eng={`You scored ${score} / ${story.questions.length}`} ger={`Du hast ${score} / ${story.questions.length} Punkte erzielt`} align="center" gerClass="block text-2xl text-emerald-400 mt-2 font-medium italic" />
          </h3>
          <button onClick={onComplete} className="mt-8 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-2xl">
            <DualText eng="Claim XP" ger="XP sammeln" align="center" gerClass="block text-xs text-emerald-200 mt-1 font-normal italic" />
          </button>
        </div>
      )}
    </div>
  );
}

function WritingModule({ level, onComplete }) {
  const [text, setText] = useState("");
  const [evaluating, setEvaluating] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const prompt = level.id === 'A1' ? "Schreibe 3 Sätze über dich selbst (Name, Alter, Hobbys)." : "Describe your favorite vacation in German (at least 50 words).";

  const submitText = () => {
    setEvaluating(true);
    // Simulate AI grading
    setTimeout(() => {
      setFeedback({
        score: 85,
        corrections: "Overall good! Pay attention to the verb position in subordinate clauses.",
        correctedText: text + " (Corrected version here)"
      });
      setEvaluating(false);
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      {!feedback ? (
        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800">
          <div className="bg-blue-500/10 border border-blue-500/30 p-6 rounded-2xl mb-8">
            <h4 className="text-blue-400 font-bold mb-2">
              <DualText eng="Writing Prompt" ger="Schreibimpuls" />
            </h4>
            <p className="text-xl text-white">{prompt}</p>
          </div>
          <textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-48 bg-slate-950 border border-slate-700 rounded-2xl p-6 text-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
            placeholder="Write your answer here... (Schreibe deine Antwort hier...)"
          ></textarea>
          <button 
            onClick={submitText} 
            disabled={text.length < 10 || evaluating}
            className="w-full mt-6 py-4 bg-blue-600 disabled:opacity-50 hover:bg-blue-500 rounded-2xl font-bold text-lg flex items-center justify-center transition-colors"
          >
            {evaluating ? (
              <span className="animate-pulse"><DualText eng="Evaluating with AI..." ger="Bewertung durch KI..." align="center" gerClass="block text-sm text-blue-200 mt-1 font-normal italic" /></span>
            ) : (
              <DualText eng="Submit for Grading" ger="Zur Bewertung einreichen" align="center" gerClass="block text-sm text-blue-200 mt-1 font-normal italic" />
            )}
          </button>
        </div>
      ) : (
        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 text-center">
          <div className="w-32 h-32 mx-auto rounded-full border-8 border-blue-500 flex items-center justify-center text-4xl font-black text-white mb-6">
            {feedback.score}
          </div>
          <p className="text-xl text-slate-300 mb-8">{feedback.corrections}</p>
          <button onClick={onComplete} className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold">
            <DualText eng="Claim XP" ger="XP sammeln" align="center" gerClass="block text-xs text-blue-200 mt-1 font-normal italic" />
          </button>
        </div>
      )}
    </div>
  );
}

function ListeningModule({ level, onComplete }) {
  const [playing, setPlaying] = useState(false);
  const [answer, setAnswer] = useState("");
  const targetText = "Die Katze schläft auf dem Sofa";
  
  const playAudio = () => {
    if ('speechSynthesis' in window) {
      setPlaying(true);
      const utterance = new SpeechSynthesisUtterance(targetText);
      utterance.lang = 'de-DE';
      utterance.rate = 0.8; // Speak slightly slower for learners
      utterance.onend = () => setPlaying(false);
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full text-center">
      <div className="bg-slate-900 p-12 rounded-3xl border border-slate-800">
        <button 
          onClick={playAudio} 
          disabled={playing}
          className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-10 transition-all ${playing ? 'bg-purple-500/20 text-purple-400 scale-110' : 'bg-purple-600 hover:bg-purple-500 text-white shadow-xl shadow-purple-600/30'}`}
        >
          {playing ? <Volume2 className="w-12 h-12 animate-pulse" /> : <Play className="w-12 h-12 ml-2" />}
        </button>
        
        <p className="text-slate-400 mb-4 font-medium flex justify-center">
          <DualText eng="Type what you hear in German:" ger="Tippe, was du auf Deutsch hörst:" align="center" />
        </p>
        <input 
          type="text" 
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full bg-slate-950 border-2 border-slate-700 rounded-2xl px-6 py-4 text-xl text-center text-white focus:outline-none focus:border-purple-500 transition-colors mb-8"
          placeholder="Transcription... (Transkription...)"
        />
        
        <button 
          onClick={onComplete} 
          className="w-full py-4 bg-purple-600 hover:bg-purple-500 rounded-2xl font-bold text-lg"
        >
          <DualText eng="Check Answer" ger="Antwort prüfen" align="center" gerClass="block text-sm text-purple-200 mt-1 font-normal italic" />
        </button>
      </div>
    </div>
  );
}

function SpeakingModule({ level, onComplete }) {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [aiResponse, setAiResponse] = useState(null);

  const toggleRecord = () => {
    if (recording) {
      setRecording(false);
      // Simulate processing audio
      setTimeout(() => {
        setTranscript("Hallo, wie geht es dir?");
        setTimeout(() => {
          setAiResponse({ text: "Hallo! Mir geht es gut, danke. Und dir?", translation: "Hello! I am doing well, thank you. And you?" });
        }, 1000);
      }, 1000);
    } else {
      setRecording(true);
      setTranscript("");
      setAiResponse(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full flex flex-col items-center">
      
      <div className="w-full bg-slate-900 rounded-3xl p-8 mb-8 border border-slate-800 min-h-[200px] flex flex-col">
        {transcript && (
          <div className="self-end bg-rose-600/20 text-rose-100 p-4 rounded-2xl rounded-tr-sm max-w-[80%] mb-4 border border-rose-500/20">
            {transcript}
          </div>
        )}
        {aiResponse && (
          <div className="self-start bg-slate-800 text-slate-200 p-4 rounded-2xl rounded-tl-sm max-w-[80%] animate-in fade-in slide-in-from-bottom-2">
            <p className="font-bold text-lg mb-1">{aiResponse.text}</p>
            <p className="text-slate-400 text-sm">{aiResponse.translation}</p>
          </div>
        )}
        {!transcript && !recording && (
           <div className="m-auto text-slate-500 text-center flex flex-col items-center">
             <Mic className="w-10 h-10 mx-auto mb-4 opacity-30" />
             <DualText eng="Press the microphone and introduce yourself in German." ger="Drücke auf das Mikrofon und stelle dich auf Deutsch vor." align="center" />
           </div>
        )}
      </div>

      <button 
        onClick={toggleRecord}
        className={`w-24 h-24 rounded-full flex items-center justify-center transition-all mb-8 ${recording ? 'bg-rose-500 scale-110 shadow-lg shadow-rose-500/50 animate-pulse' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}
      >
        <Mic className={`w-10 h-10 ${recording ? 'text-white' : 'text-slate-400'}`} />
      </button>

      {aiResponse && (
        <button onClick={onComplete} className="px-8 py-4 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-2xl transition-colors">
          <DualText eng="End Conversation & Claim XP" ger="Gespräch beenden & XP sammeln" align="center" gerClass="block text-xs text-rose-200 mt-1 font-normal italic" />
        </button>
      )}
    </div>
  );
}

// Sub-components helpers
const Play = (p) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={p.className} {...p}><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>;
const Check = (p) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={p.className} {...p}><polyline points="20 6 9 17 4 12"></polyline></svg>;