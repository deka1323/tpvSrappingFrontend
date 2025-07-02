// src/components/NewsDetailModal.jsx
import React from 'react';
import { X, ExternalLink } from 'lucide-react';

const NewsDetailModal = ({ selectedNews, setSelectedNews }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-modalSlideIn">
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 sticky top-0 bg-white">
                    <h3 className="text-lg sm:text-xl font-semibold text-slate-800">Article Details</h3>
                    <button
                        onClick={() => setSelectedNews(null)}
                        className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                </div>
                <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
                    <div className="space-y-4 sm:space-y-6">
                        <div>
                            <h4 className="font-semibold text-slate-800 mb-2 text-sm sm:text-base">Title</h4>
                            <p className="text-slate-700 text-sm sm:text-base">{selectedNews.title}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-800 mb-2 text-sm sm:text-base">Summary</h4>
                            <p className="text-slate-700 text-sm sm:text-base">{selectedNews.summary}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-800 mb-2 text-sm sm:text-base">Rewritten Article</h4>
                            <div className="bg-slate-50 rounded-lg p-3 sm:p-4">
                                <p className="text-slate-700 whitespace-pre-wrap text-sm sm:text-base">{selectedNews.rewritten_article}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-2 text-sm sm:text-base">Source Information</h4>
                                <div className="space-y-2 text-sm sm:text-base">
                                    <p>
                                        <span className="font-medium">Source:</span>
                                        <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${selectedNews.source === 'Adda247' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                                            {selectedNews.source}
                                        </span>
                                    </p>
                                    <p><span className="font-medium">Scraped Title:</span> {selectedNews.scraped_title}</p>
                                    <p><span className="font-medium">Date:</span> {selectedNews.date}</p>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-2 text-sm sm:text-base">Token Usage & Cost</h4>
                                <div className="space-y-2 text-sm sm:text-base">
                                    <p><span className="font-medium">Input Tokens:</span> {selectedNews.input_tokens || 0}</p>
                                    <p><span className="font-medium">Output Tokens:</span> {selectedNews.output_tokens || 0}</p>
                                    <p><span className="font-medium">Cost:</span> ${(parseFloat(selectedNews.cost) || 0).toFixed(4)}</p>
                                </div>
                            </div>
                        </div>
                        {selectedNews.imageUrl && (
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-2 text-sm sm:text-base">Image</h4>
                                <img src={selectedNews.imageUrl} alt="Article" className="rounded-lg max-w-full h-auto" />
                            </div>
                        )}
                        <div>
                            <h4 className="font-semibold text-slate-800 mb-2 text-sm sm:text-base">Original Content</h4>
                            <div className="bg-slate-50 rounded-lg p-3 sm:p-4 max-h-64 overflow-y-auto">
                                <p className="text-slate-700 whitespace-pre-wrap text-xs sm:text-sm">{selectedNews.scraped_text}</p>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 pt-4 border-t border-slate-200">
                            <a
                                href={selectedNews.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
                            >
                                <ExternalLink className="w-4 h-4" />
                                <span>View Original</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsDetailModal;