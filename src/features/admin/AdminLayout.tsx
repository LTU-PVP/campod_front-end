import { Outlet } from "react-router";
import type { ReactElement } from "react";
import { Sidebar } from "./Sidebar/Sidebar";

export function AdminLayout(): ReactElement {
  return (
    <div className="admin-container">
      <Sidebar />
      <main className="admin-main">
        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
