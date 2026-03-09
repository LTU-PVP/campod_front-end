import { Suspense, type ReactElement } from "react";
import { Await, useLoaderData, useNavigate } from "react-router";
import type {
  PodcastDetailResponse,
  CreateEpisodeRequest,
} from "../../../types";
import type { CollectionLoader } from "../../../loaders";
import { Loading } from "../../../components/Loading/Loading";
import { ErrorState } from "../../../components/ErrorState/ErrorState";
import { EpisodeForm } from "./EpisodeForm";
import { createEpisode } from "../../../api/podcast-service";

export const AdminPodcastDetails = (): ReactElement => {
  const { collection } = useLoaderData<CollectionLoader>();
  const navigate = useNavigate();

  const handleCreateEpisode = async (data: CreateEpisodeRequest) => {
    try {
      await createEpisode(data);
      navigate(".", { replace: true });
    } catch (err) {
      throw err;
    }
  };

  return (
    <div className="admin-podcast-container">
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
                  <p>
                    <strong>Creator:</strong> {show.creator_name}
                  </p>
                  <p>{show.description}</p>
                </article>
              </div>

              <div className="podcast-episodes-container">
                <h3>Episodes ({episodes.length})</h3>
                <ul className="episode-list">
                  {episodes.length > 0 ? (
                    episodes.map((episode) => (
                      <li key={episode.id} className="episode-item">
                        <div className="episode-content">
                          <h4>{episode.title}</h4>
                          <p>{episode.description}</p>
                          {episode.category && (
                            <span className="badge">{episode.category}</span>
                          )}
                        </div>
                      </li>
                    ))
                  ) : (
                    <p className="no-data">
                      No episodes found for this podcast.
                    </p>
                  )}
                </ul>
              </div>

              <section className="admin-add-episode-section">
                <div className="form-container">
                  <EpisodeForm
                    collectionId={show.id}
                    onSubmit={handleCreateEpisode}
                  />
                </div>
              </section>
            </>
          )}
        </Await>
      </Suspense>
    </div>
  );
};
