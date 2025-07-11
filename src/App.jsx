import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import GenrePage from "./components/Genrepage";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import TabbedView from "./components/TabbedView";
import Favorites from "./components/Favorites";

const API_KEY = "12b41800b75925b6f6f4a2b2701f1c00";
const BASE_URL = "https://api.themoviedb.org/3";


export default function App() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  

  const fetchMovies = async (reset = false) => {
    setIsLoading(true);
    try {
      const movieEndpoint = query ? "/search/movie" : "/movie/popular";
      const tvEndpoint = query ? "/search/tv" : "/tv/popular";

      const [movieRes, tvRes] = await Promise.all([
        axios.get(`${BASE_URL}${movieEndpoint}`, {
          params: { api_key: API_KEY, query: query || undefined, page },
        }),
        axios.get(`${BASE_URL}${tvEndpoint}`, {
          params: { api_key: API_KEY, query: query || undefined, page },
        }),
      ]);

      const movieResults = movieRes.data.results.map((item) => ({
        ...item,
        media_type: "movie",
      }));
      const tvResults = tvRes.data.results.map((item) => ({
        ...item,
        media_type: "tv",
      }));

      const combined = [...movieResults, ...tvResults];

      setMovies((prev) => (reset ? combined : [...prev, ...combined]));
    } catch (err) {
      console.error("Error fetching content:", err);
    } finally {
      setIsLoading(false);
    }

    try {
      const { data } = await axios.get(url, {
        params: {
          api_key: API_KEY,
          query: query || undefined,
          page,
        },
      });

      setMovies((prev) => (reset ? data.results : [...prev, ...data.results]));
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(page === 1);
  }, [page, query]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchMovies(true);
  };

  return (
    <Router>
      <NavBar
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main className="min-h-screen px-4 py-6 bg-white dark:bg-gray-900 text-black dark:text-white">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <TabbedView
                  movies={movies}
                  isLoading={isLoading}
                  loadMore={() => setPage((prev) => prev + 1)}
                />
              </>
            }
          />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/genre/:genreId" element={<GenrePage />} />
        </Routes>
        <Footer />
      </main>
    </Router>
  );
}
