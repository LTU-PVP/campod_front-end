import { Suspense, type ReactElement } from "react";
import { ShowCard } from "../../../components/ShowCard/ShowCard";
import { Await } from "react-router";
import type { Show } from "../../../types/show";

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
      <h2>{title}</h2>
      <Suspense fallback={<div>Loading {title}...</div>}>
        <Await
          resolve={items}
          errorElement={<p>Error loading shows. Please try again later.</p>}
        >
          {(shows) => (
            <div className="shows-grid">
              {shows.map((show) => (
                <ShowCard key={show.id} show={show} />
              ))}
            </div>
          )}
        </Await>
      </Suspense>
    </section>
  );
};
