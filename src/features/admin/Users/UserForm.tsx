import { useState, type ReactElement } from "react";
import { Input } from "../../../components/Input";
import { Textarea } from "../../../components/Textarea";
import type { CreateShowRequest, CreateUserRequest } from "../../../types";

interface UserFormProps {
  onSubmit: (data: CreateUserRequest) => Promise<void>;
  initialValues?: { username: string; password: string; role?: string };
  isEdit?: boolean;
}

export const UserForm = ({
  onSubmit,
  initialValues,
  isEdit = false,
}: UserFormProps): ReactElement => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    username: initialValues?.username ?? "",
    password: initialValues?.password ?? "",
    role: initialValues?.role ?? "user",
  });

  const isFormEmpty = isEdit
    ? !values.username.trim() || !values.password.trim() || !values.role.trim()
    : !values.username.trim() || !values.password.trim();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  const handleOnSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (isFormEmpty) {
      setError("Please fill out all fields");
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit({
        username: values.username,
        password: values.password,
        ...(isEdit && { role: values.role as "admin" | "creator" | "user" }),
      });
      if (!isEdit) {
        setValues({ username: "", password: "", role: "user" });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="podcast-form-wrapper">
      <form className="podcast-form" onSubmit={handleOnSubmit}>
        <Input
          label="Username"
          name="username"
          type="text"
          value={values.username}
          onChange={handleChange}
          autoFocus={true}
          autoComplete="username"
        />

        <Input
          label="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          autoComplete="new-password"
        />

        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select id="role" name="role" value={values.role}>
            <option value="user">User</option>
            <option value="creator">Creator</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" disabled={isFormEmpty || isLoading}>
          {isLoading
            ? isEdit
              ? "Saving..."
              : "Creating..."
            : isEdit
              ? "Update User"
              : "Create User"}
        </button>
      </form>
    </div>
  );
};
