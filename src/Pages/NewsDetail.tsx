import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { News } from "../types";
import Layout from "../layout/Layout";
import { Type } from "lucide-react";
import NewsCard from "../components/NewsCard";
import { API_ENDPOINT } from "../constants/urls";
import { fetchNewsById } from "../utils/api";
import 'react-quill-new/dist/quill.snow.css';
import 'quill/dist/quill.snow.css';

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [news, setNews] = useState<News | null>(null);
  const [relatedNews, setRelatedNews] = useState<News[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    if (!id) return;

    const loadNewsDetail = async () => {
      setLoading(true);
      try {
        const data = await fetchNewsById(id);
        setNews(data.news);

        // Fetch related news using smart algorithm
        if (data.news) {
          await fetchRelatedNews(data.news);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load news. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadNewsDetail();
  }, [id]);

  const fetchRelatedNews = async (currentNews: News) => {
    try {
      // Extract keywords from title (first 3 meaningful words)
      const titleWords = currentNews.title
        .toLowerCase()
        .split(" ")
        .filter((word) => word.length > 3) // Only words longer than 3 chars
        .slice(0, 3);

      let related: News[] = [];

      // Strategy 1: Try to find news with similar title words
      if (titleWords.length > 0) {
        const searchQuery = titleWords[0]; // Use first keyword
        const searchRes = await fetch(
           `${API_ENDPOINT}/news?title=${encodeURIComponent(searchQuery)}&limit=10`
        );
        const searchData = await searchRes.json();
        related = searchData.news.filter((item: News) => item._id !== id);
      }

      // Strategy 2: If not enough results, get from same category but random order
      if (related.length < 3) {
        const categoryRes = await fetch(
           `${API_ENDPOINT}/news?category=${currentNews.category}&limit=10`
        );
        const categoryData = await categoryRes.json();
        
        // Filter out current news and shuffle
        const filtered = categoryData.news
          .filter((item: News) => item._id !== id)
          .sort(() => Math.random() - 0.5); // Shuffle randomly
        
        // Merge and remove duplicates
        const existingIds = new Set(related.map((item) => item._id));
        const additional = filtered.filter(
          (item: News) => !existingIds.has(item._id)
        );
        
        related = [...related, ...additional];
      }

      // Take only first 3
      setRelatedNews(related.slice(0, 3));
    } catch (err) {
      console.error("Failed to fetch related news:", err);
      // Fallback: just show empty
      setRelatedNews([]);
    }
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const increaseFontSize = () => {
    setFontSize((prev) => Math.min(prev + 2, 24));
  };

  const decreaseFontSize = () => {
    setFontSize((prev) => Math.max(prev - 2, 12));
  };

  const resetFontSize = () => {
    setFontSize(16);
  };

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"></div>
              <div
                className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
            <p className="text-gray-600 text-lg">Xəbər yüklənir...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!news) {
    return null;
  }

  return (
    <Layout>
      <div className="">
        <div className="px-5">
          <button
            onClick={() => navigate(-1)}
            className="mt-5  mb-12 border bg-black cursor-pointer text-white flex text-lg px-5 py-3 rounded gap-2 items-center justify-center hover:bg-gray-800 transition-colors"
          >
            <span>Geri</span>
          </button>

          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-white text-black p-8">
              <span className="inline-block bg-orange-500 px-3 py-1 text-xs font-semibold uppercase rounded mb-4">
                {news.category}
              </span>
              <h1 className="text-4xl font-bold mb-4">{news.title}</h1>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="font-medium">{news.author}</span>
                  <span>•</span>
                  <span>{formatDate(news.date)}</span>
                </div>

                {/* Font Size Controls */}
                <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-2">
                  <Type className="w-4 h-4 text-gray-600" />
                  <button
                    onClick={decreaseFontSize}
                    className="px-3 cursor-pointer  py-1 bg-white rounded hover:bg-gray-200 transition-colors text-sm font-medium"
                    title="Mətn ölçüsünü azalt"
                  >
                    A-
                  </button>
                  <button
                    onClick={resetFontSize}
                    className="px-3 py-1 cursor-pointer bg-white rounded hover:bg-gray-200 transition-colors text-sm font-medium"
                    title="Normal mətn ölçüsü"
                  >
                    A
                  </button>
                  <button
                    onClick={increaseFontSize}
                    className="px-3 cursor-pointer  py-1 bg-white rounded hover:bg-gray-200 transition-colors text-sm font-medium"
                    title="Mətn ölçüsünü artır"
                  >
                    A+
                  </button>
                </div>
              </div>
            </div>

            {/* Full HTML content with Quill styling */}
         <div className="p-8">
              <div
                className="ql-editor"
                dangerouslySetInnerHTML={{ __html: news.body }}
                style={{
                  padding: 0,
                  minHeight: "auto",
                  fontSize: `${fontSize}px`,
                }}
              />
            </div>
          </article>

          {/* Related News Section */}
          {relatedNews.length > 0 && (
            <section className="mt-12 p-4">
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Oxşar Xəbərlər
                </h2>
                <div className="h-1 flex-1 bg-gradient-to-r from-orange-500 to-transparent ml-4"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedNews.map((item) => (
                  <NewsCard key={item._id} news={item} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default NewsDetail;