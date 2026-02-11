import type { ReactElement } from "react";

export const Loading = (): ReactElement => {
  return (
    <>
      <div className="loader-wrapper">
        <div className="loader"></div>
      </div>
    </>
  );
};
