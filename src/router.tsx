import { createBrowserRouter } from "react-router";
import App from "./App";
import { Login } from "./features/auth/Login";
import { Dashboard } from "./features/dashboard/Dashboard";
import {
  collectionLoader,
  collectionsLoader,
  searchEpisodesLoader,
} from "./loaders";
import { Podcast } from "./features/podcast/Podcast";
import { Search } from "./features/search/Search";
import { Signup } from "./features/auth/Signup";
import { AdminLayout } from "./features/admin/AdminLayout";
import { AdminDashboard } from "./features/admin/Dashboard/AdminDashboard";
import { AdminPodcasts } from "./features/admin/Podcasts/AdminPodcasts";
import { AdminCreatePodcast } from "./features/admin/Podcasts/AdminCreatePodcast";
import { AdminEditPodcast } from "./features/admin/Podcasts/AdminEditPodcast";
import { AdminPodcastDetails } from "./features/admin/Podcasts/AdminPodcastDetails";

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
        loader: searchEpisodesLoader,
      },
      { path: "podcast/:id", element: <Podcast />, loader: collectionLoader },
    ],
  },
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "podcasts",
        children: [
          {
            index: true,
            element: <AdminPodcasts />,
            loader: collectionsLoader,
          },
          {
            path: ":id",
            element: <AdminPodcastDetails />,
            loader: collectionLoader,
          },
          {
            path: "create",
            element: <AdminCreatePodcast />,
          },
          {
            path: ":id/edit",
            element: <AdminEditPodcast />,
            loader: collectionLoader,
          },
        ],
      },
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
