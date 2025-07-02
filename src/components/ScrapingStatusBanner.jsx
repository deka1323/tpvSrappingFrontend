import React from 'react';
import { CheckCircle, Shield, Clock, FileText, Sparkles } from 'lucide-react';
import { format } from 'date-fns';

const ScrapingStatusBanner = ({ scrapingStatus, onReScrapeTrigger }) => {
    if (!scrapingStatus?.scraped) return null;

    const formatTime = (timestamp) => {
        try {
            return new Date(timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        } catch {
            return 'Recently';
        }
    };

    return (
        <div className="mb-4 sm:mb-6 animate-slideInFromTop">
            <div className="bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 border border-emerald-200/60 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="flex items-center justify-between">
                    {/* Left Content */}
                    <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                        <div className="relative">
                            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                                <h3 className="text-sm sm:text-base font-semibold text-emerald-800 truncate">
                                    Today's News Ready
                                </h3>
                                <div className="hidden sm:flex items-center space-x-1 text-emerald-600">
                                    <Sparkles className="w-3 h-3" />
                                    <span className="text-xs font-medium bg-emerald-100 px-2 py-0.5 rounded-full">
                                        {format(new Date(), "dd/MM/yyyy")}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-emerald-700">
                                {scrapingStatus.articles_count && (
                                    <div className="flex items-center space-x-1">
                                        <FileText className="w-3 h-3" />
                                        <span className="font-medium">{scrapingStatus.articles_count} articles</span>
                                    </div>
                                )}

                                {scrapingStatus.timestamp && (
                                    <div className="flex items-center space-x-1">
                                        <Clock className="w-3 h-3" />
                                        <span>{formatTime(scrapingStatus.timestamp)}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center space-x-2 ml-2">
                        {/* Mobile Date Badge */}
                        <div className="sm:hidden">
                            <span className="text-xs font-medium bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                                {format(new Date(), "dd/MM")}
                            </span>
                        </div>

                        {/* Re-scrape Button */}
                        <button
                            onClick={onReScrapeTrigger}
                            className="flex items-center space-x-1 bg-emerald-600 hover:bg-emerald-700 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md group-hover:bg-emerald-700"
                            title="Re-scrape today's news"
                        >
                            <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">Re-scrape</span>
                            <span className="sm:hidden">↻</span>
                        </button>
                    </div>
                </div>

                {/* Progress Bar Animation */}
                <div className="mt-2 h-1 bg-emerald-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-progressFill"></div>
                </div>
            </div>
        </div>
    );
};

export default ScrapingStatusBanner;