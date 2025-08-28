
const apiKey = process.env.NEXT_PUBLIC_API_KEY || '';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://api.themoviedb.org/3';

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
  if (!apiKey) {
    return []; 
  }

  try {
    const response = await fetch(`${baseUrl}/genre/movie/list?api_key=${apiKey}&language=en-US`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      return []; 
    }

    const data = await response.json();
    if (!data.genres || !Array.isArray(data.genres)) {
      return []; 
    }

    return data.genres;
  } catch (error) {
    return []; 
  }
};

export const fetchMoviesWithGenres = async (): Promise<{ results: MovieWithGenres[] }> => {
  try {
    const genres = await fetchGenres();
    if (!apiKey) {
      return { results: [] }; 
    }

    const response = await fetch(`${baseUrl}/movie/popular?api_key=${apiKey}&language=en-US`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      return { results: [] }; 
    }

    const data = await response.json();
    if (!data.results || !Array.isArray(data.results)) {
      return { results: [] }; 
    }

    const moviesWithGenreNames = data.results.map((movie: RawMovie) => ({
      ...movie,
      genre_names: movie.genre_ids.map(
        (id) => genres.find((g) => g.id === id)?.name || 'Other'
      ),
    }));

    return { results: moviesWithGenreNames };
  } catch (error) {
    return { results: [] }; 
  }
};