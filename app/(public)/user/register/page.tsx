'use client';
import { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { auth } from '@/app/lib/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState(''); 
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      if (displayName) {
          await updateProfile(userCredential.user, {
              displayName: displayName
          });
      }

      await sendEmailVerification(userCredential.user);

      router.push('/user/verify'); 
      
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError('Ten email jest już zajęty.');
      } else if (err.code === 'auth/weak-password') {
        setError('Hasło jest za słabe (min. 6 znaków).');
      } else {
        setError(err.message);
      }
    } finally {
        setLoading(false);
    }
  };

  return (
    <section className="text-gray-600 body-font relative min-h-[80vh] flex items-center bg-gray-50">
      <div className="container px-5 py-24 mx-auto flex justify-center">
        
        <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0 relative z-10 shadow-lg border border-gray-200">
          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Rejestracja</h2>
          <p className="leading-relaxed mb-5 text-gray-600">
            Załóż konto, aby grać w Scrabble i zapisywać wyniki.
          </p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="relative mb-4">
                <label htmlFor="displayName" className="leading-7 text-sm text-gray-600">Nazwa użytkownika (Nick)</label>
                <input 
                    type="text" 
                    id="displayName" 
                    name="displayName" 
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
            </div>

            <div className="relative mb-4">
                <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
            </div>

            <div className="relative mb-4">
                <label htmlFor="password" className="leading-7 text-sm text-gray-600">Hasło</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
            </div>

            <button 
                disabled={loading} 
                className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg w-full transition-colors disabled:opacity-50"
            >
              {loading ? 'Rejestrowanie...' : 'Zarejestruj się'}
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-3 w-full text-center">
            Masz już konto? <Link href="/user/signin" className="text-indigo-500 hover:text-indigo-600">Zaloguj się</Link>
          </p>
        </div>
      </div>
    </section>
  );
}