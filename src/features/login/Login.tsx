import type { ReactElement } from "react";
import { LoginForm } from "./LoginForm/LoginForm";

export const Login = (): ReactElement => {
  const handleOnSubmit = async (username: string, password: string) => {};

  return (
    <main id="login-page">
      <LoginForm onSubmit={handleOnSubmit} />
    </main>
  );
};
