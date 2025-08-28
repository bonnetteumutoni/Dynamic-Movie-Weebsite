const baseUrl = process.env.BASE_URL;
const apiKey = process.env.API_KEY;
export async function GET() {
  try {
    if (!baseUrl || !apiKey) {
      return new Response('Missing environment variables', { status: 500 });
    }
    const response = await fetch(`${baseUrl}/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const result = await response.json();
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response((error as Error).message, {
      status: 500,
    });
  }
}