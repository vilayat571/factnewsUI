// components/NewsCard.tsx
import { Link } from "react-router-dom";
import { User, Calendar, MoveUpRight } from "lucide-react";
import type { News } from "../types";

interface NewsCardProps {
  news: News;
}

const NewsCard = ({ news }: NewsCardProps) => {
  const formatDate = (date: string) => {
    const monthNames = [
      "Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun",
      "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"
    ];
    
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = monthNames[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    
    return `${day} ${month}, ${year}`;
  };

  return (
    <article className="relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden group transform hover:-translate-y-2">
      {/* Decorative gradient overlay on hover */}
      <div className="absolute inset-0 bg-linear-to-br from-orange-50/0 via-orange-50/0 to-orange-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Subtle border ring */}
      <div className="absolute inset-0 rounded-xl ring-1 ring-gray-100 group-hover:ring-orange-200 transition-all duration-500"></div>

      <div className="relative">
        {/* Category Badge */}
        <div className="p-5 pb-3">
          <span className="inline-block bg-linear-to-r from-gray-900 to-gray-800 text-white px-3 py-1 text-xs font-bold 
          uppercase rounded-md shadow-sm group-hover:shadow-md group-hover:from-orange-500 group-hover:to-orange-600 transition-all duration-300">
            {news.category}
          </span>
        </div>

        {/* Content */}
        <div className="px-5 pb-5">
          {/* Title */}
          <Link to={`/news/${news._id}`}>
            <h3 className="text-lg font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-orange-500 transition-colors duration-300 leading-tight min-h-14">
              {news.title}
            </h3>
          </Link>

          {/* Meta Info */}
          <div className="flex items-center justify-between text-xs mb-5 pb-4 border-b border-gray-100 group-hover:border-orange-100 transition-colors duration-300">
            <div className="flex items-center space-x-2 text-gray-600">
              <User className="w-4 h-4 text-orange-500" />
              <span className="font-medium truncate">{news.author}</span>
            </div>

            <div className="flex items-center space-x-2 text-gray-500">
              <Calendar className="w-4 h-4" />
              <span className="font-medium">{formatDate(news.date)}</span>
            </div>
          </div>

          {/* Read More Button */}
          <Link to={`/news/${news._id}`}>
            <button className="relative inline-flex bg-linear-to-r from-gray-900 to-gray-800 text-white py-2 px-4 rounded-lg font-bold
             hover:from-orange-500 hover:to-orange-600 transition-all duration-300 items-center justify-center space-x-2 
             shadow-sm hover:shadow-lg group/btn overflow-hidden">
              {/* Animated background shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full
               transition-transform duration-1000 bg-linear-to-r from-transparent via-white/20 to-transparent"></div>
              
              <span className="text-sm tracking-wide relative z-10">OXU</span>
              <MoveUpRight className="w-4 h-4 relative z-10 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
            </button>
          </Link>
        </div>
      </div>

      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-bl from-orange-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    </article>
  );
};

export default NewsCard;