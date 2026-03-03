import { Suspense, type ReactElement } from "react";
import { Await, Link, useLoaderData } from "react-router";
import type { CollectionsLoader } from "../../../loaders";
import { Loading } from "../../../components/Loading/Loading";
import { ErrorState } from "../../../components/ErrorState/ErrorState";
import type { CollectionsResponse } from "../../../types";

export const AdminPodcasts = (): ReactElement => {
  const { collections } = useLoaderData<CollectionsLoader>();

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
          {(data: CollectionsResponse) => {
            if (data.collections.length === 0) {
              return <div className="empty-state">No podcasts found.</div>;
            }

            return (
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
                      <td>{podcast.name}</td>
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
                          title="Delete"
                          onClick={() => {}}
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
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
};
