import { Calendar, ChevronRight, User } from "lucide-react";
import type { News } from "../types";

export function ArticleDetail({ article, onAuthorClick, onBack }: {
  article: News;
  onAuthorClick: (author: string) => void;
  onBack: () => void;
}) {
  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="mb-8 text-sm cursor-pointer font-semibold text-gray-600 hover:text-orange-500 transition-colors flex items-center space-x-2"
      >
        <ChevronRight size={16} className="rotate-180" />
        <span>Geri dön</span>
      </button>

      <article>
        <span className="inline-block px-3 py-1 bg-orange-500 text-white text-xs font-bold tracking-wider uppercase mb-4">
          {article.category}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
          {article.title}
        </h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-8 pb-8 border-b-2 border-gray-200">
          <span
            onClick={() => onAuthorClick(article.author)}
            className="font-semibold hover:text-orange-500 transition-colors cursor-pointer flex items-center space-x-2"
          >
            <User size={16} />
            <span>{article.author}</span>
          </span>
          <span className="text-gray-400">•</span>
          <span className="flex items-center space-x-2">
            <Calendar size={16} />
            <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </span>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 leading-relaxed mb-6 font-medium">
            {article.summary}
          </p>
          <div className="text-gray-800 leading-relaxed space-y-4">
            <p>
              {article.content}
            </p>
            <p>
              This is where the full article content would appear. In a production environment, this would be fetched from the API endpoint and could include multiple paragraphs, quotes, data, and detailed analysis.
            </p>
            <p>
              The article would continue with in-depth coverage, expert opinions, relevant statistics, and comprehensive information about the topic at hand. Journalists would provide context, background information, and multiple perspectives to give readers a complete understanding of the story.
            </p>
            <p>
              Additional sections might include interviews with key figures, analysis of implications, historical context, and forward-looking statements about potential developments in the story.
            </p>
          </div>
        </div>
      </article>

      <div className="mt-12 pt-8 border-t-2 border-gray-200">
        <h3 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">About the Author</h3>
        <button
          onClick={() => onAuthorClick(article.author)}
          className="text-left hover:text-orange-500 transition-colors group"
        >
          <p className="text-lg font-bold mb-2 group-hover:underline">{article.author}</p>
          <p className="text-gray-600 text-sm">Click to view author profile and articles</p>
        </button>
      </div>
    </div>
  );
}