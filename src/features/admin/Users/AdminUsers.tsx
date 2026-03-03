import { Suspense, type ReactElement } from "react";
import { Await, Link, useLoaderData } from "react-router";
import { Loading } from "../../../components/Loading/Loading";
import { ErrorState } from "../../../components/ErrorState/ErrorState";
import type { CollectionsResponse, UsersResponse } from "../../../types";
import type { UsersLoader } from "../../../loaders";

export const AdminUsers = (): ReactElement => {
  const { users } = useLoaderData<UsersLoader>();

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <h2>Users</h2>
        <Link to="create" className="btn btn-primary">
          <span className="material-symbols-outlined">add</span>
          Add User
        </Link>
      </div>

      <Suspense fallback={<Loading />}>
        <Await
          resolve={users}
          errorElement={<ErrorState message="Error fetching users" />}
        >
          {(data: UsersResponse) => {
            if (data.users.length === 0) {
              return <div className="empty-state">No users found.</div>;
            }

            return (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Role</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                      <td>{user.role}</td>
                      <td className="table-actions">
                        <Link
                          to={`${user.id}/edit`}
                          className="btn-icon"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined">
                            edit
                          </span>
                        </Link>
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
