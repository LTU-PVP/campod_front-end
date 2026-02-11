import { Suspense, type ReactElement } from "react";
import { ShowCard } from "../../../components/ShowCard/ShowCard";
import { Await } from "react-router";
import type { Show } from "../../../types/show";
import { Loading } from "../../../components/Loading/Loading";
import { ErrorState } from "../../../components/ErrorState/ErrorState";

interface CollectionSectionProps {
  title: string;
  items: Promise<Show[]>;
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
          {(shows: Show[]) => (
            <>
              <h2 className="section-title">{title}</h2>
              <div className="shows-grid fade-in">
                {shows.map((show) => (
                  <ShowCard key={show.id} show={show} />
                ))}
              </div>
            </>
          )}
        </Await>
      </Suspense>
    </section>
  );
};
