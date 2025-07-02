import React, { useState, useEffect } from 'react';
import { format, subDays } from 'date-fns';
import Header from './components/Header';
import DateSelector from './components/DateSelector';
import NewsStats from './components/NewsStats';
import NewsTable from './components/NewsTable';
import NewsCards from './components/NewsCards';
import Pagination from './components/Pagination';
import NewsDetailModal from './components/NewsDetailModal';
import ScrapingStatusBanner from './components/ScrapingStatusBanner';
import SourceFilter from './components/SourceFilter';
import { CheckCircle, AlertCircle, Newspaper } from 'lucide-react';

const BACKEND = 'http://localhost:5000';
const AUTH_TOKEN = 'your_secret_token';

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scraping, setScraping] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [scrapingResult, setScrapingResult] = useState(null);
  const [showScrapingModal, setShowScrapingModal] = useState(false);
  const [scrapingStatus, setScrapingStatus] = useState(null);
  const [lastScrapedDate, setLastScrapedDate] = useState(null);
  const itemsPerPage = 6;

  const last30Dates = Array.from({ length: 30 }, (_, i) => format(subDays(new Date(), i), 'dd/MM/yyyy'));

  useEffect(() => {
    if (selectedSources.length === 0) {
      setFilteredNews(news);
    } else {
      const filtered = news.filter((item) => selectedSources.includes(item.source));
      setFilteredNews(filtered);
    }
    setCurrentPage(1);
  }, [news, selectedSources]);

  const checkScrapingStatus = async () => {
    const today = format(new Date(), 'dd/MM/yyyy');
    try {
      const res = await fetch(`${BACKEND}/scraping-status?date=${today}`);
      if (res.ok) {
        const data = await res.json();
        setScrapingStatus(data);
        if (data.scraped) {
          setLastScrapedDate(today);
        }
      }
    } catch (error) {
      console.error('Error checking scraping status:', error);
    }
  };

  useEffect(() => {
    const tryDates = async () => {
      setLoading(true);
      await checkScrapingStatus();
      for (let date of last30Dates) {
        try {
          const res = await fetch(`${BACKEND}/news-by-date?date=${date}`);
          const data = await res.json();
          if (data.length > 0) {
            setNews(data);
            setSelectedDate(date);
            setSelectedSources([]);
            break;
          }
        } catch (error) {
          console.error('Error fetching news for date:', date, error);
        }
      }
      setLoading(false);
    };
    tryDates();
  }, []);

  const fetchNews = async (dateStr) => {
    setLoading(true);
    setCurrentPage(1);
    setSelectedSources([]);
    try {
      const res = await fetch(`${BACKEND}/news-by-date?date=${dateStr}`);
      const data = await res.json();
      setNews(data);
      setSelectedDate(dateStr);
    } catch (err) {
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  const runScraper = async () => {
    setScraping(true);
    setScrapingResult(null);
    try {
      const res = await fetch(`${BACKEND}/run-scraper`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
      });
      const data = await res.json();
      setScrapingResult({
        success: res.ok,
        message: data.status || data.error || 'Scraping completed',
        details: data,
      });
      setShowScrapingModal(true);
      if (res.ok) {
        const today = format(new Date(), 'dd/MM/yyyy');
        setLastScrapedDate(today);
        setScrapingStatus({
          scraped: true,
          date: today,
          timestamp: new Date().toISOString(),
          articles_count: data.articles_count || 0,
        });
        setTimeout(() => {
          fetchNews(today);
        }, 1000);
      }
    } catch (err) {
      setScrapingResult({
        success: false,
        message: 'Failed to run scraper - Network error',
        details: { error: err.message },
      });
      setShowScrapingModal(true);
    } finally {
      setScraping(false);
    }
  };

  const closeScrapingModal = () => {
    setShowScrapingModal(false);
    setScrapingResult(null);
  };

  const truncateText = (text, maxLength = 60) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const calculateTotalCost = () => {
    if (!filteredNews || filteredNews.length === 0) return 0;
    const total = filteredNews.reduce((sum, item) => {
      const cost = parseFloat(item.cost) || 0;
      return sum + cost;
    }, 0);
    return isNaN(total) ? 0 : total;
  };

  const isTodayScraped = () => {
    const today = format(new Date(), 'dd/MM/yyyy');
    return scrapingStatus?.scraped && lastScrapedDate === today;
  };

  const paginatedNews = filteredNews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header scraping={scraping} runScraper={runScraper} isTodayScraped={isTodayScraped} loading={loading} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <ScrapingStatusBanner scrapingStatus={scrapingStatus} onReScrapeTrigger={runScraper} />
        <DateSelector
          selectedDate={selectedDate}
          fetchNews={fetchNews}
          showDatePicker={showDatePicker}
          setShowDatePicker={setShowDatePicker}
          last30Dates={last30Dates}
          isTodayScraped={isTodayScraped}
        />
        {news.length > 0 && (
          <SourceFilter
            selectedSources={selectedSources}
            onSourceChange={setSelectedSources}
            availableSources={news}
            totalCount={filteredNews.length}
          />
        )}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
            <p className="text-slate-600 font-medium text-sm sm:text-base">Loading news articles...</p>
          </div>
        ) : filteredNews.length > 0 ? (
          <>
            <NewsStats
              filteredNews={filteredNews}
              selectedSources={selectedSources}
              selectedDate={selectedDate}
              calculateTotalCost={calculateTotalCost}
            />
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <NewsTable paginatedNews={paginatedNews} setSelectedNews={setSelectedNews} truncateText={truncateText} />
              <NewsCards paginatedNews={paginatedNews} setSelectedNews={setSelectedNews} truncateText={truncateText} />
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                filteredNews={filteredNews}
                itemsPerPage={itemsPerPage}
              />
            </div>
          </>
        ) : news.length > 0 ? (
          <div className="text-center py-12 sm:py-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
              <Newspaper className="w-12 h-12 sm:w-16 sm:h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-slate-600 mb-2">No articles match your filter</h3>
              <p className="text-slate-500 text-sm sm:text-base mb-4">
                Try adjusting your source filter or clear all filters to see all articles.
              </p>
              <button
                onClick={() => setSelectedSources([])}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16">
            <Newspaper className="w-12 h-12 sm:w-16 sm:h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-slate-600 mb-2">No articles found</h3>
            <p className="text-slate-500 text-sm sm:text-base">Try selecting a different date or run the scraper to fetch new content.</p>
          </div>
        )}
      </main>

      {/* ✅ FIX: Properly close the scraping modal div */}
      {showScrapingModal && scrapingResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl animate-modalSlideIn">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                {scrapingResult.success ? (
                  <CheckCircle className="w-8 h-8 text-green-600" />
                ) : (
                  <AlertCircle className="w-8 h-8 text-red-600" />
                )}
                <h3 className="text-xl font-semibold text-slate-800">
                  {scrapingResult.success ? 'Scraping Completed!' : 'Scraping Failed'}
                </h3>
              </div>
              <div className="space-y-4">
                <p className="text-slate-700">{scrapingResult.message}</p>
                {scrapingResult.success ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 text-green-800">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Success!</span>
                    </div>
                    <p className="text-green-700 text-sm mt-1">
                      The news data has been updated. The table will automatically refresh with today's articles.
                    </p>
                  </div>
                ) : (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 text-red-800">
                      <AlertCircle className="w-5 h-5" />
                      <span className="font-medium">Error Details</span>
                    </div>
                    <p className="text-red-700 text-sm mt-1">
                      {scrapingResult.details?.error || 'Please check your connection and try again.'}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={closeScrapingModal}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedNews && <NewsDetailModal selectedNews={selectedNews} setSelectedNews={setSelectedNews} />}
    </div>
  );
}

export default App;
