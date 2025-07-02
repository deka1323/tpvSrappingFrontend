// src/components/NewsTable.jsx
import React from 'react';
import { Eye, ExternalLink } from 'lucide-react';

const NewsTable = ({ paginatedNews, setSelectedNews, truncateText }) => {
    return (
        <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th className="text-left p-4 font-semibold text-slate-800 min-w-64">Title</th>
                        <th className="text-left p-4 font-semibold text-slate-800 min-w-64">Summary</th>
                        <th className="text-left p-4 font-semibold text-slate-800 min-w-32">Source</th>
                        <th className="text-left p-4 font-semibold text-slate-800 min-w-24">Tokens</th>
                        <th className="text-left p-4 font-semibold text-slate-800 min-w-24">Cost</th>
                        <th className="text-left p-4 font-semibold text-slate-800 min-w-32">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                    {paginatedNews.map((item, index) => (
                        <tr
                            key={index}
                            className="hover:bg-slate-50 transition-colors duration-150 cursor-pointer group"
                            onClick={() => setSelectedNews(item)}
                        >
                            <td className="p-4 h-20">
                                <div className="font-medium text-slate-800 group-hover:text-blue-600 transition-colors">{truncateText(item.title, 60)}</div>
                            </td>
                            <td className="p-4 h-20">
                                <div className="text-slate-600">{truncateText(item.summary, 80)}</div>
                            </td>
                            <td className="p-4 h-20">
                                <div className="text-slate-700 font-medium">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.source === 'Adda247' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                                        {item.source}
                                    </span>
                                </div>
                            </td>
                            <td className="p-4 h-20">
                                <div className="text-sm text-slate-600">
                                    <div>In: {item.input_tokens || 0}</div>
                                    <div>Out: {item.output_tokens || 0}</div>
                                </div>
                            </td>
                            <td className="p-4 h-20">
                                <div className="text-slate-700 font-mono text-sm">${(parseFloat(item.cost) || 0).toFixed(4)}</div>
                            </td>
                            <td className="p-4 h-20">
                                <div className="flex space-x-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedNews(item);
                                        }}
                                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                        title="View Details"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </button>
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                        title="Open Link"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NewsTable;