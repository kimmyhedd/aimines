
import React from 'react';
import { Cell, CellType, GameState } from '../types';
import { GemIcon, MineIcon } from './icons';

interface GameBoardProps {
  grid: Cell[];
  onCellClick: (index: number) => void;
  gameState: GameState;
}

const CellComponent: React.FC<{ cell: Cell; onClick: () => void; gameState: GameState }> = ({ cell, onClick, gameState }) => {
  const { type, isRevealed } = cell;

  const isBusted = gameState === GameState.BUSTED;
  const isInProgress = gameState === GameState.IN_PROGRESS;

  let content = null;
  let baseClasses = "relative w-full h-full rounded-md flex items-center justify-center transition-all duration-300 transform-gpu";
  let bgClasses = "bg-slate-700 hover:bg-slate-600";

  if (isRevealed) {
    if (type === CellType.GEM) {
      bgClasses = "bg-emerald-900/50 scale-105";
      content = <GemIcon className="w-8 h-8 text-emerald-400 animate-pulse" />;
    } else {
      bgClasses = "bg-red-900/50 scale-105";
      content = <MineIcon className="w-8 h-8 text-red-500" />;
    }
  } else if (isBusted && type === CellType.MINE) {
    // Reveal all mines when busted
    bgClasses = "bg-red-900/50";
    content = <MineIcon className="w-8 h-8 text-red-500" />;
  }
  
  const canClick = !isRevealed && isInProgress;

  return (
    <button
      onClick={onClick}
      disabled={!canClick}
      className={`${baseClasses} ${bgClasses} ${canClick ? 'cursor-pointer' : 'cursor-default'}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className={`transition-opacity duration-300 ${isRevealed || (isBusted && type === CellType.MINE) ? 'opacity-100' : 'opacity-0'}`}>
        {content}
      </div>
    </button>
  );
};


export const GameBoard: React.FC<GameBoardProps> = ({ grid, onCellClick, gameState }) => {
  return (
    <div className="w-full max-w-xl aspect-square grid grid-cols-5 grid-rows-5 gap-2 md:gap-3 p-3 bg-slate-900/50 rounded-lg">
      {grid.map((cell, index) => (
        <CellComponent
          key={index}
          cell={cell}
          onClick={() => onCellClick(index)}
          gameState={gameState}
        />
      ))}
    </div>
  );
};
