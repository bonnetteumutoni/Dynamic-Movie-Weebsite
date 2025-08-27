const baseUrl = process.env.BASE_URL;
const apiKey = process.env.API_KEY;
export async function GET() {
  try {
    if (!baseUrl || !apiKey) {
      return new Response('Missing environment variables', { status: 500 });
    }
    const allMovies = [];
    const maxPages = 10;
    for (let page = 1; page <= maxPages; page++) {
      const response = await fetch(
        `${baseUrl}/discover/movie?api_key=${apiKey}&language=en-US&page=${page}&sort_by=popularity.desc`
      );
      if (!response.ok) {
        throw new Error(`API request failed for page ${page} with status ${response.status}`);
      }
      const result = await response.json();
      allMovies.push(...result.results);
      if (page >= result.total_pages) break;
    }
    const seenIds = new Set();
    const uniqueMovies = allMovies.filter(movie => {
      if (seenIds.has(movie.id)) {
        return false;
      }
      seenIds.add(movie.id);
      return true;
    });
    return new Response(JSON.stringify({ results: uniqueMovies }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response((error as Error).message, {
      status: 500,
    });
  }
}