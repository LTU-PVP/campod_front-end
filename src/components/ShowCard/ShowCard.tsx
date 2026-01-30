import type { ReactElement } from "react";
import type { Show } from "../../types/show";

interface ShowCardProps {
  show: Show;
}

export const ShowCard = ({ show }: ShowCardProps): ReactElement => {
  return (
    <article className="show-card">
      <img src={""} className="show-card-image" />

      <div className="show-card-content">
        <h3 className="show-card-title">{show.name}</h3>
        <p className="show-card-author">AUTHOR</p>
        <p className="show-card-description">{show.description}</p>

        <div className="show-card-footer">
          <span className="show-card-tag">CATEGORY</span>
          <span className="show-card-meta">0 episodes</span>
        </div>
      </div>
    </article>
  );
};
