'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useFetchMovies from './hooks/useFetchMovies';
import Navigation from './shared-components/navigation';

const fadeVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

const genresList = ['All', 'Action', 'Comedy', 'Arabic', 'Series', 'Adventure', 'Other'];

const HomePage = () => {
  const { movies, loading, error } = useFetchMovies();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGenre, setFilterGenre] = useState('All');
  const [viewFavoritesOnly, setViewFavoritesOnly] = useState(false);

  useEffect(() => {
    if (!movies.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [movies]);

  const toggleFavorite = (movieId: number) => {
    setFavorites((prev) =>
      prev.includes(movieId) ? prev.filter((id) => id !== movieId) : [...prev, movieId]
    );
  };

  const displayedMovies = useMemo(() => {
    let list = movies;

    if (viewFavoritesOnly) {
      list = list.filter((m) => favorites.includes(m.id));
    }

    if (filterGenre !== 'All') {
      list = list.filter((m) =>
        m.genre_names?.some((genre) => genre.toLowerCase() === filterGenre.toLowerCase())
      );
    }

    if (searchTerm.trim().length > 0) {
      const lower = searchTerm.toLowerCase();
      list = list.filter((m) => m.title.toLowerCase().includes(lower));
    }

    return list
      .slice()
      .sort(
        (a, b) =>
          new Date(b.release_date || '').getTime() - new Date(a.release_date || '').getTime()
      );
  }, [movies, filterGenre, searchTerm, viewFavoritesOnly, favorites]);

  if (loading) return <p className="p-10 text-white">Loading movies...</p>;
  if (error) return <p className="p-10 text-red-500">Error: {error}</p>;
  if (!movies.length) return <p className="p-10 text-white">No movies found.</p>;

  const movie = movies[currentIndex];

  return (
    <div>
      <Navigation />
      <div className="bg-black text-white min-h-screen relative overflow-hidden">
        <AnimatePresence>
          <motion.div
            key={movie.id}
            variants={fadeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 1 }}
            className="absolute top-0 left-0 w-full h-[80vh] bg-cover bg-center filter brightness-50"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path})`,
            }}
          />
        </AnimatePresence>

        <div className="relative z-10 p-8 max-w-4xl ">
          <h2 className="text-6xl font-bold text-yellow-500 mb-4">{movie.title}</h2>
          <div className="flex items-center text-gray-400 text-lg mb-4 space-x-4">
            <span>{movie.vote_average.toFixed(1)}</span>
            <span>•</span>
            <span>{movie.release_date?.slice(0, 4)}</span>
            <span>•</span>
            <span>{movie.runtime ? `${movie.runtime}m` : 'N/A'}</span>
            <span>•</span>
            <span>{movie.number_of_episodes ? `${movie.number_of_episodes} Episodes` : ''}</span>
          </div>
          <p className="max-w-lg text-gray-300 mb-6">{movie.overview}</p>
          <div className="flex space-x-4">
            <button className="bg-yellow-500 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-600 transition">
              Watch Now
            </button>
            <button className="bg-gray-800 text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-700 transition">
              Add To Favourites
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-900 z-10 relative mt-70">
          <button
            onClick={() => setViewFavoritesOnly(false)}
            className={`px-4 py-1 rounded-full font-medium ${
              !viewFavoritesOnly ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            All Movies
          </button>
          <button
            onClick={() => setViewFavoritesOnly(true)}
            className={`px-4 py-1 rounded-full font-medium ${
              viewFavoritesOnly ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            Favorites
          </button>

          {genresList.map((genre) => (
            <button
              key={genre}
              onClick={() => {
                setFilterGenre(genre);
                setViewFavoritesOnly(false);
              }}
              className={`px-4 py-1 rounded-full font-medium ${
                filterGenre === genre ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        <div className="relative z-10 max-w-60xl mx-auto p-4 bg-black">
          <ul className="grid grid-cols-6 gap-4">
            {displayedMovies.map((movie) => (
              <li
                key={movie.id}
                className="p-2 border border-gray-700 rounded-lg transform transition-transform hover:scale-105 hover:shadow-lg cursor-pointer"
              >
                {movie.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    height={350}
                    width={350}
                    className="pb-2 rounded"
                  />
                )}
                <h2 className="text-yellow-500 font-semibold">{movie.title}</h2>
                <p>Release Date: {movie.release_date}</p>
                <p>Rating: {movie.vote_average.toFixed(1)}</p>
                <button
                  onClick={() => toggleFavorite(movie.id)}
                  className={`mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                    favorites.includes(movie.id)
                      ? 'bg-yellow-500 text-black'
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  {favorites.includes(movie.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
