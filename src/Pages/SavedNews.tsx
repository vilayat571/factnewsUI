import { useState, useEffect } from "react";

import { BookmarkCheck, Trash2, AlertCircle } from "lucide-react";
import type { News } from "../types";
import Layout from "../layout/Layout";
import NewsCard from "../components/NewsCard";

const SavedNews = () => {
  const [savedNews, setSavedNews] = useState<News[]>([]);
  const [showDeleteAll, setShowDeleteAll] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    loadSavedNews();
  }, []);

  const loadSavedNews = () => {
    const saved = JSON.parse(localStorage.getItem("savedNews") || "[]");
    setSavedNews(saved);
  };

  const removeNews = (newsId: string) => {
    const filtered = savedNews.filter((item) => item._id !== newsId);
    localStorage.setItem("savedNews", JSON.stringify(filtered));
    setSavedNews(filtered);
  };

  const clearAllSaved = () => {
    localStorage.setItem("savedNews", JSON.stringify([]));
    setSavedNews([]);
    setShowDeleteAll(false);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Header Section */}
          <div className="mb-12 animate-slideInDown">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 animate-fadeIn">
              <span className="hover:text-orange-500 transition-colors cursor-pointer">
                Ana səhifə
              </span>
              <span>/</span>
              <span className="text-gray-900 font-medium">
                Yadda saxlanılanlar
              </span>
            </div>

            {/* Title Card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 p-8 shadow-2xl">
              {/* Decorative background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                    backgroundSize: "40px 40px",
                  }}
                ></div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-white/20 backdrop-blur-sm rounded-xl text-white shadow-lg">
                      <BookmarkCheck className="w-8 h-8" />
                    </div>
                    <div>
                      <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                        Yadda Saxlanılanlar
                      </h1>
                      <p className="text-white/90 text-lg">
                        {savedNews.length} xəbər yadda saxlanılıb
                      </p>
                    </div>
                  </div>

                  {/* Clear All Button */}
                  {savedNews.length > 0 && (
                    <button
                      onClick={() => setShowDeleteAll(true)}
                      className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl group"
                    >
                      <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span className="font-semibold">Hamısını sil</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute -top-6 -left-6 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            </div>
          </div>

          {/* News Grid or Empty State */}
          {savedNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
              {savedNews.map((item, index) => (
                <div
                  key={item._id}
                  className="relative animate-fadeInUp group"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: "both",
                  }}
                >
                  <NewsCard news={item} />
                  
                  {/* Remove Button Overlay */}
                  <button
                    onClick={() => removeNews(item._id)}
                    className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg z-10"
                    title="Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 animate-fadeIn">
              <div className="inline-flex items-center justify-center w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200">
                <BookmarkCheck className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Hələ heç bir xəbər yoxdur
              </h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                Xəbərləri yadda saxlamaq üçün xəbər səhifəsindəki yadda saxla
                düyməsini klikləyin
              </p>
              <a
                href="/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 font-semibold"
              >
                Ana səhifəyə keç
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Delete All Confirmation Modal */}
      {showDeleteAll && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-scaleIn">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-red-100">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Əminsiniz?
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Bütün yadda saxlanılan xəbərlər silinəcək. Bu əməliyyatı geri qaytarmaq mümkün deyil.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteAll(false)}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 font-semibold"
              >
                Ləğv et
              </button>
              <button
                onClick={clearAllSaved}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300 font-semibold"
              >
                Hamısını sil
              </button>
            </div>
          </div>
        </div>
      )}

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

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
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

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </Layout>
  );
};

export default SavedNews;