import { useState, type ReactElement, type SubmitEventHandler } from "react";
import { Input } from "../../components/Input";
import { Logo } from "../../components/Logo/Logo";

interface SignupFormProps {
  onSubmit: (username: string, password: string) => Promise<void>;
}

export const SignupForm = ({ onSubmit }: SignupFormProps): ReactElement => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const isFormEmpty = Object.values(values).some((v) => v.trim() === "");

  const handleOnSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError(null);

    if (values.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (values.password !== values.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);
      await onSubmit(values.username, values.password);
    } catch (err) {
      setError("Account creation failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  return (
    <>
      <div className="auth-wrapper">
        <Logo className="auth-logo-centered" />

        <form className="auth-form signup" onSubmit={handleOnSubmit}>
          <Input
            label="Username"
            name="username"
            type="text"
            value={values.username}
            onChange={handleChange}
            autoFocus={false}
            disabled={false}
            autoComplete=""
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            autoFocus={false}
            disabled={false}
            autoComplete="new-password"
          />
          <Input
            label="Confirm password"
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
            autoFocus={false}
            disabled={false}
            autoComplete="new-password"
          />

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={isFormEmpty || isLoading}>
            {isLoading ? "Creating account..." : "Sign up"}
          </button>
          <p className="auth-footer">
            Already have an account? <a href="/login">Sign in</a>
          </p>
        </form>
      </div>
    </>
  );
};
