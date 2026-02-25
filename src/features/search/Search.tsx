import { Suspense, type ReactElement } from "react";
import { Header } from "../dashboard/Header/Header";
import { Await, Link, useLoaderData } from "react-router";
import type { SearchEpisodesLoader } from "../../loaders";
import type { Episode, SearchResponse } from "../../types/show";
import { usePlayerStore } from "../../store/usePlayerStore";

export const Search = (): ReactElement => {
  const { response, query } = useLoaderData<SearchEpisodesLoader>();
  const { currentEpisode, isPlaying, setEpisode, togglePlay } =
    usePlayerStore();

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

        <Suspense fallback={<p className="loading">Searching...</p>}>
          <Await
            resolve={response}
            errorElement={<p>Error loading results. Please try again.</p>}
          >
            {(resolvedData: SearchResponse) => {
              const grouped = (resolvedData.episodes || []).reduce(
                (acc, episode) => {
                  const name = episode.collection_name || "Unknown Podcast";
                  if (!acc[name]) {
                    acc[name] = {
                      id: episode.collection_id,
                      episodes: [],
                    };
                  }
                  acc[name].episodes.push(episode);
                  return acc;
                },
                {} as Record<string, { id: number; episodes: Episode[] }>,
              );

              const groupNames = Object.keys(grouped);

              if (groupNames.length === 0 && query) {
                return (
                  <p className="no-results">No matches found for "{query}".</p>
                );
              }

              return (
                <div className="search-results-groups">
                  {groupNames.map((name) => {
                    const { id, episodes } = grouped[name];

                    return (
                      <div key={name} className="podcast-episodes-container">
                        <Link to={`/podcast/${id}`} className="show-card-link">
                          <h2 className="collection-group-title">{name}</h2>
                        </Link>

                        <ul className="episode-list">
                          {episodes.map((episode) => {
                            const isCurrent = currentEpisode?.id === episode.id;
                            const iconName =
                              isCurrent && isPlaying
                                ? "pause_circle"
                                : "play_circle";

                            return (
                              <li
                                key={episode.id}
                                className="episode-item"
                                onClick={(_) => {
                                  isCurrent
                                    ? togglePlay()
                                    : setEpisode(episode);
                                }}
                              >
                                <span className="material-symbols-outlined play-icon">
                                  {iconName}
                                </span>
                                <div className="episode-content">
                                  <h3>{episode.title}</h3>
                                  <p>{episode.description}</p>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              );
            }}
          </Await>
        </Suspense>
      </main>
    </>
  );
};
