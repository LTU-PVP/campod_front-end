import { createBrowserRouter } from "react-router";
import App from "./App";
import { Login } from "./features/login/Login";
import { Dashboard } from "./features/dashboard/Dashboard";
import { collectionsLoader } from "./loaders";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Oops! Something went wrong.</div>,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: collectionsLoader,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
