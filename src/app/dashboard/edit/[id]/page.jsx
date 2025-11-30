import EditForm from "./EditForm";

/**
 * Edit Movie Page - Hybrid (Server + Client)
 * Server component fetches movie data, client component handles form
 * Strategy: Keep data fetching on server for security, form interaction on client
 */
export default async function EditMovie({ params }) {
  const { id } = await params;

  const res = await fetch(`http://localhost:3000/api/admin/movies/${id}`, {
    cache: "no-store",
  });

  const movie = await res.json();

  return <EditForm movie={movie} />;
}
