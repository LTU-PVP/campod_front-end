import { createBrowserRouter } from "react-router";
import App from "./App";
import { Login } from "./features/login/Login";
import { Dashboard } from "./features/dashboard/Dashboard";
import { collectionLoader, collectionsLoader } from "./loaders";
import { Podcast } from "./features/podcast/Podcast";

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
      { path: "/podcast/:id", element: <Podcast />, loader: collectionLoader },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
