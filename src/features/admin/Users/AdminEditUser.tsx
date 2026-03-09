import type { ReactElement } from "react";
import type { CreateUserRequest, User } from "../../../types";
import { updateUser } from "../../../api/podcast-service";
import { UserForm } from "./UserForm";
import type { UserLoader } from "../../../loaders";
import { Await, useLoaderData } from "react-router";

export const AdminEditUser = (): ReactElement => {
  const { user } = useLoaderData<UserLoader>();

  return (
    <>
      <h2>Edit User</h2>
      <Await resolve={user}>
        {(resolvedUser: User) => {
          const handleOnSubmit = async (data: CreateUserRequest) => {
            console.log("Updating user:", resolvedUser.id, data);
            await updateUser(resolvedUser.id, data);
          };

          return (
            <UserForm
              key={resolvedUser.id}
              onSubmit={handleOnSubmit}
              initialValues={{
                username: resolvedUser.username,
                password: "",
                role: resolvedUser.role,
              }}
              isEdit={true}
            />
          );
        }}
      </Await>
    </>
  );
};
