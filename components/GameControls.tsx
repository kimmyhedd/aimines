
import React from 'react';
import { GameState } from '../types';
import { WalletIcon } from './icons';

interface GameControlsProps {
  balance: number;
  betAmount: string;
  setBetAmount: (value: string) => void;
  mineCount: string;
  setMineCount: (value: string) => void;
  gameState: GameState;
  onStartGame: () => void;
  onCashOut: () => void;
  onAddMoney: () => void;
  maxMines: number;
}

export const GameControls: React.FC<GameControlsProps> = ({
  balance,
  betAmount,
  setBetAmount,
  mineCount,
  setMineCount,
  gameState,
  onStartGame,
  onCashOut,
  onAddMoney,
  maxMines
}) => {
  const isIdle = gameState === GameState.IDLE || gameState === GameState.BUSTED;

  const handleBetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setBetAmount(value);
    }
  };

  const handleMineCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= maxMines) {
      setMineCount(String(value));
    } else if (e.target.value === '') {
      setMineCount('');
    }
  };

  const handleActionClick = () => {
    if (isIdle) {
      onStartGame();
    } else {
      onCashOut();
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6 w-full md:w-96 flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
            <WalletIcon className="w-6 h-6 text-cyan-400" />
            <span className="text-xl font-bold text-white tracking-wider">{balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
        </div>
        <button
          onClick={onAddMoney}
          className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-md transition duration-200"
        >
          + $1,000
        </button>
      </div>

      <div>
        <label htmlFor="bet-amount" className="block text-sm font-medium text-slate-400 mb-1">Bet Amount</label>
        <input
          id="bet-amount"
          type="text"
          value={betAmount}
          onChange={handleBetAmountChange}
          disabled={!isIdle}
          className="w-full bg-slate-900 border border-slate-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition disabled:opacity-50"
          placeholder="0.00"
        />
      </div>

      <div>
        <label htmlFor="mine-count" className="block text-sm font-medium text-slate-400 mb-1">Mines (1-{maxMines})</label>
        <input
          id="mine-count"
          type="number"
          value={mineCount}
          onChange={handleMineCountChange}
          disabled={!isIdle}
          min="1"
          max={maxMines}
          className="w-full bg-slate-900 border border-slate-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition disabled:opacity-50"
          placeholder="5"
        />
      </div>

      <button
        onClick={handleActionClick}
        className={`w-full text-lg font-bold py-4 rounded-lg transition duration-300 transform hover:scale-105
          ${isIdle 
            ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
            : 'bg-cyan-500 hover:bg-cyan-600 text-white'
          }
          disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100`}
        disabled={gameState === GameState.IN_PROGRESS && betAmount === '0'}
      >
        {isIdle ? 'Bet' : 'Cash Out'}
      </button>
    </div>
  );
};
