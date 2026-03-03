import { CollectionSection } from "./CollectionSection/CollectionSection";
import type { DashboardLoader } from "../../loaders";
import type { ReactElement } from "react";
import { useLoaderData } from "react-router";
import { Header } from "./Header/Header";

export const Dashboard = (): ReactElement => {
  const { collections, episodes } = useLoaderData<DashboardLoader>();

  return (
    <>
      <Header />
      <main id="dashboard" className="container">
        <CollectionSection title="Recent episodes" items={episodes} />
        <CollectionSection title="All shows" items={collections} />
      </main>
    </>
  );
};
