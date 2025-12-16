'use client';
import React from 'react';

const BOARD_SIZE = 15;

export interface Tile {
  x: number;
  y: number;
  letter: string;
  playerId?: number;
  points?: number;
}

export interface Player {
  id: number;
  name: string;
  score: number;
  isCurrentTurn: boolean;
}

interface ScrabbleBoardProps {
  fixedTiles: Tile[];
  currentMove: Tile[];
  players: Player[];
  onTileClick?: (x: number, y: number) => void;
}

const ScrabbleBoard = ({ fixedTiles, currentMove, players, onTileClick }: ScrabbleBoardProps) => {

  const getTileAt = (row: number, col: number) => {
    const movingTile = currentMove.find(m => m.y === row && m.x === col);
    if (movingTile) return { ...movingTile, type: 'current' };

    const fixedTile = fixedTiles.find(t => t.y === row && t.x === col);
    if (fixedTile) return { ...fixedTile, type: 'fixed' };

    return null;
  };

  const isCenter = (r: number, c: number) => r === 7 && c === 7;

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl mx-auto items-start justify-center">
      
      {/* 1. Panel Graczy (Responsywny) */}
      <div className="w-full lg:w-64 order-2 lg:order-1 space-y-4">
        <div className="card bg-white p-4 shadow-lg border-indigo-100">
          <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-3">Wyniki</h3>
          <ul className="space-y-3">
            {players.map(p => (
              <li key={p.id} className={`flex justify-between items-center p-3 rounded-lg border transition-all ${
                p.isCurrentTurn 
                  ? 'bg-indigo-50 border-indigo-300 shadow-sm ring-1 ring-indigo-200' 
                  : 'bg-gray-50 border-gray-100'
              }`}>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800">{p.name}</span>
                  {p.isCurrentTurn && <span className="text-xs text-indigo-600 font-bold">Ruch gracza</span>}
                </div>
                <span className="text-xl font-bold text-gray-700">{p.score}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Legenda */}
        <div className="card p-4 text-sm bg-white">
            <h4 className="font-semibold mb-2 text-gray-600">Legenda:</h4>
            <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-4 bg-amber-200 rounded border border-amber-600"></div>
                <span>Zatwierdzone</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-400 rounded border border-yellow-600 shadow-sm"></div>
                <span>Twój ruch</span>
            </div>
        </div>
      </div>

      {/* 2. Plansza */}
      <div className="order-1 lg:order-2 flex-grow flex justify-center w-full">
        <div className="relative bg-amber-900 p-2 rounded-lg shadow-2xl overflow-hidden max-w-[95vw] lg:max-w-none">
          
          {/* Siatka 15x15 */}
          <div className="grid grid-cols-15 gap-[2px] bg-amber-900 border-2 border-amber-800" 
               style={{ gridTemplateColumns: `repeat(${BOARD_SIZE}, minmax(0, 1fr))` }}>
            
            {Array.from({ length: BOARD_SIZE }).map((_, row) =>
              Array.from({ length: BOARD_SIZE }).map((_, col) => {
                const tile = getTileAt(row, col);
                
                return (
                  <div 
                    key={`${row}-${col}`} 
                    className={`
                      aspect-square flex items-center justify-center relative
                      ${!tile ? 'bg-amber-100/90' : ''}
                      ${isCenter(row, col) && !tile ? 'bg-pink-200' : ''}
                    `}
                    title={`R:${row} C:${col}`}
                  >
                    {/* Oznaczenie środka (gwiazdka) */}
                    {isCenter(row, col) && !tile && (
                      <span className="text-pink-600 text-xs font-bold opacity-50">★</span>
                    )}

                    {/* Klocek */}
                    {tile && (
                      <div className={`
                        w-[90%] h-[90%] rounded-md flex items-center justify-center 
                        text-sm sm:text-base md:text-xl font-bold shadow-md select-none transform transition-transform hover:scale-105 cursor-pointer
                        ${tile.type === 'current' 
                            ? 'bg-yellow-400 text-yellow-900 border-2 border-yellow-600 animate-pulse-slow' 
                            : 'bg-amber-200 text-amber-900 border border-amber-600'
                        }
                      `}>
                        {tile.letter}
                        {/* Mała cyferka z punktami (fejkowa dla demo) */}
                        <span className="absolute bottom-0.5 right-0.5 text-[0.5rem] leading-none opacity-70">1</span>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrabbleBoard;