import type { ReactElement } from "react";
import { Logo } from "../../../components/Logo/Logo";

export const Header = (): ReactElement => {
  return (
    <header>
      <div className="header-content container">
        <div className="header-flex">
          <Logo />
          <nav>
            <button className="logout-btn">Logout</button>
          </nav>
        </div>
        <form className="search-form" id="search-form">
          <div className="search-input-wrapper">
            <span className="material-symbols-outlined search-icon">
              search
            </span>
            <input
              id="query"
              type="text"
              placeholder="Search podcasts, authors or topics..."
            />
          </div>
        </form>
      </div>
    </header>
  );
};
