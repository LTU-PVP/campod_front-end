import type { ReactElement } from "react";

interface ShowCardProps {
  image: string;
  title: string;
  author: string;
  description: string;
  category: string;
  episodeCount: number;
}

export const ShowCard = ({
  image,
  title,
  author,
  description,
  category,
  episodeCount,
}: ShowCardProps): ReactElement => {
  return (
    <article className="show-card">
      <img src={image} alt={title} className="show-card-image" />

      <div className="show-card-content">
        <h3 className="show-card-title">{title}</h3>
        <p className="show-card-author">{author}</p>
        <p className="show-card-description">{description}</p>

        <div className="show-card-footer">
          <span className="show-card-tag">{category}</span>
          <span className="show-card-meta">{episodeCount} episodes</span>
        </div>
      </div>
    </article>
  );
};
