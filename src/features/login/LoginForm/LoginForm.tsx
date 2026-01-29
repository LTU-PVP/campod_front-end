import { useState, type FormEventHandler, type ReactElement } from "react";
import { Input } from "../../../components/Input";
import { Logo } from "../../../components/Logo/Logo";

interface LoginFormProps {
  onSubmit: (username: string, password: string) => Promise<void>;
}

export const LoginForm = ({ onSubmit }: LoginFormProps): ReactElement => {
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const isFormValid = username.trim() !== "" && password.trim() !== "";

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="login-wrapper">
        <Logo className="login-logo-centered" />

        <form className="login-form" onSubmit={handleOnSubmit}>
          <Input
            label="Email address"
            name="username"
            type="email"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError(null);
            }}
            autoFocus={true}
            disabled={false}
            autoComplete="username"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(null);
            }}
            autoFocus={false}
            disabled={false}
            autoComplete="current-password"
          />

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={!isFormValid}>
            Sign in
          </button>
        </form>
      </div>
    </>
  );
};
