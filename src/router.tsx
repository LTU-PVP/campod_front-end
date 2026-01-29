import { createBrowserRouter } from "react-router";
import App from "./App";
import { Login } from "./features/login/Login";
import { Dashboard } from "./features/dashboard/Dashboard";

export const router = createBrowserRouter([
   {
    path: "/",
    element: <App />,
    errorElement: <div>Oops! Something went wrong.</div>,
    children: [
    {
        index: true,
        element: <Dashboard />,
      },
    ]
  },
  {
    path: "/login",
    element: <Login />,
  }, 
]);