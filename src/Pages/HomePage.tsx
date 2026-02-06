import { useEffect, useState, useRef } from "react";
import type { News } from "../types";
import MainStory from "./MainStory";
import NewsCard from "../components/NewsCard";
import { API_ENDPOINT } from "../constants/urls";
import { TrendingUp, Sparkles, ChevronDown } from "lucide-react";
import Layout from "../layout/Layout";

const HomePage = () => {
  const [mainStory, setMainStory] = useState<News | null>(null);
  const [news, setNews] = useState<News[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mainStoryRes, newsRes] = await Promise.all([
          fetch(`${API_ENDPOINT}/news?limit=1&page=1`),
          fetch(`${API_ENDPOINT}/news?limit=15&page=1`)
        ]);

        const mainStoryData = await mainStoryRes.json();
        const newsData = await newsRes.json();

        setMainStory(mainStoryData.news[0]);
        setNews(newsData.news);
        
        if (newsData.news.length < 6) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const loadMore = async () => {
    setLoading(true);
    try {
      const nextPage = page + 1;
      const res = await fetch(`${API_ENDPOINT}/news?limit=15&page=${nextPage}`);
      const data = await res.json();

      if (data.news.length > 0) {
        setNews([...news, ...data.news]);
        setPage(nextPage);
        
        if (data.news.length < 6) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasMore, loading, page, news]);

  return (
    <Layout>
      <div className="min-h-screen">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Main Story Section */}
          {mainStory && (
            <section className="mb-16 animate-fadeInUp">
              {/* Section Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2 bg-linear-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full shadow-lg">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-bold text-sm  tracking-wide">Günün Xəbəri</span>
                </div>
                <div className="flex-1 h-1 bg-linear-to-r from-orange-500 via-red-500 to-transparent rounded-full"></div>
              </div>

              <MainStory news={mainStory} />
            </section>
          )}

          {/* Latest News Section */}
          {news.length > 0 && (
            <section className="mb-12">
              {/* Section Header with modern styling */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-linear-to-r from-gray-900 to-black text-white px-5 py-2.5 rounded-xl shadow-lg group hover:shadow-xl transition-shadow duration-300">
                    <TrendingUp className="w-5 h-5 text-orange-400 group-hover:scale-110 transition-transform" />
                    <h2 className="text-lg font-bold uppercase tracking-wide">Son Xəbərlər</h2>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-medium">Canlı Yenilənirlər</span>
                  </div>
                </div>
                
                {/* Decorative gradient line */}
                <div className="hidden md:flex flex-1 ml-6">
                  <div className="w-full h-1 bg-linear-to-r from-orange-500/30 via-red-500/30 to-transparent rounded-full"></div>
                </div>
              </div>

              {/* News Grid with staggered animation */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
                {news.map((item, index) => (
                  <div
                    key={item._id}
                    className="animate-fadeInUp"
                    style={{ 
                      animationDelay: `${index * 0.1}s`,
                      animationFillMode: 'both'
                    }}
                  >
                    <NewsCard news={item} />
                  </div>
                ))}
              </div>

              {/* Loading or End Message */}
              <div className="flex justify-center mt-12">
                {hasMore ? (
                  <div ref={observerRef} className="w-full max-w-md">
                    {loading && (
                      <div className="flex flex-col items-center space-y-4 py-8">
                        {/* Modern loading animation */}
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-linear-to-r from-orange-500 to-red-500 rounded-full animate-bounce shadow-lg"></div>
                          <div 
                            className="w-3 h-3 bg-linear-to-r from-orange-500 to-red-500 rounded-full animate-bounce shadow-lg" 
                            style={{ animationDelay: '0.1s' }}
                          ></div>
                          <div 
                            className="w-3 h-3 bg-linear-to-r from-orange-500 to-red-500 rounded-full animate-bounce shadow-lg" 
                            style={{ animationDelay: '0.2s' }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-500 font-medium">Daha çox xəbər yüklənir...</p>
                      </div>
                    )}
                    
                    {/* Scroll indicator when not loading */}
                    {!loading && (
                      <div className="flex flex-col items-center space-y-3 py-6">
                        <div className="bg-linear-to-r from-orange-100 to-red-100 p-3 rounded-full">
                          <ChevronDown className="w-6 h-6 text-orange-600 animate-bounce" />
                        </div>
                        <p className="text-sm text-gray-500 font-medium">Aşağı sürüşdürün</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full max-w-md">
                    <div className="text-center py-12 px-6 bg-linear-to-br from-gray-50 via-white to-orange-50 rounded-2xl border-2 border-gray-100 shadow-sm">
                      {/* Success icon with gradient */}
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-orange-400 to-red-500 mb-4 shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Bütün xəbərlər göstərildi</h3>
                      <p className="text-sm text-gray-500 mb-6">Daha çox xəbər yoxdur</p>
                      
                      {/* Decorative elements */}
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
      `}</style>
    </Layout>
  );
};

export default HomePage;