import React, { useState, useRef, useEffect } from 'react';
import { Filter, ChevronDown, X, Check } from 'lucide-react';

const SourceFilter = ({ selectedSources, onSourceChange, availableSources, totalCount }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Get unique sources from available news data
    const uniqueSources = [...new Set(availableSources.map(item => item.source))];

    const sourceConfig = {
        'Adda247': {
            name: 'Adda247',
            color: 'blue',
            bgColor: 'bg-blue-100',
            textColor: 'text-blue-800',
            borderColor: 'border-blue-200',
        },
        'NextIAS': {
            name: 'NextIAS',
            color: 'purple',
            bgColor: 'bg-purple-100',
            textColor: 'text-purple-800',
            borderColor: 'border-purple-200',
        },
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getSourceCount = (source) => {
        return availableSources.filter(item => item.source === source).length;
    };

    const toggleSource = (source) => {
        if (selectedSources.includes(source)) {
            onSourceChange(selectedSources.filter(s => s !== source));
        } else {
            onSourceChange([...selectedSources, source]);
        }
    };

    const clearAllFilters = () => {
        onSourceChange([]);
        setIsOpen(false);
    };

    const selectAllSources = () => {
        onSourceChange(uniqueSources);
        setIsOpen(false);
    };

    const getFilterButtonText = () => {
        if (selectedSources.length === 0) {
            return 'All Sources';
        } else if (selectedSources.length === uniqueSources.length) {
            return 'All Sources';
        } else if (selectedSources.length === 1) {
            const config = sourceConfig[selectedSources[0]];
            return config ? config.name : selectedSources[0];
        } else {
            return `${selectedSources.length} Sources`;
        }
    };

    const getFilterButtonColor = () => {
        if (selectedSources.length === 0 || selectedSources.length === uniqueSources.length) {
            return 'bg-slate-100 text-slate-700 border-slate-200';
        } else if (selectedSources.length === 1) {
            const config = sourceConfig[selectedSources[0]];
            return config ? `${config.bgColor} ${config.textColor} ${config.borderColor}` : 'bg-blue-100 text-blue-800 border-blue-200';
        } else {
            return 'bg-blue-100 text-blue-800 border-blue-200';
        }
    };

    return (
        <div className="mb-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-slate-700">
                        Showing {totalCount} article{totalCount !== 1 ? 's' : ''}
                    </span>
                    {selectedSources.length > 0 && selectedSources.length < uniqueSources.length && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                            Filtered
                        </span>
                    )}
                </div>

                {/* Filter Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg border font-medium text-sm transition-all duration-200 hover:shadow-md ${getFilterButtonColor()}`}
                    >
                        <Filter className="w-4 h-4" />
                        <span>{getFilterButtonText()}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border

 border-slate-200 z-50 overflow-hidden animate-slideInFromTop">
                            {/* Header */}
                            <div className="px-4 py-3 border-b border-slate-200 bg-slate-50">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-slate-800 text-sm">Filter by Source</h3>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="px-4 py-3 border-b border-slate-200">
                                <div className="flex space-x-2">
                                    <button
                                        onClick={selectAllSources}
                                        className="flex-1 px-3 py-2 text-xs font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                                    >
                                        Select All
                                    </button>
                                    <button
                                        onClick={clearAllFilters}
                                        className="flex-1 px-3 py-2 text-xs font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                                    >
                                        Clear All
                                    </button>
                                </div>
                            </div>

                            {/* Source Options */}
                            <div className="py-2">
                                {uniqueSources.map((source) => {
                                    const isSelected = selectedSources.includes(source);
                                    const count = getSourceCount(source);
                                    const config = sourceConfig[source] || {
                                        name: source,
                                        color: 'gray',
                                        bgColor: 'bg-gray-100',
                                        textColor: 'text-gray-800',
                                        borderColor: 'border-gray-200',
                                    };

                                    return (
                                        <button
                                            key={source}
                                            onClick={() => toggleSource(source)}
                                            className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors duration-150 group"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div
                                                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${isSelected
                                                            ? `border-${config.color}-500 bg-${config.color}-500`
                                                            : 'border-slate-300 group-hover:border-slate-400'
                                                        }`}
                                                >
                                                    {isSelected && <Check className="w-3 h-3 text-white" />}
                                                </div>
                                                <div className="text-left">
                                                    <div className="flex items-center space-x-2">
                                                        <span className="font-medium text-slate-800 text-sm">{config.name}</span>
                                                        <span className={`text-xs px-2 py-0.5 rounded-full ${config.bgColor} ${config.textColor}`}>
                                                            {count}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Footer */}
                            {selectedSources.length > 0 && selectedSources.length < uniqueSources.length && (
                                <div className="px-4 py-3 border-t border-slate-200 bg-slate-50">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-slate-600">
                                            {selectedSources.length} of {uniqueSources.length} sources selected
                                        </span>
                                        <button
                                            onClick={clearAllFilters}
                                            className="text-xs text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors duration-200"
                                        >
                                            Clear
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SourceFilter;