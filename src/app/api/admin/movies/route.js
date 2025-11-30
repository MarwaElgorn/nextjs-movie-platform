import { getMovies, addMovie } from "@/lib/moviesDB";

/**
 * GET /api/admin/movies
 * Fetch all movies
 */
export async function GET() {
  try {
    const movies = getMovies();
    return Response.json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    return Response.json({ error: "Failed to fetch movies" }, { status: 500 });
  }
}

/**
 * POST /api/admin/movies
 * Create a new movie
 */
export async function POST(req) {
  try {
    const body = await req.json();

    // Validate required fields
    if (!body.title?.trim()) {
      return Response.json({ error: "Title is required" }, { status: 400 });
    }

    if (!body.year?.trim()) {
      return Response.json({ error: "Year is required" }, { status: 400 });
    }

    if (!body.poster?.trim()) {
      return Response.json(
        { error: "Poster URL is required" },
        { status: 400 }
      );
    }

    addMovie(body);
    return Response.json(
      {
        success: true,
        message: "Movie added successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating movie:", error);
    return Response.json({ error: "Failed to create movie" }, { status: 500 });
  }
}
