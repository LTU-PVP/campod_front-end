import type { ReactElement } from "react";
import { LoginForm } from "./LoginForm";

export const Login = (): ReactElement => {
  const handleOnSubmit = async (username: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
  };

  return (
    <main id="auth-page">
      <LoginForm onSubmit={handleOnSubmit} />
    </main>
  );
};
