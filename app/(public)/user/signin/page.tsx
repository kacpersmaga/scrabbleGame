'use client';
import { useState, Suspense } from 'react';
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";
import { auth } from '@/app/lib/firebase';
import { useSearchParams, useRouter } from "next/navigation";
import Link from 'next/link';

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState(''); 
  
  const returnUrl = searchParams.get("returnUrl");
  
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
    const password = (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value;

    setPersistence(auth, browserSessionPersistence)
    .then(() => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            if (returnUrl) {
                router.push(returnUrl);
            } else {
                router.push('/');
            }
        })
        .catch((error) => {
            const errorMessage = error.message;
            setError("Błąd logowania: Sprawdź email i hasło.");
            console.error(errorMessage);
        });
    })
    .catch(error => {
      console.log(error);
    });
  };

  return (
    <section className="text-gray-600 body-font relative min-h-[70vh] flex items-center bg-gray-50">
      <div className="container px-5 py-24 mx-auto flex justify-center">
        <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0 relative z-10 shadow-lg border border-gray-200">
          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Zaloguj się</h2>
          <p className="leading-relaxed mb-5 text-gray-600">Wprowadź swoje dane, aby kontynuować.</p>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form onSubmit={onSubmit}>
              <div className="relative mb-4">
                <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
              </div>
              <div className="relative mb-4">
                <label htmlFor="password" className="leading-7 text-sm text-gray-600">Hasło</label>
                <input type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
              </div>
              <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg w-full">Zaloguj się</button>
          </form>
          <p className="text-xs text-gray-500 mt-3 text-center">Nie masz konta? <Link href="/user/register" className="text-indigo-500">Zarejestruj się</Link></p>
        </div>
      </div>
    </section>
  );
}

export default function SignInPage() {
    return (
        <Suspense fallback={<div>Ładowanie...</div>}>
            <SignInForm />
        </Suspense>
    )
}