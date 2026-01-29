import type { ReactElement } from "react";
import { ShowCard } from "../../../components/ShowCard/ShowCard";
import type { Show } from "../../../types/show";

type CollectionSectionProps = {
  title: string;
  items: Show[];
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
      <h2>{title}</h2>
      <div className="shows-grid">
        {items.map((item) => (
          <ShowCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};
