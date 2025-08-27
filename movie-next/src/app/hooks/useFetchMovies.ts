"use client";
import { useEffect, useState } from "react";
import { fetchMoviesWithGenres } from "../utils/fetchGenresMovies";

interface MovieType {
  id: number;
  title: string;
  poster_path: string;
  genre_ids: number[];
  genre_names?: string[];
  backdrop_path?: string;
  vote_average: number;
  runtime?: number;
  release_date?: string;
  overview?: string;
  number_of_episodes?: number;
}

const useFetchMovies = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMoviesWithGenres();
        setMovies(data.results);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { movies, loading, error };
};

export default useFetchMovies;
