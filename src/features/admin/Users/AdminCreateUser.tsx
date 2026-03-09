import type { ReactElement } from "react";
import { useNavigate } from "react-router";
import type { CreateUserRequest } from "../../../types";
import { createUser } from "../../../api/podcast-service";
import { UserForm } from "./UserForm";

export const AdminCreateUser = (): ReactElement => {
  const navigate = useNavigate();

  const handleOnSubmit = async (data: CreateUserRequest) => {
    navigate("/admin/users");
  };

  return (
    <>
      <h2>Create User</h2>
      <UserForm onSubmit={handleOnSubmit} />
    </>
  );
};
