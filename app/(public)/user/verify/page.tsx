'use client';
import { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/app/lib/firebase';
import Link from 'next/link';

export default function VerifyEmail() {
    
  useEffect(() => {
    signOut(auth);
  }, []);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-8 rounded-r-lg max-w-2xl shadow-sm">
            <h1 className="text-2xl font-bold text-yellow-800 mb-4">Weryfikacja Email</h1>
            <p className="text-yellow-700 mb-6">
                Link weryfikacyjny został wysłany na Twój adres email. 
                Proszę kliknij w link w wiadomości, aby aktywować konto.
            </p>
            <Link href="/user/signin" className="btn-primary bg-yellow-600 hover:bg-yellow-700 border-none">
                Wróć do logowania
            </Link>
        </div>
    </div>
  );
}