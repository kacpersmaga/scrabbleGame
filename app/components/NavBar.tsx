'use client';
import Link from 'next/link';
import { useAuth } from '@/app/lib/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/app/lib/firebase';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
    <header className="text-gray-600 body-font bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        {/* LOGO */}
        <Link href="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <span className="bg-indigo-600 text-white w-10 h-10 flex items-center justify-center rounded-lg text-xl font-bold shadow-md">S</span>
          <span className="ml-3 text-xl font-bold">ScrabbleApp</span>
        </Link>
        
        {/* LINKI */}
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link href="/about" className="mr-5 hover:text-indigo-600 transition-colors">O Projekcie</Link>
          {user && (
            <>
              <Link href="/dashboard" className="mr-5 hover:text-indigo-600 font-semibold text-gray-800">Gra (Pulpit)</Link>
              <Link href="/user/games" className="mr-5 hover:text-indigo-600 transition-colors">Historia Gier</Link>
              <Link href="/user/profile" className="mr-5 hover:text-indigo-600 transition-colors">Twój Profil</Link>
            </>
          )}
        </nav>
        
        {/* PRZYCISKI AKCJI / PROFIL */}
        {user ? (
           <div className="flex items-center gap-3 mt-4 md:mt-0">
             
             <div className="flex items-center gap-2">
                {user.photoURL ? (
                    <img 
                        src={user.photoURL} 
                        alt="Profil" 
                        className="w-10 h-10 rounded-full border border-gray-300 object-cover shadow-sm"
                    />
                ) : (
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
                        {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                    </div>
                )}
                <span className="text-sm text-gray-500 hidden lg:block font-medium">
                    {user.displayName || user.email}
                </span>
             </div>
             {/* ------------------------------------------------------------------ */}

             <button 
               onClick={handleLogout}
               className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base transition-colors ml-2"
             >
               Wyloguj
               <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                 <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
               </svg>
             </button>
           </div>
        ) : (
          <div className="flex gap-2 mt-4 md:mt-0">
            <Link href="/user/signin" className="inline-flex items-center bg-gray-50 border-0 py-1 px-3 focus:outline-none hover:bg-gray-100 rounded text-base text-gray-700 transition-colors">
              Logowanie
            </Link>
            <Link href="/user/register" className="inline-flex items-center bg-indigo-600 text-white border-0 py-1 px-3 focus:outline-none hover:bg-indigo-700 rounded text-base shadow-md transition-transform active:scale-95">
              Rejestracja
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}