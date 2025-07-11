import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "12b41800b75925b6f6f4a2b2701f1c00";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const MovieModal = ({ movie, onClose }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (!movie?.id) return;

    const mediaType = movie.media_type || "movie"; 
    axios
      .get(`https://api.themoviedb.org/3/${mediaType}/${movie.id}`, {
        params: { api_key: API_KEY },
      })
      .then((res) => setDetails(res.data))
      .catch(console.error);
  }, [movie]);

  if (!details) return null;

  const title = details.title || details.name || "Untitled";
  const description = details.overview || "No description available.";
  const poster = details.poster_path
    ? `${IMG_URL}${details.poster_path}`
    : "/placeholder.png";
  const releaseDate = details.release_date || details.first_air_date || "N/A";
  const rating = details.vote_average?.toFixed(1) || "N/A";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg max-w-2xl w-full overflow-auto shadow-lg">
        <button
          onClick={onClose}
          className="text-right p-4 text-xl absolute top-2 right-4 text-gray-700 dark:text-gray-200"
        >
          ✕
        </button>

       
        <img
          src={poster}
          alt={title}
          className="w-full h-72 object-cover rounded-t"
        />

    
        <div className="p-6 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>

          <p className="text-gray-600 dark:text-gray-300">{description}</p>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>
              <strong>Release:</strong> {releaseDate}
            </p>
            <p>
              <strong>Rating:</strong> {rating}/10
            </p>
            {details.number_of_seasons && (
              <p>
                <strong>Seasons:</strong> {details.number_of_seasons}
              </p>
            )}
          </div>

        
          <div className="flex gap-4 mt-4">
            <a
              href={`https://www.themoviedb.org/${
                movie.media_type || "movie"
              }/${movie.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              🎬 Watch Now
            </a>
            <a
              href="#"
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              ⬇️ Download
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
