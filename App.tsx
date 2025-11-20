import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { GameForm } from './components/GameForm';
import { generateTableConfirmation } from './services/geminiService';
import { TableRequest, GameType } from './types';
import { Banknote, RotateCcw, Edit3, CheckSquare } from 'lucide-react';

const App: React.FC = () => {
  const [request, setRequest] = useState<TableRequest>({
    amount: '',
    type: GameType.FULL,
    gamePlus: '',
    options: {
      freshId: false,
      codeAapDoge: false,
      noIphone: false,
      noKingPass: false,
      autoLoss: false,
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastResponse, setLastResponse] = useState<string | null>(null);

  const handleSendTable = useCallback(async () => {
    if (!request.amount) {
      alert("Please enter an amount.");
      return;
    }

    setIsSubmitting(true);
    const response = await generateTableConfirmation(request);
    setLastResponse(response);
    setIsSubmitting(false);
    
    // Scroll to bottom to show result
    setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
  }, [request]);

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto shadow-2xl overflow-hidden flex flex-col">
      <Header />
      
      <div className="flex-1 overflow-y-auto pb-24 no-scrollbar">
        
        {/* Branding Area */}
        <div className="flex flex-col items-center justify-center py-6 bg-white">
           <div className="w-12 h-12 rounded-full overflow-hidden mb-2 shadow-sm border border-gray-100">
             {/* Placeholder for Bot Avatar */}
             <img src="https://picsum.photos/100/100" alt="Bot Logo" className="w-full h-full object-cover" />
           </div>
           <h2 className="text-xl font-bold text-black tracking-tight">DEEP NIGHT LUDO CLUB</h2>
        </div>

        <div className="h-px bg-gray-200 w-full mb-4"></div>

        {/* Status Bar */}
        <div className="px-5 flex justify-between items-center mb-4">
          <span className="font-bold text-gray-900">Table Details</span>
          <div className="flex items-center text-green-700 font-semibold text-sm bg-green-50 px-2 py-1 rounded">
             <Banknote size={16} className="mr-1" />
             Balance: ₹28.00
          </div>
        </div>

        {/* Main Content Container */}
        <div className="px-5 space-y-6">
          
          {/* Last Table Request Card */}
          <div className="border border-gray-200 rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.05)] bg-white">
             <div className="flex items-center space-x-2 mb-3">
               <div className="w-5 h-5 text-gray-400">
                 <RotateCcw size={20} />
               </div>
               <h3 className="font-bold text-gray-800">Last Table Request</h3>
             </div>
             
             <div className="text-sm text-gray-600 space-y-1 mb-4 pl-1">
               <p><span className="font-semibold text-yellow-600">💰 ₹600.00</span> <span className="mx-1 text-gray-300">|</span> 🎲 Full <span className="mx-1 text-gray-300">|</span> 📉 0</p>
               <p className="text-gray-500"><span className="text-slate-400">⚙️</span> Options: None</p>
             </div>

             <div className="flex gap-3">
               <button className="flex-1 bg-orange-300 hover:bg-orange-400 text-orange-900 text-sm font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <RotateCcw size={16} /> Copy Table
               </button>
               <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <Edit3 size={16} /> Edit Table
               </button>
             </div>
          </div>

          {/* Input Form */}
          <GameForm request={request} setRequest={setRequest} />
          
          {/* Agreement */}
          <div className="pt-2 pb-4">
            <p className="text-sm text-gray-600">
              I am agree with the <a href="#" className="text-[#0e5c73] font-semibold underline">Game Rules</a>
            </p>
          </div>

        </div>
      </div>

      {/* Bottom Fixed Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 max-w-md mx-auto z-40">
        <button
          onClick={handleSendTable}
          disabled={isSubmitting}
          className={`w-full text-white font-bold text-lg py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg transition-all ${
             isSubmitting ? 'bg-gray-400' : 'bg-[#0e5c73] hover:bg-[#094557]'
          }`}
        >
          {isSubmitting ? (
             "Processing..."
          ) : (
             <>
               <CheckSquare size={22} className="fill-current" />
               Send Table
             </>
          )}
        </button>
      </div>

      {/* Simulated Bot Response Modal/Toast */}
      {lastResponse && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
           <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl animate-[fadeIn_0.2s_ease-out]">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Bot Response</h3>
              <div className="bg-gray-100 p-4 rounded-lg text-sm font-mono whitespace-pre-wrap text-gray-800 mb-4 max-h-60 overflow-y-auto">
                {lastResponse}
              </div>
              <button 
                onClick={() => setLastResponse(null)}
                className="w-full bg-gray-900 text-white font-bold py-2 rounded-lg"
              >
                Close
              </button>
           </div>
        </div>
      )}

    </div>
  );
};

export default App;