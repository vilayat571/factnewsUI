import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Layout from "../layout/Layout";
import NewsCard from "../components/NewsCard";
import { CATEGORIES, type News } from "../types";
import { API_ENDPOINT } from "../constants/urls";
import { Newspaper, TrendingUp } from "lucide-react";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [news, setNews] = useState<News[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement>(null);

  // Fetch initial news when category changes
  useEffect(() => {
    setNews([]);
    setPage(1);
    setHasMore(true);
    setInitialLoading(true);
    fetchNews(1, true);
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

  const fetchNews = async (pageNum: number, isInitial = false) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_ENDPOINT}/news?category=${category}&limit=6&page=${pageNum}`,
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
      if (isInitial) {
        setInitialLoading(false);
      }
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchNews(nextPage);
  };

  const categoryName = CATEGORIES.find((item) => item.value === category);

  // Get category icon based on category
  const getCategoryIcon = () => {
    return <Newspaper className="w-8 h-8" />;
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Category Header with modern styling */}
          <div className="mb-12 animate-slideInDown">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 animate-fadeIn">
              <span className="hover:text-orange-500 transition-colors cursor-pointer">
                Ana səhifə
              </span>
              <span>/</span>
              <span className="text-gray-900 font-medium">
                {categoryName?.name}
              </span>
            </div>

            {/* Category Title Card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 p-8 shadow-2xl">
              {/* Decorative background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                  backgroundSize: '40px 40px'
                }}></div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-4 bg-white/20 backdrop-blur-sm rounded-xl text-white shadow-lg">
                    {getCategoryIcon()}
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                      {categoryName?.name}
                    </h1>
                    <p className="text-white/90 text-lg flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      <span>Kateqoriyasından ən son xəbərlər</span>
                    </p>
                  </div>
                </div>

                {/* Stats bar */}
                {!initialLoading && (
                  <div className="mt-6 flex items-center gap-6 text-white/90">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">
                      Son  {news.length} xəbər
                      </span>
                    </div>
                    <div className="h-4 w-px bg-white/30"></div>
                    <div className="text-sm">Canlı yenilənir</div>
                  </div>
                )}
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute -top-6 -left-6 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            </div>
          </div>

          {/* Initial Loading Skeleton */}
          {initialLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse"
                >
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* News Grid */}
              {news.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
                  {news.map((item, index) => (
                    <div
                      key={item._id}
                      className="animate-fadeInUp"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        animationFillMode: "both",
                      }}
                    >
                      <NewsCard news={item} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 animate-fadeIn">
                  <div className="inline-flex items-center justify-center w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200">
                    <svg
                      className="w-12 h-12 text-gray-400"
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Xəbər tapılmadı
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Bu kateqoriyada hazırda heç bir xəbər yoxdur. Zəhmət olmasa
                    daha sonra yoxlayın.
                  </p>
                </div>
              )}
            </>
          )}

          {/* Loading Indicator */}
          {hasMore && !initialLoading && (
            <div ref={observerRef} className="flex justify-center mt-12 py-8">
              {loading && (
                <div className="text-center">
                  <div className="inline-block w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm text-gray-500 mt-3">Yüklənir...</p>
                </div>
              )}
            </div>
          )}

          {/* End of Results */}
          {!hasMore && news.length > 0 && !initialLoading && (
            <div className="flex justify-center mt-12 animate-fadeIn">
              <div className="text-center py-8 px-6 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 shadow-sm">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-3 rounded-full bg-gradient-to-br from-orange-100 to-orange-50">
                  <svg
                    className="w-6 h-6 text-orange-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-gray-700 font-medium">
                  Bütün xəbərlər göstərildi
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {news.length} xəbər yükləndi
                </p>
              </div>
            </div>
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

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-slideInDown {
          animation: slideInDown 0.7s ease-out;
        }
      `}</style>
    </Layout>
  );
};

export default CategoryPage;