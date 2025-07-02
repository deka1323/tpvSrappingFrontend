// src/components/Pagination.jsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, setCurrentPage, totalPages, filteredNews, itemsPerPage }) => {
    return (
        totalPages > 1 && (
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-t border-slate-200 bg-slate-50">
                <div className="text-xs sm:text-sm text-slate-600">
                    <span className="hidden sm:inline">Showing </span>
                    {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredNews.length)}
                    <span className="hidden sm:inline"> of {filteredNews.length} articles</span>
                    <span className="sm:hidden">/{filteredNews.length}</span>
                </div>
                <div className="flex items-center space-x-1 sm:space-x-2">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-2 text-slate-600 hover:bg-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <div className="sm:hidden flex items-center space-x-2">
                        <span className="text-sm font-medium text-slate-700">{currentPage} / {totalPages}</span>
                    </div>
                    <div className="hidden sm:flex items-center space-x-1">
                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                            let page;
                            if (totalPages <= 5) {
                                page = i + 1;
                            } else if (currentPage <= 3) {
                                page = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                                page = totalPages - 4 + i;
                            } else {
                                page = currentPage - 2 + i;
                            }
                            return (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === page ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-white'
                                        }`}
                                >
                                    {page}
                                </button>
                            );
                        })}
                    </div>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="p-2 text-slate-600 hover:bg-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        )
    );
};

export default Pagination;