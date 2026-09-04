import {
  Section,
} from "../components/ui/Section";
import { Button } from "../components/ui/Button";
import { ArticleDisplay } from "../components/ArticleDisplay";
import {
  useAllArticles,
  useCommittees,
} from "../hooks/useApi";
import type { Article } from "../types";
import {
  Users,
  Calendar,
  Wrench,
  Handshake,
  ChartNoAxesCombined,
  BookOpen,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useState } from "react";

export default function Artical() {

      const { data: articles, isLoading, error } = useAllArticles();
  const {
    data: committees,
    isLoading: committeesLoading,
    error: committeesError, 
  } = useCommittees();

  const statistics = [
    { label: "Active Members", value: "250+", icon: Users },
    { label: "Events Organized", value: "50+", icon: Calendar },
    { label: "Technical Workshops", value: "30+", icon: Wrench },
    { label: "Industry Partnerships", value: "15+", icon: Handshake },
    {
      label: "Social Media Reach",
      value: "12,000+",
      icon: ChartNoAxesCombined,
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 3;

  // Filter articles to show only those
  const filteredArticles = Array.isArray(articles)
    ? articles.filter((article: Article) => article.categoryName !== "Events")
    : [];

  // Calculate pagination
  // const totalPages = articles? Math.ceil(articles.length / articlesPerPage): 0;
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  // const currentArticles = articles ? articles.slice(startIndex, endIndex) : [];
  const currentArticles = filteredArticles.slice(startIndex, endIndex);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getVisiblePages = (currentPage: number, totalPages: number) => {
    if (totalPages <= 5)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | string)[] = [];
    if (currentPage > 3) pages.push(1, "...");
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push("...", totalPages);
    return pages;
  };
  return (
    <Section id="articles" padding="xl" className="bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#000640] mb-4">
            Latest News & Articles
          </h2>
          <p className="text-lg text-[#3348B3] max-w-3xl mx-auto font-medium">
            Stay updated with the latest developments, events, and insights
            from our IEEE BNS community.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5A10A5] mx-auto"></div>
            <p className="text-gray-600 mt-4">
              Loading articles...
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600">
              Failed to load articles. Please try again later.
            </p>
          </div>
        ) : currentArticles.length > 0 ? (
          <>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {currentArticles.map((article: Article) => (
                <ArticleDisplay key={article.id} article={article} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="flex items-center"
                >
                  <ChevronLeft className="w-4 h-4 mr-0  md:mr-2" />
                  <span className="hidden md:inline">Previous</span>
                </Button>

                <div className="flex items-center space-x-2">
                  {getVisiblePages(currentPage, totalPages).map((page) => {
                    if (typeof page === "string") {
                      return (
                        <span key={page} className="px-2 text-gray-500">
                          ...
                        </span>
                      );
                    }
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                          currentPage === page
                            ? "bg-[#5A10A5] text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="flex items-center"
                >
                  <span className="hidden md:inline">Next</span>
                  <ChevronRight className="w-4 h-4 ml-0 md:ml-2" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              No articles available at the moment.
            </p>
          </div>
        )}
      </div>
    </Section>
  );
}