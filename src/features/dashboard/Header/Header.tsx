import type { ReactElement, SubmitEventHandler } from "react";
import { Logo } from "../../../components/Logo/Logo";
import { Link, useNavigate, useSearchParams } from "react-router";
import { useAuth } from "../../../context/AuthContext";

export const Header = (): ReactElement => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") || "";

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

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
            {user ? (
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <Link to="/login" className="logout-btn">
                Login
              </Link>
            )}
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
              placeholder="Search eposides..."
              key={query}
              defaultValue={query}
            />
          </div>
        </form>
      </div>
    </header>
  );
};
