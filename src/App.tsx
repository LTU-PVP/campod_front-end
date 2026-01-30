import type { ReactElement } from "react";
import { Outlet } from "react-router";
import { Player } from "./components/Player/Player";

export const App = (): ReactElement => {
  return (
    <>
      <Outlet />
      <Player />
    </>
  );
};

export default App;
