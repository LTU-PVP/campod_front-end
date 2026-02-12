import type { ReactElement } from "react";
import { SignupForm } from "./SignupForm";

export const Signup = (): ReactElement => {
  const handleOnSubmit = async (username: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <main id="auth-page">
      <SignupForm onSubmit={handleOnSubmit} />
    </main>
  );
};
