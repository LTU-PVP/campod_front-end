import type { ReactElement } from "react";
import { SignupForm } from "./SignupForm";
import { register } from "../../api/podcast-service";
import { useNavigate } from "react-router";

export const Signup = (): ReactElement => {
  const navigate = useNavigate();

  const handleOnSubmit = async (username: string, password: string) => {
    await register(username, password);
    navigate("/login", { state: { accountCreated: true } });
  };

  return (
    <main id="auth-page">
      <SignupForm onSubmit={handleOnSubmit} />
    </main>
  );
};
