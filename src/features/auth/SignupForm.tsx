import { useState, type ReactElement, type SubmitEventHandler } from "react";
import { Input } from "../../components/Input";
import { Logo } from "../../components/Logo/Logo";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface SignupFormProps {
  onSubmit: (
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
  ) => Promise<void>;
}

export const SignupForm = ({ onSubmit }: SignupFormProps): ReactElement => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const isFormEmpty = Object.values(values).some((v) => v.trim() === "");

  const handleOnSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError(null);

    if (!EMAIL_REGEX.test(values.email)) {
      setError("Please enter a valid email address");
      return;
    }

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
      await onSubmit(
        values.firstName,
        values.lastName,
        values.username,
        values.email,
        values.password,
      );
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
    setError(null); // Clear error when user types
  };

  return (
    <>
      <div className="auth-wrapper">
        <Logo className="auth-logo-centered" />

        <form className="auth-form signup" onSubmit={handleOnSubmit}>
          <div className="name-wrapper">
            <Input
              label="First name"
              name="firstName"
              type="text"
              value={values.firstName}
              onChange={handleChange}
              autoFocus={true}
              disabled={false}
              autoComplete=""
            />
            <Input
              label="Last name"
              name="lastName"
              type="text"
              value={values.lastName}
              onChange={handleChange}
              autoFocus={false}
              disabled={false}
              autoComplete=""
            />
          </div>
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
            label="Email address"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            autoFocus={false}
            disabled={false}
            autoComplete="email"
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
