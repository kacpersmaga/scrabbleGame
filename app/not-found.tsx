import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="text-gray-600 body-font h-[60vh] flex items-center justify-center">
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <div className="text-center lg:w-2/3 w-full">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            404 - Strony nie znaleziono
          </h1>
          <p className="mb-8 leading-relaxed">
            Wygląda na to, że zabłądziłeś. Strona, której szukasz, nie istnieje lub została przeniesiona.
          </p>
          <div className="flex justify-center">
            <Link href="/" className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Wróć do domu
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}