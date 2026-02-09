import type { CollectionLoader, CollectionsLoader } from "../../loaders";
import { Suspense, type ReactElement } from "react";
import { Await, useLoaderData } from "react-router";
import type { PodcastDetailResponse } from "../../types/show";

export const Podcast = (): ReactElement => {
  const { collection } = useLoaderData<CollectionLoader>();

  return (
    <>
      <header id="podcast-header">
        <div className="container">
          <span className="material-symbols-outlined">chevron_left</span>Back
        </div>
      </header>
      <main id="podcast-details" className="container">
        <Suspense fallback={<div>Loading podcast...</div>}>
          <Await resolve={collection}>
            {({ show, episodes }: PodcastDetailResponse) => (
              <>
                <div className="podcast-information-container">
                  <img
                    src={"https://placehold.co/300x300"}
                    className="podcast-image"
                    alt={show.name}
                  />
                  <article className="podcast-info">
                    <h1>{show.name}</h1>
                    <p>{show.creator_name}</p>
                    <p>{show.description}</p>
                  </article>
                </div>
                <div className="podcast-episodes-container">
                  <h2>Episodes ({episodes.length})</h2>
                  <ul className="episode-list">
                    {episodes.map((episode) => (
                      <li key={episode.id} className="episode-item">
                        <h3>{episode.title}</h3>
                        <p>{episode.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </Await>
        </Suspense>
      </main>
    </>
  );
};
