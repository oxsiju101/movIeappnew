import { Link } from "react-router-dom";

const genres = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 27, name: "Horror" },
  { id: 18, name: "Drama" },
  { id: 878, name: "Sci-Fi" },
];

const GenreList = () => (
  <div className="text-center">
    <h2 className="text-xl font-semibold mb-3">Browse by Genre</h2>
    <div className="flex flex-wrap justify-center gap-3">
      {genres.map((genre) => (
        <Link
          to={`/genre/${genre.id}`}
          key={genre.id}
          className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 transition"
        >
          {genre.name}
        </Link>
      ))}
    </div>
  </div>
);

export default GenreList;
