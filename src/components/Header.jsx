// src/components/Header.jsx
import React from 'react';
import { RefreshCw, Shield, Play } from 'lucide-react';
import logo from '../assets/logogo.png';

const Header = ({ scraping, runScraper, isTodayScraped, loading }) => {
    return (
        <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <img src={logo} alt="Company Logo" className="h-10 sm:h-12" />
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                        {scraping && (
                            <div className="flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg border border-blue-200 animate-pulse">
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
                                <span className="text-sm font-medium hidden sm:inline">Scraping in progress...</span>
                                <span className="text-sm font-medium sm:hidden">Scraping...</span>
                            </div>
                        )}
                        <button
                            onClick={runScraper}
                            disabled={scraping || loading}
                            className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100 text-sm sm:text-base ${isTodayScraped()
                                ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white'
                                : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-400 disabled:to-slate-500 text-white'
                                }`}
                            title={isTodayScraped() ? "Today's news already scraped - Click to re-scrape" : "Run scraper to fetch today's news"}
                        >
                            {scraping ? (
                                <>
                                    <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                                    <span className="hidden sm:inline">Scraping...</span>
                                    <span className="sm:hidden">...</span>
                                </>
                            ) : isTodayScraped() ? (
                                <>
                                    <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span className="hidden sm:inline">Re-scrape</span>
                                    <span className="sm:hidden">Re-run</span>
                                </>
                            ) : (
                                <>
                                    <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span className="hidden sm:inline">Run Scraper</span>
                                    <span className="sm:hidden">Run</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;