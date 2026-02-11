import { createBrowserRouter } from "react-router";
import App from "./App";
import { Login } from "./features/login/Login";
import { Dashboard } from "./features/dashboard/Dashboard";
import { collectionLoader, collectionsLoader } from "./loaders";
import { Podcast } from "./features/podcast/Podcast";
import { Search } from "./features/search/Search";
import { Signup } from "./features/signup/Signup";

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
      {
        path: "search",
        element: <Search />,
        // loader: searchLoader,
      },
      { path: "/podcast/:id", element: <Podcast />, loader: collectionLoader },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);
