import type { ReactElement } from "react";
import { LoginForm } from "./LoginForm";
import { useAuth } from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router";

export const Login = (): ReactElement => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const message = location.state?.accountCreated
    ? "Account created! You can now sign in."
    : undefined;

  const handleOnSubmit = async (username: string, password: string) => {
    await login(username, password);
    navigate(from, { replace: true });
  };

  return (
    <main id="auth-page">
      <LoginForm onSubmit={handleOnSubmit} successMessage={message} />
    </main>
  );
};
