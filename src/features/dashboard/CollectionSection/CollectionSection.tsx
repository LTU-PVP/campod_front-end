import { Suspense, type ReactElement } from "react";
import { ShowCard } from "../../../components/ShowCard/ShowCard";
import { Await } from "react-router";
import type { CollectionsResponse, SearchResponse } from "../../../types";
import { Loading } from "../../../components/Loading/Loading";
import { ErrorState } from "../../../components/ErrorState/ErrorState";
import { Pagination } from "../../../components/Pagination/Pagination";
import EpisodeCard from "../../../components/EpisodeCard/EpisodeCard";

type SectionData = CollectionsResponse | SearchResponse;

interface CollectionSectionProps {
  title: string;
  items: Promise<SectionData>;
}

const isCollectionsResponse = (data: any): data is CollectionsResponse => {
  return data && typeof data === "object" && "collections" in data;
};

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
          errorElement={<ErrorState message="Error fetching content" />}
        >
          {(resolvedData: SectionData) => {
            const isEmpty = isCollectionsResponse(resolvedData)
              ? resolvedData.collections.length === 0
              : resolvedData.episodes.length === 0;

            if (isEmpty) {
              return (
                <div className="empty-state">
                  <h2 className="section-title">{title}</h2>
                  <p>No items found.</p>
                </div>
              );
            }

            return (
              <>
                <h2 className="section-title">{title}</h2>
                <div className="shows-grid fade-in">
                  {isCollectionsResponse(resolvedData)
                    ? resolvedData.collections.map((show) => (
                        <ShowCard key={show.id} show={show} />
                      ))
                    : resolvedData.episodes.map((episode) => (
                        <EpisodeCard key={episode.id} episode={episode} />
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
