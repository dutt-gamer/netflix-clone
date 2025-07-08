import { useState } from "react";
import MovieCard from "./MovieCard";
import WatchMovie from "./WatchMovie";
import { API_OPTIONS } from "../utils/constants";

const MovieList = ({ title, movies }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieClick = async (movieId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        API_OPTIONS
      );
      const json = await response.json();
      console.log(json);

      const trailer = json.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );

      if (trailer) {
        const movie = movies.find((m) => m.id === movieId);
        setSelectedMovie(movie);
        setTrailerKey(trailer.key);
      } else {
        alert("Trailer not available");
      }
    } catch (err) {
      console.error("Failed to load trailer:", err);
    }
  };

  if (!movies) return;

  return (
    <div className="px-6">
      <h1 className="text-2xl font-bold py-6 text-gray-300">{title}</h1>
      <div className="flex overflow-x-scroll hide-scrollbar">
        <div className="flex gap-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              posterPath={movie.poster_path}
              movieId={movie.id}
              onClick={handleMovieClick}
            />
          ))}
        </div>
      </div>
      {trailerKey && selectedMovie && (
        <WatchMovie
          videoKey={trailerKey}
          onClose={() => {
            setTrailerKey(null);
            setSelectedMovie(null);
          }}
          title={selectedMovie.title}
          overview={selectedMovie.overview}
        />
      )}
    </div>
  );
};

export default MovieList;