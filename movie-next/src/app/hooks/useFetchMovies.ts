"use client"
import { useEffect, useState } from "react";
import { fetchMovies } from "../utils/fetchMovies";
interface MovieType {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}
const useFetchMovies = () => {
  const [movies, setMovies] = useState<Array<MovieType>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const movies = await fetchMovies();
        setMovies(movies?.results || []);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return { movies, loading, error };
};
export default useFetchMovies;