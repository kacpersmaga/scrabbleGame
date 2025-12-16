import React from 'react';

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-10 border border-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-indigo-100 pb-4 mb-6">
        O Projekcie
      </h1>
      
      <div className="space-y-4 text-gray-700 leading-relaxed">
        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
            <p className="text-lg"><strong>Autor:</strong> Kacper Smaga</p>
            <p><strong>Nr albumu:</strong> 14997</p>
            <p><strong>Temat:</strong> Scrabble</p>
        </div>

        <h3 className="text-xl font-semibold mt-6 text-gray-800">Zrealizowane funkcjonalności:</h3>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>✅ Uwierzytelnianie (Firebase Auth: Email/Hasło + Google)</li>
          <li>✅ Autoryzacja (Guard chroniący dostęp do gry)</li>
          <li>✅ Pełna responsywność (Tailwind CSS - Mobile/Desktop)</li>
          <li>✅ Zapis stanu gry do chmury (Firebase Firestore)</li>
          <li>✅ Testy E2E (Playwright)</li>
        </ul>
      </div>
    </div>
  );
}