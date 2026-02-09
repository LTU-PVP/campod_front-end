import type { ReactElement } from "react";
import type { Show } from "../../types/show";
import { Link } from "react-router";

interface ShowCardProps {
  show: Show;
}

export const ShowCard = ({ show }: ShowCardProps): ReactElement => {
  return (
    <Link to={`/podcast/${show.id}`} className="show-card-link">
      <article className="show-card">
        <img src={"https://placehold.co/300x300"} className="show-card-image" />

        <div className="show-card-content">
          <h3 className="show-card-title">{show.name}</h3>
          <p className="show-card-author">{show.creator_name}</p>
          <p className="show-card-description">{show.description}</p>

          <div className="show-card-footer">
            <span className="show-card-tag">CATEGORY</span>
            <span className="show-card-meta">0 episodes</span>
          </div>
        </div>
      </article>
    </Link>
  );
};
