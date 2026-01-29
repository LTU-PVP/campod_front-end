import type { ReactElement } from "react";
import { Header } from "./Header/Header";
import { Player } from "../../components/Player/Player";
import type { Show } from "../../types/show";
import { CollectionSection } from "./CollectionSection/CollectionSection";

const PODCASTS: Show[] = [
  {
    id: "1",
    title: "Podcast Title",
    author: "Author",
    description: "Podcast description",
    category: "Category",
    episodeCount: 2,
    image:
      "https://images.unsplash.com/photo-1762532986026-92782fe01fbb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "2",
    title: "Podcast Title",
    author: "Author",
    description: "Podcast description",
    category: "Category",
    episodeCount: 2,
    image:
      "https://images.unsplash.com/photo-1762532986026-92782fe01fbb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export const Dashboard = (): ReactElement => {
  return (
    <>
      <Header />

      <main id="dashboard" className="container">
        <CollectionSection title="All podcasts" items={PODCASTS} />
      </main>

      <Player />
    </>
  );
};
