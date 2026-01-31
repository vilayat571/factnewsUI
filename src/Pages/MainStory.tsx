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
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-1 h-6 bg-orange-500"></div>
        <h2 className="text-gray-500 text-sm font-semibold uppercase">
          Ən son xəbərlər
        </h2>
      </div>

      <Link to={`/news/${news._id}`}>
        <div className="bg-[#2c2c2c] text-white rounded-lg w-full overflow-hidden hover:shadow-2xl transition-shadow duration-300">
          <div className="p-8">
            <span className="inline-block line-clamp-1 bg-orange-500 text-white px-3 py-1 text-xs font-semibold uppercase rounded mb-4">
              {news.category}
            </span>

            <h1 className="text-3xl font-bold mb-4 leading-tight">
              {news.title}
            </h1>

            <div className="flex items-center space-x-4 text-sm">
              <span className="underline">{news.author}</span>
              <span>•</span>
              <span>{formatDate(news.date)}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MainStory;