// src/components/NewsCards.jsx
import React from 'react';
import { Eye, ExternalLink } from 'lucide-react';

const NewsCards = ({ paginatedNews, setSelectedNews, truncateText }) => {
    return (
        <div className="lg:hidden divide-y divide-slate-200">
            {paginatedNews.map((item, index) => (
                <div
                    key={index}
                    className="p-4 hover:bg-slate-50 transition-colors duration-150 cursor-pointer active:bg-slate-100"
                    onClick={() => setSelectedNews(item)}
                >
                    <div className="space-y-3">
                        <div>
                            <h3 className="font-semibold text-slate-800 text-sm leading-tight mb-1">{truncateText(item.title, 80)}</h3>
                            <p className="text-slate-600 text-xs leading-relaxed">{truncateText(item.summary, 120)}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${item.source === 'Adda247' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                                    {item.source}
                                </span>
                                <span className="text-xs text-slate-500 font-mono">${(parseFloat(item.cost) || 0).toFixed(4)}</span>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedNews(item);
                                    }}
                                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                >
                                    <Eye className="w-4 h-4" />
                                </button>
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-slate-500">
                            <span>Tokens: {(parseInt(item.input_tokens) || 0) + (parseInt(item.output_tokens) || 0)}</span>
                            <span>In: {item.input_tokens || 0} | Out: {item.output_tokens || 0}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NewsCards;