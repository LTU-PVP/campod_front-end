import type { ReactElement } from "react";
import { Outlet } from "react-router";

export const App = (): ReactElement => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default App;
