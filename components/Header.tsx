import React from 'react';
import { X, MoreVertical } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="flex items-center space-x-4">
        <X className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800" />
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold text-gray-800 leading-tight">DeepNightClubBot</h1>
          <span className="text-xs text-blue-500">bot</span>
        </div>
      </div>
      <MoreVertical className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800" />
    </div>
  );
};