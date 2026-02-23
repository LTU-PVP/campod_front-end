import type { ReactElement } from "react";
import { LoginForm } from "./LoginForm";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";

export const Login = (): ReactElement => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleOnSubmit = async (username: string, password: string) => {
    await login(username, password);
    navigate("/");
  };

  return (
    <main id="auth-page">
      <LoginForm onSubmit={handleOnSubmit} />
    </main>
  );
};
