import type { ReactElement } from "react";
import type { Episode } from "../../types";
import { Link } from "react-router";
import { usePlayerStore } from "../../store/usePlayerStore";
import "../ShowCard/ShowCard.css";

interface EpisodeCardProps {
  episode: Episode;
}

export const EpisodeCard = ({ episode }: EpisodeCardProps): ReactElement => {
  const { currentEpisode, isPlaying } = usePlayerStore();
  const isThisEpisodePlaying = isPlaying && currentEpisode?.id === episode.id;

  return (
    <Link
      to={`/podcast/${episode.collection_id}/episode/${episode.id}`}
      className="show-card-link"
    >
      <article className="show-card">
        <div className="show-card-content">
          {isThisEpisodePlaying && (
            <span className="playing-badge">Now Playing</span>
          )}

          <h3 className="show-card-title">{episode.title}</h3>
          <p className="show-card-author">{episode.collection_name}</p>
          <p className="show-card-description">{episode.description}</p>

          <div className="show-card-footer">
            <span className="show-card-meta">Episode #{episode.id}</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default EpisodeCard;
