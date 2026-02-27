import { Suspense, type ReactElement } from "react";
import { ShowCard } from "../../../components/ShowCard/ShowCard";
import { Await } from "react-router";
import type { CollectionsResponse } from "../../../types/show";
import { Loading } from "../../../components/Loading/Loading";
import { ErrorState } from "../../../components/ErrorState/ErrorState";
import { Pagination } from "../../../components/Pagination/Pagination";

interface CollectionSectionProps {
  title: string;
  items: Promise<CollectionsResponse>;
}

export const CollectionSection = ({
  title,
  items,
}: CollectionSectionProps): ReactElement => {
  return (
    <section
      className="collection-section"
      id={`collection-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <Suspense fallback={<Loading />}>
        <Await
          resolve={items}
          errorElement={<ErrorState message="Error fetching podcasts" />}
        >
          {(resolvedData: CollectionsResponse) => {
            const { collections: shows } = resolvedData;

            if (shows.length === 0) {
              return (
                <div className="empty-state">
                  <h2 className="section-title">{title}</h2>
                  <p>No shows found in this collection.</p>
                </div>
              );
            }

            return (
              <>
                <h2 className="section-title">{title}</h2>
                <div className="shows-grid fade-in">
                  {shows.map((show) => (
                    <ShowCard key={show.id} show={show} />
                  ))}
                </div>

                <Pagination
                  currentPage={resolvedData.current_page}
                  totalPages={resolvedData.pages}
                />
              </>
            );
          }}
        </Await>
      </Suspense>
    </section>
  );
};
