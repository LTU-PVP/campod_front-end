import type { ReactElement } from "react";
import { useLoaderData } from "react-router";
import type { CollectionsLoader } from "../../../loaders";

export const AdminPodcasts = (): ReactElement => {
  const { collections } = useLoaderData<CollectionsLoader>();

  return (
    <>
      <h2>Admin Podcasts</h2>
    </>
  );
};
