import type { ReactElement } from "react";

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorState = ({
  message,
  onRetry,
}: ErrorStateProps): ReactElement => {
  return (
    <div className="error-wrapper" role="alert">
      <h3>Something went wrong</h3>
      <p className="error-message">{message}</p>

      {onRetry && (
        <button type="button" className="retry-button" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
};
