import React from 'react';
import { format } from 'date-fns'; // Add this import
import { Calendar, ChevronUp, ChevronDown, CheckCircle } from 'lucide-react';

const DateSelector = ({ selectedDate, fetchNews, showDatePicker, setShowDatePicker, last30Dates, isTodayScraped }) => {
    return (
        <div className="mb-6 sm:mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                        <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                        <h2 className="text-lg sm:text-xl font-semibold text-slate-800">Select Date</h2>
                        {selectedDate && (
                            <span className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                                {selectedDate}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={() => setShowDatePicker(!showDatePicker)}
                        className="flex items-center space-x-1 sm:space-x-2 text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm sm:text-base"
                    >
                        <span className="font-medium">{showDatePicker ? 'Hide' : 'Show'}</span>
                        {showDatePicker ? <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" /> : <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />}
                    </button>
                </div>
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${showDatePicker ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="pt-4 border-t border-slate-200">
                        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3">
                            {last30Dates.map((date, index) => {
                                const isToday = date === format(new Date(), 'dd/MM/yyyy');
                                const isScraped = isToday && isTodayScraped();

                                return (
                                    <button
                                        key={date}
                                        onClick={() => fetchNews(date)}
                                        className={`p-2 sm:p-3 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 relative ${selectedDate === date
                                                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:shadow-md'
                                            }`}
                                        style={{
                                            animationDelay: `${index * 15}ms`,
                                            animation: showDatePicker ? 'fadeInScale 0.3s ease-out forwards' : 'none',
                                        }}
                                    >
                                        <div className="flex flex-col items-center">
                                            <span className="text-xs sm:text-sm font-bold">{date.split('/')[0]}</span>
                                            <span className="text-xs opacity-75">{date.split('/')[1]}/{date.split('/')[2]}</span>
                                        </div>
                                        {isScraped && (
                                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white">
                                                <CheckCircle className="w-2 h-2 text-white" />
                                            </div>
                                        )}
                                        {isToday && !isScraped && (
                                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full border-2 border-white"></div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DateSelector;