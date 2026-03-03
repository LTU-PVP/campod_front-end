import type { ReactElement } from "react";
import { Link } from "react-router";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className = "" }: LogoProps): ReactElement => {
  return (
    <Link
      to="/"
      className={`logo-link ${className}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="logo-section">
        <div className="logo-rectangle">
          <span className="material-symbols-outlined">headphones</span>
        </div>
        <h1>Podcasts</h1>
      </div>
    </Link>
  );
};
