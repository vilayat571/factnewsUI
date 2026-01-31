import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CATEGORIES, type News } from "../types";
import { Search, X, Menu } from "lucide-react";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<News[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const searchRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim().length > 0) {
        performSearch(1);
      } else {
        setSearchResults([]);
        setPage(1);
        setHasMore(true);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Infinite scroll observer
  useEffect(() => {
    if (!hasMore || isSearching || !showSearchModal) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && searchQuery.trim()) {
          loadMoreResults();
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
  }, [hasMore, isSearching, page, showSearchModal]);

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchModal(false);
      }
    };

    if (showSearchModal) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [showSearchModal]);

  const performSearch = async (pageNum: number) => {
    setIsSearching(true);
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/news?title=${searchQuery}&limit=6&page=${pageNum}`
      );
      const data = await res.json();

      if (data.news.length > 0) {
        setSearchResults(pageNum === 1 ? data.news : [...searchResults, ...data.news]);
        if (data.news.length < 6) {
          setHasMore(false);
        }
      } else {
        if (pageNum === 1) setSearchResults([]);
        setHasMore(false);
      }
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const loadMoreResults = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    performSearch(nextPage);
  };

  const handleResultClick = (newsId: string) => {
    setShowSearchModal(false);
    setSearchQuery("");
    setSearchResults([]);
    setPage(1);
    setHasMore(true);
    navigate(`/news/${newsId}`);
  };

  const openSearchModal = () => {
    setShowSearchModal(true);
    setSearchQuery("");
    setSearchResults([]);
    setPage(1);
    setHasMore(true);
  };

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, "");
  };

  return (
    <>
      <nav className="bg-black text-white sticky top-0 z-20 shadow-lg">
        <div className="w-full xl:w-[80%] mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <span className="text-2xl font-bold tracking-tight">
                THE<span className="text-orange-500">WIRE</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {CATEGORIES.map((category) => (
                <Link
                  key={category.value}
                  to={`/category/${category.value}`}
                  className="px-4 py-2 rounded-md hover:bg-orange-500 hover:text-white transition-all duration-200"
                >
                  {category.name}
                </Link>
              ))}
            </div>

            {/* Search Icon */}
            <div className="flex items-center space-x-2">
              <button
                onClick={openSearchModal}
                className="p-2 hover:bg-orange-500 rounded-md transition-all duration-200"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 hover:bg-orange-500 rounded-md transition-all duration-200"
                aria-label="Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden mt-3 pt-3 border-t border-gray-800">
              <div className="flex flex-col space-y-1">
                {CATEGORIES.map((category) => (
                  <Link
                    key={category.value}
                    to={`/category/${category.value}`}
                    onClick={() => setShowMobileMenu(false)}
                    className="px-3 py-2 rounded-md hover:bg-orange-500 transition-all duration-200"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Orange Line */}
        <div className="h-1 bg-linear-to-r from-orange-600 via-orange-500 to-orange-600"></div>
      </nav>

{/* Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-20 px-4">
          {/* Black Background with Opacity */}
          <div className="absolute inset-0 bg-black opacity-60"></div>

          {/* Search Modal Content */}
          <div
            ref={searchRef}
            className="bg-white relative top-12 z-10 w-1/2 rounded-xl shadow-2xl min-h-[80vh] max-h-[80vh] overflow-hidden flex flex-col animate-fadeIn"
          >
            {/* Search Header */}
            <div className="p-4 border-b border-gray-200 bg-linear-to-r from-orange-50 to-white">
              <div className="flex items-center space-x-3">
                <Search className="w-5 h-5 text-orange-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(1);
                    setHasMore(true);
                  }}
                  placeholder="Xəbər axtar..."
                  autoFocus
                  className="flex-1 outline-none text-gray-900 text-lg bg-transparent placeholder-gray-400"
                />
                <button
                  onClick={() => setShowSearchModal(false)}
                  className="p-2 hover:bg-orange-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Search Results */}
            <div className="flex-1 overflow-y-auto">
              {isSearching && page === 1 ? (
                <div className="flex justify-center items-center py-12">
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
                </div>
              ) : searchResults.length > 0 ? (
                <div className="p-2">
                  <p className="text-xs text-gray-500 px-3 py-2 font-semibold uppercase">
                   Ən azı {searchResults.length} nəticə tapıldı
                  </p>
                  {searchResults.map((result) => (
                    <button
                      key={result._id}
                      onClick={() => handleResultClick(result._id)}
                      className="w-full text-left px-3 py-3 hover:bg-orange-50 rounded-lg transition-colors border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded uppercase font-semibold">
                              {result.category}
                            </span>
                          </div>
                          <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">
                            {result.title}
                          </h4>
                          <p className="text-xs text-gray-600 line-clamp-2">
                            {result.description || stripHtml(result.body || "")}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {result.author}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}

                  {/* Load More Indicator */}
                  {hasMore && (
                    <div ref={observerRef} className="flex justify-center py-4">
                      {isSearching && (
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
                </div>
              ) : searchQuery.trim() && !isSearching ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <svg
                    className="w-16 h-16 text-gray-400 mb-4"
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
                  <p className="text-gray-600 font-medium">Xəbər tapılmadı</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Başqa açar sözlər sınayın
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <Search className="w-16 h-16 text-orange-300 mb-4" />
                  <p className="text-gray-500">Xəbər axtarmaq üçün yazın</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;