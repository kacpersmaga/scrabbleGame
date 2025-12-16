'use client';


import { useState } from 'react';
import ScrabbleBoard, { Tile, Player } from '@/app/components/ScrabbleBoard';
import { useAuth } from '@/app/lib/AuthContext';
import { db } from '@/app/lib/firebase';
import { doc, setDoc, serverTimestamp, collection, addDoc } from 'firebase/firestore';


export default function GamePage() {
  const { user } = useAuth();
  
  const [fixedTiles] = useState<Tile[]>([
    { x: 7, y: 7, letter: 'H', playerId: 1 },
    { x: 8, y: 7, letter: 'E', playerId: 1 },
    { x: 9, y: 7, letter: 'L', playerId: 1 },
    { x: 10, y: 7, letter: 'L', playerId: 1 },
    { x: 11, y: 7, letter: 'O', playerId: 1 },
  ]);

  const [currentMove] = useState<Tile[]>([
    { x: 7, y: 6, letter: 'W' },
    { x: 7, y: 8, letter: 'R' },
    { x: 7, y: 9, letter: 'L' },
    { x: 7, y: 10, letter: 'D' }
  ]);

  const [players] = useState<Player[]>([
    { id: 1, name: user?.displayName || 'Gracz 1', score: 120, isCurrentTurn: true },
    { id: 2, name: "Bot Komputerowy", score: 95, isCurrentTurn: false }
  ]);

    const handleSaveGame = async () => {
        if (!user) return;
        try {
        await addDoc(collection(db, "games"), {
            userId: user.uid,
            userEmail: user.email,
            boardState: fixedTiles,
            score: players.find(p => p.id === 1)?.score || 0,
            createdAt: serverTimestamp(),
            status: "unfinished"
        });
        alert("Gra zapisana w historii!");
        } catch (e) {
        console.error("Błąd zapisu:", e);
        alert("Wystąpił błąd podczas zapisu.");
        }
    };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold text-gray-800">Rozgrywka</h1>
            <p className="text-gray-500">Stół #1234 • Tryb klasyczny</p>
        </div>
        
        <div className="flex gap-3">
             <button className="btn-secondary text-red-600 border-red-200 hover:bg-red-50">
                Poddaj się
             </button>
             <button 
                onClick={handleSaveGame}
                className="btn-primary shadow-lg shadow-indigo-200"
             >
                💾 Zapisz grę
             </button>
        </div>
      </div>

      <ScrabbleBoard 
        fixedTiles={fixedTiles}
        currentMove={currentMove}
        players={players}
      />
      
      {/* Panel sterowania ruchami (Mockup) */}
      <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200 text-center">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Twoje Literki</h3>
        <div className="flex justify-center gap-2 mb-6">
            {['A', 'Z', 'E', 'P', 'O', 'S', '?'].map((l, i) => (
                <div key={i} className="w-10 h-10 md:w-12 md:h-12 bg-amber-100 rounded border-b-4 border-amber-300 flex items-center justify-center font-bold text-amber-900 cursor-grab active:cursor-grabbing hover:-translate-y-1 transition-transform">
                    {l}
                </div>
            ))}
        </div>
        <div className="text-xs text-gray-400">Przeciągnij literki na planszę (Funkcja w budowie)</div>
      </div>
    </div>
  );
}