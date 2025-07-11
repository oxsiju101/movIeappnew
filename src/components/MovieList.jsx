import MovieCard from "./MovieCard";
import MovieModal from "./MovieModal";
import { useState } from "react";

const MovieList = ({ movies = [], isLoading, loadMore }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-6">
        {isLoading
          ? [...Array(8)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse h-72 bg-gray-300 dark:bg-gray-700 rounded"
              />
            ))
          : movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={() => setSelectedMovie(movie)}
              />
            ))}
      </div>

      <div className="mt-6 text-center">
        {!isLoading && (
          <button
            onClick={loadMore}
            disabled={isLoading}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Load More
          </button>
        )}
      </div>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};

export default MovieList;
