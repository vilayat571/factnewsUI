/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CATEGORIES, type News } from "../types";
import {
  Search,
  X,
  Menu,
  ChevronRight,
  Frown,
  Sparkles,
  TrendingUp,
  Flame,
  Globe,
  Briefcase,
  Trophy,
  Zap,
  Film,
  Cpu,
  BookmarkCheck,
  Eye,
  type LucideIcon,
} from "lucide-react";
import { API_ENDPOINT } from "../constants/urls";

// Icon mapping for each category
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "son-xeberler": TrendingUp,
  dunya: Globe,
  iqtisadiyyat: Briefcase,
  idman: Trophy,
  siyaset: Flame,
  texnologiya: Cpu,
  medeniyyet: Film,
  default: Zap,
};

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<News[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [savedCount, setSavedCount] = useState(0);
  const [readCount, setReadCount] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Get icon component for a category
  const getCategoryIcon = (categoryValue: string): LucideIcon => {
    return CATEGORY_ICONS[categoryValue] || CATEGORY_ICONS.default;
  };

  // Update saved and read counts
  useEffect(() => {
    const updateCounts = () => {
      const saved = JSON.parse(localStorage.getItem("savedNews") || "[]");
      setSavedCount(saved.length);
      
      const read = JSON.parse(localStorage.getItem("readNews") || "[]");
      setReadCount(read.length);
    };

    updateCounts();
    
    // Listen for storage changes
    window.addEventListener("storage", updateCounts);
    // Custom events for same-tab updates
    window.addEventListener("savedNewsUpdated", updateCounts);
    window.addEventListener("readNewsUpdated", updateCounts);

    return () => {
      window.removeEventListener("storage", updateCounts);
      window.removeEventListener("savedNewsUpdated", updateCounts);
      window.removeEventListener("readNewsUpdated", updateCounts);
    };
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      { threshold: 0.1 },
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
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
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
        `${API_ENDPOINT}/news?title=${searchQuery}&limit=6&page=${pageNum}`,
      );
      const data = await res.json();

      if (data.news.length > 0) {
        setSearchResults(
          pageNum === 1 ? data.news : [...searchResults, ...data.news],
        );
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
      <nav
        className={`
          bg-black
          text-white sticky top-0 z-20 
          transition-all duration-300
          ${scrolled ? "shadow-2xl backdrop-blur-lg bg-opacity-95" : "shadow-lg"}
        `}
      >
        {/* Animated top border */}
        <div className="h-0.5 bg-linear-to-r from-transparent via-orange-500 to-transparent animate-pulse"></div>

        <div className="w-9/10  mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Enhanced Logo */}
            <Link
              to="/"
              className="flex font-light items-center group relative cursor-pointer"
            >
              {/* Glow effect */}
              <div className="absolute -inset-3 bg-linear-to-r from-orange-600 via-red-500 to-orange-600 rounded-xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500"></div>

              {/* Logo container */}
              <div className="relative bg-linear-to-r from-gray-900 to-black px-4 py-2 rounded-xl border border-gray-800 group-hover:border-orange-500 transition-all duration-300 shadow-lg group-hover:shadow-orange-500/20">
                <p className="text-3xl md:text-4xl flex items-center tracking-widest gap-1 relative">
                  {/* "fact" part */}
                  <span className="font-black tracking-wide bg-linear-to-br from-white via-gray-100 to-gray-300 bg-clip-text text-transparent drop-shadow-lg">
                    fact
                  </span>

                  {/* Separator */}
                  <span className="w-0.75 h-8 bg-linear-to-b from-orange-500 to-red-500 rounded-full mx-0.5 group-hover:scale-y-110 transition-transform duration-300"></span>

                  {/* "news" part */}
                  <span className="font-black tracking-wide bg-linear-to-br from-orange-500 via-orange-400 to-red-500 bg-clip-text text-transparent drop-shadow-lg animate-gradient flex items-center">
                    news
                  </span>

                  {/* Sparkle effect */}
                  <Sparkles className="w-5 h-5 text-orange-500 ml-2 opacity-0 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-300 drop-shadow-lg" />
                </p>

                {/* Subtitle */}
                <div className="absolute -bottom-0.5 right-2 text-[10px] font-bold text-orange-500 opacity-60 uppercase tracking-wider">
                  Son Xəbərlər
                </div>
              </div>
            </Link>

            {/* Desktop Navigation with enhanced styling and icons */}
            <div className="hidden md:flex items-center space-x-2">
              {CATEGORIES.map((category, index) => {
                const isActive =
                  window.location.pathname === `/category/${category.value}`;
                const CategoryIcon = getCategoryIcon(category.value);

                return (
                  <Link
                    key={category.value}
                    to={`/category/${category.value}`}
                    className={`
                      relative px-5 py-3 text-base font-semibold
                      rounded-xl overflow-hidden
                      transition-all duration-300
                      hover:text-white cursor-pointer
                      group
                      ${isActive ? "text-white bg-linear-to-r from-orange-600 to-orange-500" : ""}
                    `}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Background gradient on hover (only if not active) */}
                    {!isActive && (
                      <span className="absolute inset-0 bg-linear-to-r from-orange-600 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-xl"></span>
                    )}

                    {/* Border accent */}
                    <span
                      className={`
                      absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-orange-500 to-red-500
                      ${isActive ? "scale-x-100" : "transform scale-x-0 group-hover:scale-x-100"}
                      transition-transform duration-300
                    `}
                    ></span>

                    <span className="relative z-10 flex items-center gap-2">
                      <CategoryIcon
                        className={`w-4 h-4 transition-all duration-300 ${
                          isActive
                            ? "text-white"
                            : "text-orange-500 group-hover:text-white group-hover:scale-110"
                        }`}
                      />
                      {category.name}
                    </span>

                    {/* Active indicator dot */}
                    {isActive && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    )}
                  </Link>
                );
              })}

              {/* Saved News Link */}
              <Link
                to="/saved"
                className={`
                  relative px-5 py-3 text-base font-semibold
                  rounded-xl overflow-hidden
                  transition-all duration-300
                  hover:text-white cursor-pointer
                  group
                  ${window.location.pathname === "/saved" ? "text-white bg-linear-to-r from-orange-600 to-orange-500" : ""}
                `}
              >
                {window.location.pathname !== "/saved" && (
                  <span className="absolute inset-0 bg-linear-to-r from-orange-600 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-xl"></span>
                )}

                <span
                  className={`
                  absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-orange-500 to-red-500
                  ${window.location.pathname === "/saved" ? "scale-x-100" : "transform scale-x-0 group-hover:scale-x-100"}
                  transition-transform duration-300
                `}
                ></span>

                <span className="relative z-10 flex items-center gap-2">
                  <BookmarkCheck
                    className={`w-4 h-4 transition-all duration-300 ${
                      window.location.pathname === "/saved"
                        ? "text-white"
                        : "text-orange-500 group-hover:text-white group-hover:scale-110"
                    }`}
                  />
                  Saxlanılanlar
                  {savedCount > 0 && (
                    <span className="ml-1 px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                      {savedCount}
                    </span>
                  )}
                </span>

                {window.location.pathname === "/saved" && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                )}
              </Link>

              {/* Read News Link */}
              <Link
                to="/read"
                className={`
                  relative px-5 py-3 text-base font-semibold
                  rounded-xl overflow-hidden
                  transition-all duration-300
                  hover:text-white cursor-pointer
                  group
                  ${window.location.pathname === "/read" ? "text-white bg-linear-to-r from-blue-600 to-blue-500" : ""}
                `}
              >
                {window.location.pathname !== "/read" && (
                  <span className="absolute inset-0 bg-linear-to-r from-blue-600 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-xl"></span>
                )}

                <span
                  className={`
                  absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-blue-500 to-indigo-500
                  ${window.location.pathname === "/read" ? "scale-x-100" : "transform scale-x-0 group-hover:scale-x-100"}
                  transition-transform duration-300
                `}
                ></span>

                <span className="relative z-10 flex items-center gap-2">
                  <Eye
                    className={`w-4 h-4 transition-all duration-300 ${
                      window.location.pathname === "/read"
                        ? "text-white"
                        : "text-blue-500 group-hover:text-white group-hover:scale-110"
                    }`}
                  />
                  Oxunmuşlar
                  {readCount > 0 && (
                    <span className="ml-1 px-2 py-0.5 bg-blue-500 text-white text-xs font-bold rounded-full">
                      {readCount}
                    </span>
                  )}
                </span>

                {window.location.pathname === "/read" && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                )}
              </Link>
            </div>

            {/* Search Icon + Mobile Menu Button */}
            <div className="flex items-center space-x-2">
              {/* Enhanced Search Button */}
              <button
                onClick={openSearchModal}
                className="
                  relative p-2.5 rounded-lg
                  bg-linear-to-r from-gray-800 to-gray-900
                  hover:from-orange-600 hover:to-orange-500
                  transition-all duration-300
                  group overflow-hidden cursor-pointer
                "
                aria-label="Search"
              >
                <span className="absolute inset-0 bg-linear-to-r from-orange-400 to-red-500 opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300"></span>
                <Search className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform duration-300 cursor-pointer" />
              </button>

              {/* Enhanced Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="
                  md:hidden relative p-2.5 rounded-lg
                  bg-linear-to-r from-gray-800 to-gray-900
                  hover:from-orange-600 hover:to-orange-500
                  transition-all duration-300
                  group overflow-hidden cursor-pointer
                "
                aria-label="Menu"
              >
                <span className="absolute inset-0 bg-linear-to-r from-orange-400 to-red-500 opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300"></span>
                {showMobileMenu ? (
                  <X className="w-6 h-6 relative z-10 group-hover:rotate-90 transition-transform duration-300 cursor-pointer" />
                ) : (
                  <Menu className="w-6 h-6 relative z-10 group-hover:scale-110 transition-transform duration-300 cursor-pointer" />
                )}
              </button>
            </div>
          </div>

          {/* Enhanced Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden mt-4 border-t border-gray-800 bg-linear-to-b from-black to-gray-950 rounded-b-2xl overflow-hidden animate-slideDown">
              {/* Mobile Search Bar */}
              <div className="px-3 py-4 border-b border-gray-800">
                <button
                  onClick={() => {
                    setShowMobileMenu(false);
                    openSearchModal();
                  }}
                  className="
                    w-full flex items-center space-x-3
                    bg-linear-to-r from-gray-900 to-gray-800
                    rounded-xl px-4 py-3.5
                    hover:from-orange-900 hover:to-orange-800
                    transition-all duration-300
                    group border border-gray-700 cursor-pointer
                  "
                >
                  <Search className="w-4 h-4 text-gray-400 group-hover:text-orange-400 transition-colors cursor-pointer" />
                  <span className="text-gray-400 group-hover:text-orange-300 text-sm transition-colors">
                    Xəbər axtar...
                  </span>
                </button>
              </div>

              {/* Enhanced Category Links with Icons */}
              <div className="py-3 px-3 space-y-2">
                {CATEGORIES.map((category, index) => {
                  const isActive =
                    window.location.pathname === `/category/${category.value}`;
                  const CategoryIcon = getCategoryIcon(category.value);

                  return (
                    <Link
                      key={category.value}
                      to={`/category/${category.value}`}
                      onClick={() => setShowMobileMenu(false)}
                      className={`
                        flex items-center justify-between px-4 py-3.5
                        rounded-xl
                        ${
                          isActive
                            ? "bg-linear-to-r from-orange-600 to-orange-500 border-orange-500"
                            : "bg-linear-to-r from-gray-900 to-gray-800 border-gray-800 hover:from-orange-600 hover:to-orange-500 hover:border-orange-500"
                        }
                        transition-all duration-300
                        group border cursor-pointer
                        ${isActive ? "shadow-lg shadow-orange-500/20" : "hover:shadow-lg hover:shadow-orange-500/20"}
                      `}
                      style={{
                        animation: `slideInRight 0.3s ease-out ${index * 0.05}s both`,
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <CategoryIcon
                          className={`
                          w-5 h-5 transition-all duration-300
                          ${
                            isActive
                              ? "text-white"
                              : "text-orange-500 group-hover:text-white"
                          }
                        `}
                        />
                        <span
                          className={`text-sm font-medium transition-colors ${isActive ? "text-white" : "text-gray-200 group-hover:text-white"}`}
                        >
                          {category.name}
                        </span>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 transition-all duration-300 ${isActive ? "text-white translate-x-1" : "text-gray-600 group-hover:text-white group-hover:translate-x-1"}`}
                      />
                    </Link>
                  );
                })}

                {/* Saved News Mobile Link */}
                <Link
                  to="/saved"
                  onClick={() => setShowMobileMenu(false)}
                  className={`
                    flex items-center justify-between px-4 py-3.5
                    rounded-xl
                    ${
                      window.location.pathname === "/saved"
                        ? "bg-linear-to-r from-orange-600 to-orange-500 border-orange-500"
                        : "bg-linear-to-r from-gray-900 to-gray-800 border-gray-800 hover:from-orange-600 hover:to-orange-500 hover:border-orange-500"
                    }
                    transition-all duration-300
                    group border cursor-pointer
                    ${window.location.pathname === "/saved" ? "shadow-lg shadow-orange-500/20" : "hover:shadow-lg hover:shadow-orange-500/20"}
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <BookmarkCheck
                      className={`
                      w-5 h-5 transition-all duration-300
                      ${
                        window.location.pathname === "/saved"
                          ? "text-white"
                          : "text-orange-500 group-hover:text-white"
                      }
                    `}
                    />
                    <span
                      className={`text-sm font-medium transition-colors ${window.location.pathname === "/saved" ? "text-white" : "text-gray-200 group-hover:text-white"}`}
                    >
                      Saxlanılanlar
                    </span>
                    {savedCount > 0 && (
                      <span className="ml-1 px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                        {savedCount}
                      </span>
                    )}
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-all duration-300 ${window.location.pathname === "/saved" ? "text-white translate-x-1" : "text-gray-600 group-hover:text-white group-hover:translate-x-1"}`}
                  />
                </Link>

                {/* Read News Mobile Link */}
                <Link
                  to="/read"
                  onClick={() => setShowMobileMenu(false)}
                  className={`
                    flex items-center justify-between px-4 py-3.5
                    rounded-xl
                    ${
                      window.location.pathname === "/read"
                        ? "bg-linear-to-r from-blue-600 to-blue-500 border-blue-500"
                        : "bg-linear-to-r from-gray-900 to-gray-800 border-gray-800 hover:from-blue-600 hover:to-blue-500 hover:border-blue-500"
                    }
                    transition-all duration-300
                    group border cursor-pointer
                    ${window.location.pathname === "/read" ? "shadow-lg shadow-blue-500/20" : "hover:shadow-lg hover:shadow-blue-500/20"}
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <Eye
                      className={`
                      w-5 h-5 transition-all duration-300
                      ${
                        window.location.pathname === "/read"
                          ? "text-white"
                          : "text-blue-500 group-hover:text-white"
                      }
                    `}
                    />
                    <span
                      className={`text-sm font-medium transition-colors ${window.location.pathname === "/read" ? "text-white" : "text-gray-200 group-hover:text-white"}`}
                    >
                      Oxunmuşlar
                    </span>
                    {readCount > 0 && (
                      <span className="ml-1 px-2 py-0.5 bg-blue-500 text-white text-xs font-bold rounded-full">
                        {readCount}
                      </span>
                    )}
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-all duration-300 ${window.location.pathname === "/read" ? "text-white translate-x-1" : "text-gray-600 group-hover:text-white group-hover:translate-x-1"}`}
                  />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced animated bottom border */}
        <div className="h-1 bg-linear-to-r from-orange-600 via-orange-500 to-red-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
        </div>
      </nav>

      {/* Enhanced Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center px-4 sm:px-6 pt-16 sm:pt-20 animate-fadeIn">
          {/* Enhanced Background with better opacity */}
          <div className="absolute inset-0 bg-black opacity-60"></div>

          {/* Search Modal Content */}
          <div
            ref={searchRef}
            className="
              bg-white
              relative z-10 rounded-2xl shadow-2xl
              w-full sm:w-[90%] md:w-[70%] lg:w-[50%] xl:w-[45%]
              max-h-[85vh] sm:max-h-[80vh]
              overflow-hidden flex flex-col
              border border-orange-200
              animate-scaleIn
            "
          >
            {/* Search Header */}
            <div className="p-5 border-b border-orange-200 bg-linear-to-r from-orange-50 via-white to-orange-50">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-linear-to-r from-orange-500 to-red-500 rounded-lg">
                  <Search className="w-5 h-5 text-white" />
                </div>
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
                  className="
                    flex-1 outline-none text-gray-900 text-lg
                    bg-transparent placeholder-gray-400 min-w-0
                    font-medium
                  "
                />
                <button
                  onClick={() => setShowSearchModal(false)}
                  className="
                    p-2 hover:bg-orange-100 rounded-lg
                    transition-all duration-200
                    group cursor-pointer
                  "
                >
                  <X className="w-5 h-5 text-gray-600 group-hover:text-orange-600 group-hover:rotate-90 transition-all duration-300 cursor-pointer" />
                </button>
              </div>
            </div>

            {/* Search Results */}
            <div className="flex-1 overflow-y-auto bg-white">
              {isSearching && page === 1 ? (
                <div className="flex justify-center items-center py-16">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-linear-to-r from-orange-500 to-red-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-3 h-3 bg-linear-to-r from-orange-500 to-red-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-3 h-3 bg-linear-to-r from-orange-500 to-red-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="p-3">
                  <p className="text-xs text-gray-500 px-3 py-2 font-semibold uppercase flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    Ən azı {searchResults.length} nəticə tapıldı
                  </p>
                  {searchResults.map((result, index) => (
                    <button
                      key={result._id}
                      onClick={() => handleResultClick(result._id)}
                      className="
                        w-full text-left px-4 py-4
                        hover:bg-orange-50
                        rounded-xl transition-all duration-300
                        border-b border-gray-100 last:border-b-0
                        group cursor-pointer
                        hover:shadow-md
                      "
                      style={{
                        animation: `slideInUp 0.3s ease-out ${index * 0.05}s both`,
                      }}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <span
                              className="
                              text-xs bg-linear-to-r from-orange-500 to-red-500
                              text-white px-3 py-1 rounded-full uppercase font-bold
                              shadow-md group-hover:shadow-lg
                              transition-shadow duration-300
                            "
                            >
                              {result.category}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-orange-600 transition-colors">
                            {result.title}
                          </h4>
                          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                            {result.description || stripHtml(result.body || "")}
                          </p>
                          <p className="text-xs text-gray-400 mt-2 font-medium">
                            {result.author}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}

                  {/* Load More Indicator */}
                  {hasMore && (
                    <div ref={observerRef} className="flex justify-center py-6">
                      {isSearching && (
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-linear-to-r from-orange-500 to-red-500 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-linear-to-r from-orange-500 to-red-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-linear-to-r from-orange-500 to-red-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : searchQuery.trim() && !isSearching ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="p-4 bg-orange-100 rounded-full mb-4">
                    <Frown className="w-16 h-16 text-orange-500" />
                  </div>
                  <p className="text-gray-700 font-bold text-lg">
                    Xəbər tapılmadı
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Başqa açar sözlər sınayın
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="p-4 bg-linear-to-r from-orange-100 to-red-100 rounded-full mb-4 animate-pulse">
                    <Search className="w-16 h-16 text-orange-500" />
                  </div>
                  <p className="text-gray-600 font-medium">
                    Xəbər axtarmaq üçün yazın
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
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

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </>
  );
};

export default Navbar;