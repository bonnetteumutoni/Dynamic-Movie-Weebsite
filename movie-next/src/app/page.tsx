"use client";
import useFetchMovies from "./hooks/useFetchMovies";
import Navigation from "./shared-components/navigation";


const MovieLanding = () => {
  const { movies, loading, error } = useFetchMovies();

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-black text-white">
      <Navigation />
      <div className="bg-[linear-gradient(to_right_bottom,rgba(0,0,0,0.3),rgba(0,0,0,0.2)),url('/images/manificien.jpg')] bg-cover bg-center h-160 w-458.2">
        <div className="pt-100 pl-3">
          <h2 className="text-6xl font-bold text-yellow-500 mb-1">Maleficent: Mistress of Evil</h2>
          <div className="flex items-center text-gray-400 text-2xl mb-2">
            <span>14</span>
            <span className="mx-2">•</span>
            <span>2019</span>
            <span className="mx-2">•</span>
            <span>1h 59m</span>
            <span className="mx-2">•</span>
            <span>1 Episodes</span>
          </div>
          <p className="text-gray-400 text-sm mb-4 leading-tight">
            The story follows Maleficent and Aurora as they confront new <br /> challenges to their relationship, including unexpected allies and dark forces at play. <br /> Starring Angelina Jolie, Elle Fanning, Michelle Pfeiffer, Juno Temple, ...
          </p>
          <div className="flex space-x-3">
            <button className="bg-yellow-500 text-black px-4 py-1.5 rounded-full text-sm font-medium hover:bg-yellow-600 transition-colors">
              Watch Now
            </button>
            <button className="bg-gray-800 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-gray-700 transition-colors">
              Add To Favourites
            </button>
          </div>

        </div>
      </div>

 <div className="flex space-x-6 p-4 overflow-x-auto bg-gray-900">
        <button className="bg-yellow-500 text-black px-3 py-1 rounded-full">All</button>
        <button className="bg-gray-800 text-white px-3 py-1 rounded-full">Action</button>
        <button className="bg-gray-800 text-white px-3 py-1 rounded-full">Comedy</button>
        <button className="bg-gray-800 text-white px-3 py-1 rounded-full">Arabic</button>
        <button className="bg-gray-800 text-white px-3 py-1 rounded-full">series</button>
        <button className="bg-gray-800 text-white px-3 py-1 rounded-full">Adventure</button>
        <button className="bg-gray-800 text-white px-3 py-1 rounded-full">Other</button>
        <span className="text-yellow-500 mt-1">›</span>
      </div> 
      <ul className="grid grid-cols-6 m-2 bg-black">
        {movies.map((movie) => (
          <li key={movie.id}>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title} height={350} width={350} className="pb-5"
              />
            )}
            <h2 className="text-white-500">{movie.title}</h2>
            <p>Release Date: {movie.release_date}</p>
            <p className="pb-5">Rating: {movie.vote_average}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieLanding;
