import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import MovieModal from "./MovieModal"; // ✅ Import the modal
import NavBar from "./NavBar";
import GenreList from "./GenreList";

const API_KEY = "12b41800b75925b6f6f4a2b2701f1c00";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null); // ✅ State for modal

  useEffect(() => {
    const favIds = JSON.parse(localStorage.getItem("favs") || "[]");
    const fetchFavs = async () => {
      const promises = favIds.map((id) =>
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
      );
      const results = await Promise.all(promises);
      setFavorites(results.map((res) => res.data));
    };
    fetchFavs();
  }, []);

  return (
    <>
      <section className="bg-gradient-to-r from-blue-800 to-purple-900 text-white py-8 px-4 overflow-hidden mt-6">
        <div className="mt-16 max-w-5xl mx-auto text-center">
          <GenreList />
        </div>
      </section>
      <NavBar />
      <div className="mt-6">
        <h1 className="text-2xl md:text-3xl pl-2 my-2 border-l-4  font-sans font-bold border-teal-400 dark:text-gray-200 mt-12 mb-4">
        Favorite Movies
        <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
          (Click on a movie to see details)
        </span>
      </h1>

        {favorites.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No favorites yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {favorites.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={setSelectedMovie}
              />
            ))}
          </div>
        )}

        {/* ✅ Movie Modal */}
        {selectedMovie && (
          <MovieModal
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        )}
      </div>
    </>
  );
};

export default Favorites;
