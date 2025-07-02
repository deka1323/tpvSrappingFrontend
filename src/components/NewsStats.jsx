// src/components/NewsStats.jsx
import React from 'react';
import { Newspaper, Clock, TrendingUp } from 'lucide-react';

const NewsStats = ({ filteredNews, selectedSources, selectedDate, calculateTotalCost }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-slate-200">
                <div className="flex items-center space-x-3">
                    <Newspaper className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                    <div>
                        <p className="text-xl sm:text-2xl font-bold text-slate-800">{filteredNews.length}</p>
                        <p className="text-slate-600 text-sm sm:text-base">{selectedSources.length > 0 ? 'Filtered Articles' : 'Total Articles'}</p>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-slate-200">
                <div className="flex items-center space-x-3">
                    <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                    <div>
                        <p className="text-lg sm:text-2xl font-bold text-slate-800">{selectedDate || 'N/A'}</p>
                        <p className="text-slate-600 text-sm sm:text-base">Selected Date</p>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-slate-200 sm:col-span-1 col-span-1">
                <div className="flex items-center space-x-3">
                    <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                    <div>
                        <p className="text-lg sm:text-2xl font-bold text-slate-800">${calculateTotalCost().toFixed(4)}</p>
                        <p className="text-slate-600 text-sm sm:text-base">Total Cost</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsStats;