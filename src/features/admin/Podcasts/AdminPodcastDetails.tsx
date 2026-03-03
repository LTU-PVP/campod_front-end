import { Suspense, type ReactElement } from "react";
import type { PodcastDetailResponse } from "../../../types";
import type { CollectionLoader } from "../../../loaders";
import { Await, useLoaderData } from "react-router";
import { Loading } from "../../../components/Loading/Loading";
import { ErrorState } from "../../../components/ErrorState/ErrorState";

export const AdminPodcastDetails = (): ReactElement => {
  const { collection } = useLoaderData<CollectionLoader>();

  return (
    <>
      <h2>Podcasts</h2>
      <Suspense fallback={<Loading />}>
        <Await
          resolve={collection}
          errorElement={<ErrorState message="Error fetching podcast" />}
        >
          {({ show, episodes }: PodcastDetailResponse) => (
            <>
              <div className="podcast-information-container">
                <img
                  src={show.cover_image_path ?? ""}
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
                <h3>Episodes</h3>
                <ul className="episode-list">
                  {episodes.map((episode) => (
                    <li key={episode.id} className="episode-item">
                      <div className="episode-content">
                        <h4>{episode.title}</h4>
                        <p>{episode.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </Await>
      </Suspense>
    </>
  );
};
