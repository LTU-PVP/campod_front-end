import { CollectionSection } from "./CollectionSection/CollectionSection";
import type { CollectionsLoader } from "../../loaders";
import type { ReactElement } from "react";
import { useLoaderData } from "react-router";
import { Header } from "./Header/Header";

export const Dashboard = (): ReactElement => {
  const { collections } = useLoaderData<CollectionsLoader>();

  return (
    <>
      <Header />

      <main id="dashboard" className="container">
        <CollectionSection title="All shows" items={collections} />
      </main>
    </>
  );
};
