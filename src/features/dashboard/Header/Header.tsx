import type { ReactElement, SubmitEventHandler } from "react";
import { Logo } from "../../../components/Logo/Logo";
import { useNavigate, useSearchParams } from "react-router";

export const Header = (): ReactElement => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") || "";

  const handleSearch: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("query");

    if (query) {
      navigate(`/search?q=${encodeURIComponent(query.toString())}`);
    }
  };

  return (
    <header>
      <div className="header-content container">
        <div className="header-flex">
          <Logo />
          <nav>
            <button className="logout-btn">Logout</button>
          </nav>
        </div>
        <form className="search-form" id="search-form" onSubmit={handleSearch}>
          <div className="search-input-wrapper">
            <span className="material-symbols-outlined search-icon">
              search
            </span>
            <input
              name="query"
              id="query"
              type="text"
              placeholder="Search podcasts, authors or topics..."
              key={query}
              defaultValue={query}
            />
          </div>
        </form>
      </div>
    </header>
  );
};
