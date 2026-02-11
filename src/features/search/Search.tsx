import type { ReactElement } from "react";
import { Header } from "../dashboard/Header/Header";
import { useSearchParams } from "react-router";

export const Search = (): ReactElement => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") || "";

  return (
    <>
      <Header />

      <main id="dashboard" className="container">
        <h3 className="search-results">
          {query ? (
            <>
              Search results for <span>"{query}"</span>
            </>
          ) : (
            <>Enter a search term</>
          )}
        </h3>
      </main>
    </>
  );
};
