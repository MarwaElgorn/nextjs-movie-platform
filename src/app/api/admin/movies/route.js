import { getMovies, addMovie } from "@/lib/moviesDB";
import { NextResponse } from "next/server";

/**
 * GET /api/admin/movies
 * Fetch all movies and return an array
 */
export async function GET() {
  try {
    const movies = getMovies();
    return NextResponse.json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json(
      { error: "Failed to fetch movies" },
      { status: 500 }
    );
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
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    if (!body.year?.trim()) {
      return NextResponse.json({ error: "Year is required" }, { status: 400 });
    }

    if (!body.poster?.trim()) {
      return NextResponse.json(
        { error: "Poster URL is required" },
        { status: 400 }
      );
    }

    addMovie(body);
    return NextResponse.json(
      {
        success: true,
        message: "Movie added successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating movie:", error);
    return NextResponse.json(
      { error: "Failed to create movie" },
      { status: 500 }
    );
  }
}
