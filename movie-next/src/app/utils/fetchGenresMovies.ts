const API_KEY = "781992d0004e7198c48a91d53f50e946"; 
const BASE_URL = "https://api.themoviedb.org/3";

interface Genre {
  id: number;
  name: string;
}

interface RawMovie {
  id: number;
  title: string;
  poster_path: string;
  genre_ids: number[];
  backdrop_path?: string;
  vote_average: number;
  runtime?: number;
  release_date?: string;
  overview?: string;
  number_of_episodes?: number;
}

interface MovieWithGenres extends RawMovie {
  genre_names: string[];
}

export const fetchGenres = async (): Promise<Genre[]> => {
  const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch genres: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.genres;
};

export const fetchMoviesWithGenres = async (): Promise<{ results: MovieWithGenres[] }> => {
  const genres = await fetchGenres();

  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();


  const moviesWithGenreNames = data.results.map((movie: RawMovie) => ({
    ...movie,
    genre_names: movie.genre_ids.map(
      (id) => genres.find((g) => g.id === id)?.name || "Other"
    ),
  }));

  return { results: moviesWithGenreNames };
};
