import React from 'react';
import { TableRequest, GameType, TableOptions, PRESET_AMOUNTS, PRESET_GAME_PLUS } from '../types';
import { Wallet, Dices, TrendingUp, Settings, CheckSquare, Square } from 'lucide-react';

interface GameFormProps {
  request: TableRequest;
  setRequest: React.Dispatch<React.SetStateAction<TableRequest>>;
}

export const GameForm: React.FC<GameFormProps> = ({ request, setRequest }) => {

  const toggleOption = (key: keyof TableOptions) => {
    setRequest(prev => ({
      ...prev,
      options: {
        ...prev.options,
        [key]: !prev.options[key]
      }
    }));
  };

  const handleAmountClick = (amt: string) => {
    const cleanAmt = amt.replace('₹', '');
    setRequest(prev => ({ ...prev, amount: cleanAmt }));
  };

  const handleGamePlusClick = (val: string) => {
    setRequest(prev => ({ ...prev, gamePlus: val }));
  };

  return (
    <div className="space-y-6">
      {/* Amount Section */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-bold text-gray-800">
          <span className="text-yellow-600 mr-2"><Wallet size={18} /></span>
          Amount
        </label>
        <input
          type="number"
          value={request.amount}
          onChange={(e) => setRequest({ ...request, amount: e.target.value })}
          placeholder="Enter amount"
          className="w-full bg-gray-50 border border-gray-200 text-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#175e70] transition-all"
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {PRESET_AMOUNTS.map((amt) => (
            <button
              key={amt}
              onClick={() => handleAmountClick(amt)}
              className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded-md hover:bg-gray-300 transition-colors"
            >
              ₹{amt}
            </button>
          ))}
        </div>
      </div>

      {/* Type Section */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-bold text-gray-800">
          <span className="text-gray-600 mr-2"><Dices size={18} /></span>
          Type
        </label>
        <div className="relative">
          <select
            value={request.type}
            onChange={(e) => setRequest({ ...request, type: e.target.value as GameType })}
            className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 rounded-md p-3 pr-8 focus:outline-none focus:ring-2 focus:ring-[#175e70]"
          >
            {Object.values(GameType).map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>

      {/* Game+ Section */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-bold text-gray-800">
          <span className="text-blue-400 mr-2"><TrendingUp size={18} /></span>
          Game+
        </label>
        <input
          type="text"
          value={request.gamePlus}
          onChange={(e) => setRequest({ ...request, gamePlus: e.target.value })}
          placeholder="Enter Game+"
          className="w-full bg-gray-50 border border-gray-200 text-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#175e70] transition-all"
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {PRESET_GAME_PLUS.map((val) => (
            <button
              key={val}
              onClick={() => handleGamePlusClick(val)}
              className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded-md hover:bg-gray-300 transition-colors"
            >
              {val}
            </button>
          ))}
        </div>
      </div>

      {/* Options Section */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-bold text-gray-800">
          <span className="text-slate-500 mr-2"><Settings size={18} /></span>
          Options
        </label>
        <div className="flex flex-wrap gap-3">
          <Checkbox label="Fresh Id" checked={request.options.freshId} onChange={() => toggleOption('freshId')} />
          <Checkbox label="Code aap doge" checked={request.options.codeAapDoge} onChange={() => toggleOption('codeAapDoge')} />
          <Checkbox label="No iPhone" checked={request.options.noIphone} onChange={() => toggleOption('noIphone')} />
          <Checkbox label="No king pass" checked={request.options.noKingPass} onChange={() => toggleOption('noKingPass')} />
          <Checkbox label="Auto loss" checked={request.options.autoLoss} onChange={() => toggleOption('autoLoss')} />
        </div>
      </div>
    </div>
  );
};

const Checkbox: React.FC<{ label: string; checked: boolean; onChange: () => void }> = ({ label, checked, onChange }) => {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`flex items-center space-x-2 px-3 py-2 rounded-md border transition-all duration-200 ${
        checked ? 'bg-slate-100 border-slate-400' : 'bg-transparent border-gray-200 hover:border-gray-300'
      }`}
    >
      <span className={`${checked ? 'text-[#175e70]' : 'text-gray-400'}`}>
        {checked ? <CheckSquare size={18} /> : <Square size={18} />}
      </span>
      <span className="text-sm text-gray-700">{label}</span>
    </button>
  );
};
