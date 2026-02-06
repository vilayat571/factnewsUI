import { Link } from "react-router-dom";
import type { News } from "../types";

interface MainStoryProps {
  news: News;
}

const MainStory = ({ news }: MainStoryProps) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="mb-8">
      {/* Section Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-1 h-7 bg-linear-to-b from-orange-500 to-orange-600 rounded-full"></div>
        <h2 className="text-gray-600 text-sm font-bold uppercase tracking-wide">
          Ən son xəbərlər
        </h2>
      </div>

      {/* Main Story Card */}
      <Link to={`/news/${news._id}`} className="block group">
        <div className="relative bg-black text-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-orange-500/0 via-orange-500/0 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Subtle animated border effect */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-white/5 group-hover:ring-orange-500/30 transition-all duration-500"></div>

          <div className="relative p-8 md:p-10">
            {/* Category Badge */}
            <div className="inline-block mb-5">
              <span className="bg-linear-to-r from-orange-500 to-orange-600 text-white px-4 py-1.5 text-xs font-bold uppercase rounded-full shadow-md group-hover:shadow-orange-500/50 transition-shadow duration-300">
                {news.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold mb-6 leading-tight group-hover:text-orange-50 transition-colors duration-300">
              {news.title}
            </h1>

            {/* Meta Information */}
            <div className="flex items-center space-x-4 text-sm text-gray-300">
              <span className="font-medium text-orange-400 group-hover:text-orange-300 transition-colors duration-300">
                {news.author}
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-400">{formatDate(news.date)}</span>
            </div>

            {/* Decorative corner accent */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-linear-to-tl from-orange-500/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </div>

          {/* Bottom accent line */}
          <div className="h-1 bg-linear-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </Link>
    </div>
  );
};

export default MainStory;
