import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MovieList from "./MovieList";
import { useGenreMap } from "../Context/GenreContext";
import { FaFilm, FaTv } from "react-icons/fa";

const API_KEY = "12b41800b75925b6f6f4a2b2701f1c00";
const BASE_URL = "https://api.themoviedb.org/3";

const GenrePage = () => {
  const { genreId } = useParams();
  const genreMap = useGenreMap();

  const [genreName, setGenreName] = useState("Loading...");
  const [page, setPage] = useState(1);
  const [mediaData, setMediaData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("movie");
  const [selectedMovie, setSelectedMovie] = useState(null);


  useEffect(() => {
    setGenreName(genreMap[genreId] || "Unknown Genre");
  }, [genreId, genreMap]);

  useEffect(() => {
    const fetchInitial = async () => {
      setIsLoading(true);
      setPage(1);
      setMediaData([]);

      try {
        const endpoints = ["movie", "tv"].map((type) =>
          axios
            .get(`${BASE_URL}/discover/${type}`, {
              params: {
                api_key: API_KEY,
                with_genres: genreId,
                page: 1,
              },
            })
            .then((res) =>
              res.data.results.map((item) => ({ ...item, media_type: type }))
            )
        );
        const results = (await Promise.all(endpoints)).flat();
        setMediaData(results);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitial();
  }, [genreId]);

  useEffect(() => {
    if (page === 1) return;

    const fetchMore = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/discover/${activeTab}`, {
          params: {
            api_key: API_KEY,
            with_genres: genreId,
            page,
          },
        });
        setMediaData((prev) => [
          ...prev,
          ...res.data.results.map((item) => ({
            ...item,
            media_type: activeTab,
          })),
        ]);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMore();
  }, [page, activeTab, genreId]);

  const filtered = useMemo(
    () => mediaData.filter((m) => m.media_type === activeTab),
    [mediaData, activeTab]
  );

  return (
    <div className="mt-6">
      <h1 className="text-2xl md:text-3xl pl-2 my-2 border-l-4 font-sans font-bold border-teal-400 dark:text-gray-200 mt-12 mb-4">
        Genre: {genreName} <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">(Click on a movie to see details)</span>
      </h1>

      {/* Tabs */}
      <div className="flex justify-center mb-6 border-b border-gray-300 dark:border-gray-700">
        {["movie", "tv"].map((type) => (
          <button
            key={type}
            onClick={() => {
              setActiveTab(type);
              setPage(1);
            }}
            className={`flex items-center px-5 py-2 text-sm md:text-base font-semibold border-b-2 transition-colors ${
              activeTab === type
                ? "border-blue-600 text-blue-600 dark:text-blue-400"
                : "border-transparent text-gray-500 dark:text-gray-300 hover:text-blue-500"
            }`}
          >
            {type === "movie" ? (
              <FaFilm className="mr-2" />
            ) : (
              <FaTv className="mr-2" />
            )}
            {type === "movie" ? "Movies" : "TV Shows"}
          </button>
        ))}
      </div>

      {/* Movie/TV list */}
      <MovieList
        movies={filtered}
        isLoading={isLoading}
        loadMore={() => setPage((prev) => prev + 1)}
        onMovieClick={(movie) => setSelectedMovie(movie)}
      />
    </div>
  );
};

export default GenrePage;
