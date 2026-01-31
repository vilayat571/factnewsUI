import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Layout";
import NewsCard from "../components/NewsCard";
import { CATEGORIES, type News } from "../types";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [news, setNews] = useState<News[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement>(null);

  // Fetch initial news when category changes
  useEffect(() => {
    setNews([]);
    setPage(1);
    setHasMore(true);
    fetchNews(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  // Setup infinite scroll observer
  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(observerRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMore, loading, page]);

  const fetchNews = async (pageNum: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/news?category=${category}&limit=6&page=${pageNum}`,
      );
      const data = await res.json();

      if (data.news.length > 0) {
        setNews((prev) =>
          pageNum === 1 ? data.news : [...prev, ...data.news],
        );

        if (data.news.length < 6) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchNews(nextPage);
  };

 
const categoryName = CATEGORIES.find(
  (item) => item.value === category
);

  return (
    <Layout>
      <div className="min-h-screen">
        <div className="w-full mx-auto px-4 py-8">
          {/* Category Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <h1 className="text-4xl font-bold text-gray-900">
                {categoryName?.name}
              </h1>
              <div className="h-1 flex-1 bg-linear-to-r from-orange-500 to-transparent"></div>
            </div>
            <p className="text-gray-600">
                 kateqoriyasından ən son xəbərlər
            </p>
          </div>

          {/* News Grid */}
          {news.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {news.map((item) => (
                <NewsCard key={item._id} news={item} />
              ))}
            </div>
          ) : (
            !loading && (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-xl text-gray-600">
                  Bu kateqoriyada xəbər tapılmadı
                </p>
              </div>
            )
          )}

          {/* Loading Indicator */}
          {hasMore && (
            <div ref={observerRef} className="flex justify-center mt-8 py-4">
              {loading && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              )}
            </div>
          )}

          {/* End of Results */}
          {!hasMore && news.length > 0 && (
            <div className="text-center mt-8 py-4">
              <p className="text-gray-500">Bütün xəbərlər göstərildi</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
