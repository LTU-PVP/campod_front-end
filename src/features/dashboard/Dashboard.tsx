import { CollectionSection } from "./CollectionSection/CollectionSection";
import type { DashboardLoader } from "../../loaders";
import type { ReactElement } from "react";
import { useLoaderData, useSearchParams } from "react-router"; // Switched to useSearchParams
import { Header } from "./Header/Header";

export const Dashboard = (): ReactElement => {
  const { collections, episodes } = useLoaderData<DashboardLoader>();
  const [searchParams] = useSearchParams();
  const pageParam = searchParams.get("page");
  const showRecent = !pageParam || pageParam === "1";

  return (
    <>
      <Header />
      <main id="dashboard" className="container">
        {showRecent && (
          <CollectionSection title="Recent episodes" items={episodes} />
        )}
        <CollectionSection title="All shows" items={collections} />
      </main>
    </>
  );
};
