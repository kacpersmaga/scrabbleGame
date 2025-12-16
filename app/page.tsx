'use client';
import Link from "next/link";
import { useAuth } from "@/app/lib/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        
        {/* LEWA KOLUMNA - TEKST */}
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Scrabble Online
            <br className="hidden lg:inline-block" />Trenuj swój umysł.
          </h1>
          <p className="mb-8 leading-relaxed">
            Klasyczna gra słowna w nowoczesnym wydaniu. Rywalizuj sam ze sobą lub znajomymi, układaj słowa na planszy 15x15 i pnij się w rankingu. 
            Twoje postępy są zapisywane w chmurze, więc możesz wrócić do gry w każdej chwili.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
                href="/user/register"
                className="inline-flex text-white bg-indigo-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-700 rounded text-lg shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Zacznij Grać
            </Link>
            <Link 
                href="/user/signin"
                className="inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg transition-colors"
            >
              Mam już konto
            </Link>
          </div>
        </div>

        {/* PRAWA KOLUMNA - WIZUALIZACJA (KLOCKI) */}
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
           <div className="object-cover object-center rounded-xl bg-indigo-50 p-8 flex flex-wrap justify-center content-center gap-3 shadow-inner min-h-[300px]">
              {['S', 'C', 'R', 'A', 'B', 'B', 'L', 'E'].map((letter, index) => (
                <div key={index} className="w-14 h-14 bg-amber-100 text-gray-800 border-2 border-amber-200 rounded-lg flex items-center justify-center text-2xl font-bold shadow-md transform hover:scale-110 transition-transform cursor-default select-none">
                  {letter}
                  <span className="text-[10px] self-end mb-1 ml-0.5 text-gray-500 font-normal">
                    {[1,3,1,1,3,3,2,1][index]}
                  </span>
                </div>
              ))}
           </div>
           <p className="text-center text-xs text-gray-400 mt-2">Projekt zaliczeniowy: Laboratorium 6-11</p>
        </div>

      </div>
    </section>
  );
}