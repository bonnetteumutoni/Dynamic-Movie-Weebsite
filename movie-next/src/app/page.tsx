'use client';

import { useState, useEffect } from 'react';
import useFetchMovies from './hooks/useFetchMovies';
import Image from 'next/image';
import Navigation from './shared-components/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const fadeVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

const MovieLanding = () => {
  const { movies, loading, error } = useFetchMovies();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!movies.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [movies]);

  if (loading) return <div className="text-white text-center py-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-10">Error: {error}</div>;

  const movie = movies[currentIndex];


  const handleAddToFavorites = () => {
    alert('Added to favorites');
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Navigation />

      <section className="relative w-[98vw] h-[70vh] overflow-hidden">
        <AnimatePresence>
          <motion.div
            key={movie.id}
            variants={fadeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 1 }}
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center filter brightness-50"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path})`,
            }}
          />
        </AnimatePresence>

        <div className="absolute bottom-10 left-0 p-4 bg-opacity-70 w-full max-w-4xl text-white">
          <h2 className="text-4xl font-bold text-yellow-500 mb-1">{movie.title}</h2>
          <div className="flex items-center text-gray-400 text-sm mb-2 space-x-2">
            <span>{movie.vote_average.toFixed(1)}</span>
            <span>•</span>
            <span>{movie.release_date?.slice(0, 4)}</span>
          </div>

          <div className="flex space-x-3">
            <button className="bg-yellow-500 text-black px-4 py-1.5 rounded-full text-sm font-medium hover:bg-yellow-600 transition-colors">
              Watch Now
            </button>
            <button className="bg-gray-800 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-gray-700 transition-colors">
              Add To Favourites
            </button>
          </div>
        </div>
      </section>

      <div className="flex space-x-2 p-4 overflow-x-auto bg-gray-900">
        {['All', 'Action', 'Comedy', 'Arabic', 'Series', 'Adventure', 'Other'].map((category) => (
          <button
            key={category}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              category === 'All' ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-white'
            }`}
          >
            {category}
          </button>
        ))}
        <span className="text-yellow-500 mt-1">›</span>
      </div>

      <section className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Most viewed</h2>
          <a href="#" className="text-yellow-500 hover:underline">
            View all ›
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 overflow-x-auto">
          {movies.map((m) => (
            <div key={m.id} className="relative group">
              {m.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                  alt={m.title}
                  width={150}
                  height={225}
                  className="w-full h-auto rounded-lg shadow-lg transition-transform group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-56 bg-gray-700 rounded-lg flex items-center justify-center">
                  No poster available
                </div>
              )}

             
              <div className="mt-2 text-center">
                <h3 className="text-yellow-500 font-semibold text-sm truncate">{m.title}</h3>
                <p className="text-gray-400 text-xs">{m.release_date}</p>
              </div>

              <button
                className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-semibold hover:bg-yellow-600 transition"
                onClick={handleAddToFavorites}
              >
                Add To Favorites
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MovieLanding;
