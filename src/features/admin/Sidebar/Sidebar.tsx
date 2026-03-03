import { Link, useLocation, useNavigate } from "react-router";
import type { ReactElement } from "react";
import { Logo } from "../../../components/Logo/Logo";
import { useAuth } from "../../../context/AuthContext";

export const Sidebar = (): ReactElement => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/admin") return location.pathname === "/admin";

    return location.pathname.startsWith(path);
  };

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
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
        <Link
          to="/admin/users"
          className={`nav-link ${isActive("/admin/users") ? "active" : ""}`}
        >
          <span className="material-symbols-outlined">people</span>
          <span>Users</span>
        </Link>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <span className="material-symbols-outlined">logout</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
