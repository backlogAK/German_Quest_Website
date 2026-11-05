// src/Auth.tsx
import { useState } from 'react';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] w-full max-w-md mx-auto p-8 bg-slate-900 border border-indigo-500/30 rounded-3xl mt-12">
      <h2 className="text-2xl font-black text-white mb-6 text-center">
        {isLogin ? 'Welcome Back' : 'Create Account'}
      </h2>
      
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 outline-none rounded-2xl p-4 text-sm text-white"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 outline-none rounded-2xl p-4 text-sm text-white"
          required
        />
        
        {error && <p className="text-rose-500 text-xs font-bold text-center">{error}</p>}
        
        <button 
          type="submit" 
          disabled={loading}
          className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-500 transition-all rounded-2xl text-sm font-bold text-white mt-2 disabled:opacity-50"
        >
          {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
        </button>
      </form>

      <button 
        onClick={() => setIsLogin(!isLogin)} 
        className="mt-6 text-xs text-indigo-300 hover:text-indigo-200 transition-colors"
      >
        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
      </button>
    </div>
  );
}