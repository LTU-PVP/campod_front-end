import { type ChangeEvent, type ReactElement } from "react";

interface InputProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  error?: string;
}

export const Input = ({
  label,
  name,
  type,
  value,
  onChange,
  autoFocus = false,
  disabled = false,
  autoComplete = "",
  error,
}: InputProps): ReactElement => {
  const id = `${name.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <label>
      {label}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
        disabled={disabled}
        autoComplete={autoComplete}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${name}-error` : undefined}
      />
    </label>
  );
};
