import type { CollectionLoader } from "../../loaders";
import { Suspense, type ReactElement } from "react";
import { Await, useLoaderData, useNavigate } from "react-router";
import type { PodcastDetailResponse } from "../../types/show";
import { usePlayerStore } from "../../store/usePlayerStore";

export const Podcast = (): ReactElement => {
  const { collection } = useLoaderData<CollectionLoader>();

  const navigate = useNavigate();

  const setEpisode = usePlayerStore((state) => state.setEpisode);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <header id="podcast-header">
        <div
          className="container"
          onClick={handleBack}
          style={{ cursor: "pointer" }}
        >
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
                  <h2>Episodes</h2>
                  <ul className="episode-list">
                    {episodes.map((episode) => (
                      <li key={episode.id} className="episode-item">
                        <span
                          className="material-symbols-outlined play-icon"
                          onClick={() => setEpisode(episode)}
                        >
                          play_circle
                        </span>

                        <div className="episode-content">
                          <h3>{episode.title}</h3>
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
      </main>
    </>
  );
};
