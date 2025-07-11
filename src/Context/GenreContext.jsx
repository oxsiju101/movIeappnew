import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const GenreContext = createContext();

const API_KEY = "12b41800b75925b6f6f4a2b2701f1c00";
const BASE_URL = "https://api.themoviedb.org/3";

export const GenreProvider = ({ children }) => {
  const [genreMap, setGenreMap] = useState({});

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const [movieRes, tvRes] = await Promise.all([
          axios.get(`${BASE_URL}/genre/movie/list`, {
            params: { api_key: API_KEY },
          }),
          axios.get(`${BASE_URL}/genre/tv/list`, {
            params: { api_key: API_KEY },
          }),
        ]);

        const combinedGenres = [...movieRes.data.genres, ...tvRes.data.genres];
        const genreDict = {};

        combinedGenres.forEach((genre) => {
          genreDict[genre.id] = genre.name;
        });

        setGenreMap(genreDict);
      } catch (err) {
        console.error("Error fetching genre list:", err);
      }
    };

    fetchGenres();
  }, []);

  return (
    <GenreContext.Provider value={genreMap}>{children}</GenreContext.Provider>
  );
};


export const useGenreMap = () => useContext(GenreContext);
