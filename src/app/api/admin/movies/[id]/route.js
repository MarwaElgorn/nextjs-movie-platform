import { deleteMovie, updateMovie, getMovies } from "@/lib/moviesDB";

/**
 * GET /api/admin/movies/[id]
 * Fetch a single movie by ID
 */
export async function GET(_, { params }) {
  try {
    const { id } = await params;
    const numId = Number(id);
    const movie = getMovies().find((m) => m.id === numId);

    if (!movie) {
      return Response.json({ error: "Movie not found" }, { status: 404 });
    }

    return Response.json(movie);
  } catch (error) {
    console.error("Error fetching movie:", error);
    return Response.json({ error: "Failed to fetch movie" }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/movies/[id]
 * Delete a movie by ID
 */
export async function DELETE(_, { params }) {
  try {
    const { id } = await params;
    const numId = Number(id);
    const movies = getMovies();
    const exists = movies.some((m) => m.id === numId);

    if (!exists) {
      return Response.json({ error: "Movie not found" }, { status: 404 });
    }

    deleteMovie(numId);
    return Response.json({
      success: true,
      message: "Movie deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting movie:", error);
    return Response.json({ error: "Failed to delete movie" }, { status: 500 });
  }
}

/**
 * PUT /api/admin/movies/[id]
 * Update a movie by ID
 */
export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const numId = Number(id);
    const body = await req.json();

    const movies = getMovies();
    const exists = movies.some((m) => m.id === numId);

    if (!exists) {
      return Response.json({ error: "Movie not found" }, { status: 404 });
    }

    // Validate required fields
    if (!body.title?.trim()) {
      return Response.json({ error: "Title is required" }, { status: 400 });
    }

    updateMovie(numId, body);
    return Response.json({
      success: true,
      message: "Movie updated successfully",
    });
  } catch (error) {
    console.error("Error updating movie:", error);
    return Response.json({ error: "Failed to update movie" }, { status: 500 });
  }
}
