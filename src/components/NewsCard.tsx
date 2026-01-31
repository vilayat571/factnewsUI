// components/NewsCard.tsx
import { Link } from "react-router-dom";
import type { News } from "../types";

interface NewsCardProps {
  news: News;
}

const NewsCard = ({ news }: NewsCardProps) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };



  return (
    <article className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-1">
      {/* Category Badge */}
      <div className="p-4 pb-2">
        <span className="inline-block bg-gray-900 text-white px-3 py-1 text-xs font-semibold uppercase rounded">
          {news.category}
        </span>
      </div>

      {/* Content */}
      <div className="px-4 pb-4">
        {/* Title */}
        <Link to={`/news/${news._id}`}>
          <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-1 group-hover:text-orange-500 transition-colors leading-tight">
            {news.title}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {news.description}
        </p>

        {/* Meta Info */}
        <div className="flex flex-col space-y-2 text-xs text-gray-500 mb-4">
          <div className="flex items-center space-x-2">
            <span className="truncate">{news.author}</span>
          </div>

          <div className="flex items-center space-x-2">
            <span>{formatDate(news.date)}</span>
          </div>
        </div>

        <Link to={`/news/${news._id}`}>
          <button className="w-full bg-black text-white py-2.5 px-4 rounded font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2 group-hover:bg-orange-500">
            <span className="text-sm">READ MORE</span>
          </button>
        </Link>
      </div>
    </article>
  );
};

export default NewsCard;