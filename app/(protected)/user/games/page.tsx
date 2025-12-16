'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/app/lib/AuthContext';
import { db } from '@/app/lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import Link from 'next/link';

interface GameSave {
  id: string;
  createdAt: any;
  score: number;
  status: string;
}

export default function MyGamesPage() {
  const { user } = useAuth();
  const [games, setGames] = useState<GameSave[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      if (!user) return;

      try {
        const q = query(
          collection(db, "games"),
          where("userId", "==", user.uid)
        );

        const querySnapshot = await getDocs(q);
        const gamesList: GameSave[] = [];
        
        querySnapshot.forEach((doc) => {
          gamesList.push({ 
            id: doc.id, 
            ...doc.data() 
          } as GameSave);
        });

        setGames(gamesList);
      } catch (error) {
        console.error("Błąd pobierania gier:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Moje Rozgrywki</h1>
        <Link href="/dashboard" className="btn-primary text-sm">Nowa Gra</Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Ładowanie historii...</div>
        ) : games.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="text-6xl mb-4">🎲</div>
            <h3 className="text-xl font-semibold text-gray-800">Brak zapisanych gier</h3>
            <p className="text-gray-500 mt-2 mb-6">Zagraj swoją pierwszą partię i zapisz wynik!</p>
            <Link href="/dashboard" className="text-indigo-600 hover:text-indigo-800 font-medium">
              Przejdź do gry &rarr;
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Data</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Wynik</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">ID Zapisu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {games.map((game) => (
                  <tr key={game.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {game.createdAt?.seconds 
                        ? new Date(game.createdAt.seconds * 1000).toLocaleDateString('pl-PL') + ' ' + new Date(game.createdAt.seconds * 1000).toLocaleTimeString('pl-PL')
                        : 'Teraz'}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-indigo-600">
                      {game.score} pkt
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {game.status || 'Zapisano'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400 font-mono">
                      {game.id}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}