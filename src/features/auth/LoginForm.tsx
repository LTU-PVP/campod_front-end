import { useState, type ReactElement, type SubmitEventHandler } from "react";
import { Logo } from "../../components/Logo/Logo";
import { Input } from "../../components/Input";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
}

export const LoginForm = ({ onSubmit }: LoginFormProps): ReactElement => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const isFormEmpty = Object.values(values).some((v) => v.trim() === "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  const handleOnSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setError(null);
      await onSubmit(values.username, values.password);
    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <Logo className="auth-logo-centered" />

      <form className="auth-form login" onSubmit={handleOnSubmit}>
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
          autoComplete="current-password"
        />

        {error && <div className="error-message">{error}</div>}

        <button type="submit" disabled={isFormEmpty || isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </button>

        <p className="auth-footer">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </form>
    </div>
  );
};
