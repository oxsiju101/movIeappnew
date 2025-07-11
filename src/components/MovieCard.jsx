import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useGenreMap } from "../Context/GenreContext";

const IMG_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie, onClick }) => {
  const [isFav, setIsFav] = useState(false);

  const title = movie.title || movie.name || "Untitled";
  const mediaLabel =
    movie.media_type === "tv"
      ? "TV Show"
      : movie.media_type === "movie"
      ? "Movie"
      : "";
  const genreMap = useGenreMap();

  const genres =
    movie.genre_ids
      ?.map((id) => genreMap[id])
      .filter(Boolean)
      .join(", ") || "";

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favs") || "[]");
    setIsFav(favs.includes(movie.id));
  }, [movie.id]);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    let favs = JSON.parse(localStorage.getItem("favs") || "[]");
    if (isFav) {
      favs = favs.filter((id) => id !== movie.id);
    } else {
      favs.push(movie.id);
    }
    localStorage.setItem("favs", JSON.stringify(favs));
    setIsFav(!isFav);
  };

  return (
    <div
      onClick={onClick}
      className="relative group rounded overflow-hidden shadow-lg hover:shadow-xl bg-white dark:bg-gray-800 transition duration-300 cursor-pointer hover:scale-105 transform hover:z-10 hover:shadow-2xl hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
    >
      <img
        src={
          movie.poster_path
            ? `${IMG_URL}${movie.poster_path}`
            : "/placeholder.png"
        }
        alt={title}
        className="w-full h-72 object-cover"
      />

      <div className="p-3 flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-black dark:text-white truncate">
            {title}
          </h3>
          <button
            onClick={toggleFavorite}
            className="text-red-600 text-xl z-10"
          >
            {isFav ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
          <span>⭐ {movie.vote_average?.toFixed(1) || "N/A"}</span>
          {mediaLabel && (
            <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs">
              {mediaLabel}
            </span>
          )}
        </div>
        {genres && (
          <div className="text-xs text-gray-500 dark:text-gray-300 truncate">
            {genres}
          </div>
        )}
      </div>

      <div className="absolute inset-0 bg-black bg-opacity-40 text-white opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex flex-col justify-center items-center p-4 text-sm text-center">
        <h4 className="text-lg font-semibold mb-2">{title}</h4>
        <p className="line-clamp-5">
          {movie.overview || "No description available."}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
