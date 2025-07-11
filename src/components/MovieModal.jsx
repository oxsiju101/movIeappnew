import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "12b41800b75925b6f6f4a2b2701f1c00";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const MovieModal = ({ movie, onClose }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movie.id}`, {
        params: { api_key: API_KEY },
      })
      .then((res) => setDetails(res.data))
      .catch(console.error);
  }, [movie]);

  if (!details) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg max-w-xl w-full overflow-auto shadow-lg">
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-xl text-gray-700 dark:text-gray-200 hover:text-red-500"
          >
            ✕
          </button>
        </div>

        {/* Poster */}
        <img
          src={
            details.poster_path
              ? `${IMG_URL}${details.poster_path}`
              : "/placeholder.png"
          }
          alt={details.title}
          className="w-full h-80 object-cover rounded-t"
        />

        {/* Movie Info */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {details.title}
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {details.overview || "No description available."}
          </p>
          <p className="mt-4 text-sm text-gray-700 dark:text-gray-400">
            <strong>Release:</strong> {details.release_date}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-400">
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-4">
            <a
              href={`https://www.themoviedb.org/movie/${movie.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition"
            >
              ▶ Watch Now
            </a>
            <a
              href={`https://www.themoviedb.org/movie/${movie.id}/download`} // adjust if you have a download route
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-medium transition"
            >
              ⬇ Download
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
