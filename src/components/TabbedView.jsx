import { useState, useMemo } from "react";
import MovieList from "./MovieList";
import { FaFilm, FaTv } from "react-icons/fa";

const TabbedView = ({ movies, isLoading, loadMore }) => {
  const [activeTab, setActiveTab] = useState("movie");
  const [searchTerm, setSearchTerm] = useState("");

  const handleTabChange = (type) => {
    setActiveTab(type);
    setSearchTerm("");
  };

  const filteredMovies = useMemo(() => {
    return movies
      .filter((m) => m.media_type === activeTab)
      .filter((m) =>
        (m.title || m.name || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
  }, [movies, activeTab, searchTerm]);

  return (
    <div className="mt-10">
      <div className="flex justify-center mb-6 border-b border-gray-300 dark:border-gray-700">
        <button
          onClick={() => handleTabChange("movie")}
          className={`flex items-center px-5 py-2 text-sm sm:text-base font-semibold border-b-2 transition-colors duration-300 ${
            activeTab === "movie"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-gray-500 dark:text-gray-300 hover:text-blue-500"
          }`}
        >
          <FaFilm className="mr-2" />
          Movies
        </button>
        <button
          onClick={() => handleTabChange("tv")}
          className={`flex items-center px-5 py-2 text-sm sm:text-base font-semibold border-b-2 transition-colors duration-300 ${
            activeTab === "tv"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-gray-500 dark:text-gray-300 hover:text-blue-500"
          }`}
        >
          <FaTv className="mr-2" />
          TV Shows
        </button>
      </div>

      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder={`Search ${
            activeTab === "movie" ? "Movies" : "TV Shows"
          }...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="transition-opacity duration-500 ease-in-out">
        <MovieList
          movies={filteredMovies}
          isLoading={isLoading}
          loadMore={loadMore}
        />
      </div>
    </div>
  );
};

export default TabbedView;
