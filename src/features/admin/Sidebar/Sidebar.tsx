import { Link, useLocation } from "react-router";
import type { ReactElement } from "react";
import { Logo } from "../../../components/Logo/Logo";

export const Sidebar = (): ReactElement => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/admin") return location.pathname === "/admin";

    return location.pathname.startsWith(path);
  };

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <Logo />
      </div>

      <nav className="sidebar-nav">
        <Link
          to="/admin/podcasts"
          className={`nav-link ${isActive("/admin/podcasts") ? "active" : ""}`}
        >
          <span className="material-symbols-outlined">podcasts</span>
          <span>Podcasts</span>
        </Link>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn">
          <span className="material-symbols-outlined">logout</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
