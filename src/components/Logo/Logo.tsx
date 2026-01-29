import type { ReactElement } from "react";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className = "" }: LogoProps): ReactElement => {
  return (
    <div className={`logo-section ${className}`}>
      <div className="logo-rectangle">
        <span className="material-symbols-outlined">headphones</span>
      </div>
      <h1>Podcasts</h1>
    </div>
  );
};
