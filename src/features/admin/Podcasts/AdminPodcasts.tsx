import { Suspense, type ReactElement } from "react";
import { Await, Link, useLoaderData, useRevalidator } from "react-router";
import { deleteCollection } from "../../../api/podcast-service";
import type { CollectionsLoader } from "../../../loaders";
import { Loading } from "../../../components/Loading/Loading";
import { ErrorState } from "../../../components/ErrorState/ErrorState";
import type { CollectionsResponse } from "../../../types";

export const AdminPodcasts = (): ReactElement => {
  const { collections } = useLoaderData<CollectionsLoader>();
  const { revalidate } = useRevalidator(); // Built-in way to refresh data

  const handleDelete = async (id: number | string) => {
    if (!window.confirm("Are you sure you want to delete this podcast?")) {
      return;
    }

    try {
      await deleteCollection(id);
      revalidate();
    } catch (err) {
      console.error(err);
      window.alert("Failed to delete podcast");
    }
  };

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <h2>Podcasts</h2>
        <Link to="create" className="btn btn-primary">
          <span className="material-symbols-outlined">add</span>
          Add Podcast
        </Link>
      </div>

      <Suspense fallback={<Loading />}>
        <Await
          resolve={collections}
          errorElement={<ErrorState message="Error fetching podcasts" />}
        >
          {(data: CollectionsResponse) => (
            <div className="table-responsive">
              {data.collections.length === 0 ? (
                <div className="empty-state">No podcasts found.</div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.collections.map((podcast) => (
                      <tr key={podcast.id}>
                        <td>{podcast.id}</td>
                        <td>
                          <strong>{podcast.name}</strong>
                        </td>
                        <td className="col-description">
                          {podcast.description || "No description"}
                        </td>
                        <td className="table-actions">
                          <Link
                            to={`${podcast.id}/edit`}
                            className="btn-icon"
                            title="Edit"
                          >
                            <span className="material-symbols-outlined">
                              edit
                            </span>
                          </Link>
                          <button
                            className="btn-icon btn-icon-danger"
                            onClick={() => handleDelete(podcast.id)}
                            title="Delete"
                          >
                            <span className="material-symbols-outlined">
                              delete
                            </span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </Await>
      </Suspense>
    </div>
  );
};
