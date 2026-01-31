import Layout from "../Layout";
import { useEffect, useState, useRef } from "react";
import type { News } from "../types";
import MainStory from "./MainStory";
import NewsCard from "../components/NewsCard";

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
          fetch("http://localhost:3000/api/v1/news?limit=1&page=1"),
          fetch("http://localhost:3000/api/v1/news?limit=6&page=1")
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
      const res = await fetch(`http://localhost:3000/api/v1/news?limit=6&page=${nextPage}`);
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
        <div className="w-full mx-auto px-4 py-8">
          {mainStory && (
            <section className="mb-12">
              <MainStory news={mainStory} />
            </section>
          )}

          {news.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Latest News
                </h2>
                <div className="h-1 flex-1 bg-gradient-to-r from-orange-500 to-transparent ml-4"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {news.map((item) => (
                  <NewsCard key={item._id} news={item} />
                ))}
              </div>

              {/* Loading or End Message */}
              <div className="flex justify-center mt-8 py-4">
                {hasMore ? (
                  <div ref={observerRef}>
                    {loading && (
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-3">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-600 font-medium">Bütün xəbərlər göstərildi</p>
                    <p className="text-sm text-gray-400 mt-1">Daha çox xəbər yoxdur</p>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;