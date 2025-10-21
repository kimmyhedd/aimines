
import React from 'react';

interface StatsDisplayProps {
  profit: number;
  multiplier: number;
  gemsFound: number;
  gemsToFind: number;
}

const StatCard: React.FC<{ title: string; value: string | number; colorClass: string }> = ({ title, value, colorClass }) => (
    <div className="bg-slate-800 rounded-lg p-4 flex-1 text-center">
        <p className="text-sm text-slate-400">{title}</p>
        <p className={`text-2xl font-bold ${colorClass}`}>{value}</p>
    </div>
);


export const StatsDisplay: React.FC<StatsDisplayProps> = ({ profit, multiplier, gemsFound, gemsToFind }) => {
  return (
    <div className="w-full flex gap-4">
      <StatCard title="Profit" value={`$${profit.toFixed(2)}`} colorClass="text-emerald-400" />
      <StatCard title="Multiplier" value={`${multiplier.toFixed(2)}x`} colorClass="text-cyan-400" />
      <StatCard title="Gems" value={`${gemsFound}/${gemsToFind}`} colorClass="text-white" />
    </div>
  );
};
