
import React, { useState, useEffect, useCallback } from 'react';
import { GameBoard } from './components/GameBoard';
import { GameControls } from './components/GameControls';
import { StatsDisplay } from './components/StatsDisplay';
import { Cell, CellType, GameState } from './types';
import { combinations } from './utils/math';

const GRID_SIZE = 25;
const HOUSE_EDGE = 0.01; // 1% house edge

const App: React.FC = () => {
  const [balance, setBalance] = useState<number>(1000);
  const [betAmount, setBetAmount] = useState<string>('10');
  const [mineCount, setMineCount] = useState<string>('5');
  const [gameState, setGameState] = useState<GameState>(GameState.IDLE);
  const [grid, setGrid] = useState<Cell[]>([]);
  const [revealedGems, setRevealedGems] = useState<number>(0);
  const [currentMultiplier, setCurrentMultiplier] = useState<number>(1.0);

  const createInitialGrid = useCallback(() => {
    return Array(GRID_SIZE).fill(null).map(() => ({ type: CellType.GEM, isRevealed: false }));
  }, []);

  useEffect(() => {
    setGrid(createInitialGrid());
  }, [createInitialGrid]);

  const resetGame = useCallback(() => {
    setGameState(GameState.IDLE);
    setGrid(createInitialGrid());
    setRevealedGems(0);
    setCurrentMultiplier(1.0);
  }, [createInitialGrid]);

  const handleStartGame = () => {
    const bet = parseFloat(betAmount);
    const mines = parseInt(mineCount, 10);

    if (isNaN(bet) || bet <= 0) {
      alert("Please enter a valid bet amount.");
      return;
    }
    if (bet > balance) {
      alert("Insufficient balance.");
      return;
    }
    if (isNaN(mines) || mines < 1 || mines >= GRID_SIZE) {
      alert(`Please enter a valid number of mines (1-${GRID_SIZE - 1}).`);
      return;
    }

    setBalance(prev => prev - bet);

    const newGrid = createInitialGrid();
    let minesPlaced = 0;
    while (minesPlaced < mines) {
      const randomIndex = Math.floor(Math.random() * GRID_SIZE);
      if (newGrid[randomIndex].type === CellType.GEM) {
        newGrid[randomIndex].type = CellType.MINE;
        minesPlaced++;
      }
    }

    setGrid(newGrid);
    setGameState(GameState.IN_PROGRESS);
    setRevealedGems(0);
    setCurrentMultiplier(1.0);
  };
  
  const handleCashOut = () => {
    if (gameState !== GameState.IN_PROGRESS) return;

    const profit = parseFloat(betAmount) * currentMultiplier;
    setBalance(prev => prev + profit);
    resetGame();
  };

  const handleCellClick = (index: number) => {
    if (gameState !== GameState.IN_PROGRESS || grid[index].isRevealed) {
      return;
    }

    const newGrid = [...grid];
    newGrid[index].isRevealed = true;
    
    if (newGrid[index].type === CellType.MINE) {
      setGameState(GameState.BUSTED);
      setGrid(newGrid);
    } else {
      const newRevealedGems = revealedGems + 1;
      setRevealedGems(newRevealedGems);
      setGrid(newGrid);
      
      const totalGems = GRID_SIZE - parseInt(mineCount, 10);
      if (newRevealedGems === totalGems) {
        // Auto cash out if all gems are found
        const multiplier = (1 - HOUSE_EDGE) * combinations(GRID_SIZE, newRevealedGems) / combinations(totalGems, newRevealedGems);
        const profit = parseFloat(betAmount) * multiplier;
        setBalance(prev => prev + profit);
        resetGame();
      }
    }
  };

  const handleAddMoney = () => {
    setBalance(prev => prev + 1000);
  };

  useEffect(() => {
    if (gameState === GameState.IN_PROGRESS && revealedGems > 0) {
      const mines = parseInt(mineCount, 10);
      const totalGems = GRID_SIZE - mines;
      const multiplier = (1 - HOUSE_EDGE) * combinations(GRID_SIZE, revealedGems) / combinations(totalGems, revealedGems);
      setCurrentMultiplier(multiplier);
    } else if (gameState === GameState.BUSTED || gameState === GameState.IDLE) {
        setCurrentMultiplier(1.0);
    }
  }, [revealedGems, gameState, mineCount]);

  const profit = gameState === GameState.IN_PROGRESS ? parseFloat(betAmount) * currentMultiplier : 0;
  const gemsToFind = GRID_SIZE - parseInt(mineCount, 10) || 0;

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 font-sans">
        <header className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-500">
                Gemini Mines
            </h1>
            <p className="text-slate-400 mt-2">Uncover gems, avoid the mines. How far can you go?</p>
        </header>
        <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-center gap-8">
            <GameControls
              balance={balance}
              betAmount={betAmount}
              setBetAmount={setBetAmount}
              mineCount={mineCount}
              setMineCount={setMineCount}
              gameState={gameState}
              onStartGame={handleStartGame}
              onCashOut={handleCashOut}
              onAddMoney={handleAddMoney}
              maxMines={GRID_SIZE - 1}
            />
            <div className="w-full max-w-xl flex flex-col gap-4">
                {(gameState === GameState.IN_PROGRESS || gameState === GameState.BUSTED) && (
                     <StatsDisplay 
                        profit={profit}
                        multiplier={currentMultiplier}
                        gemsFound={revealedGems}
                        gemsToFind={gemsToFind}
                    />
                )}
                <GameBoard 
                    grid={grid}
                    onCellClick={handleCellClick}
                    gameState={gameState}
                />
                 {gameState === GameState.BUSTED && (
                    <div className="bg-red-500/20 border border-red-500 text-red-300 text-center p-4 rounded-lg animate-pulse">
                        <p className="font-bold text-lg">You hit a mine!</p>
                        <button 
                            onClick={resetGame}
                            className="mt-2 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-md font-semibold transition"
                        >
                            Play Again
                        </button>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default App;
