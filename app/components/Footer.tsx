import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="text-gray-600 body-font bg-white border-t border-gray-100 mt-auto">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <Link href="/" className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          <span className="bg-indigo-600 text-white w-8 h-8 flex items-center justify-center rounded-lg font-bold">S</span>
          <span className="ml-3 text-xl">ScrabbleApp</span>
        </Link>
        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          © 2025 Kacper Smaga — Projekt Zaliczeniowy
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
           <Link href="/about" className="text-gray-600 hover:text-indigo-600 ml-1">
             O Projekcie
           </Link>
        </span>
      </div>
    </footer>
  );
}