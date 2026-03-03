import type { ReactElement } from "react";
import type { PodcastDetailResponse } from "../../../types";
import type { CollectionLoader } from "../../../loaders";
import { Await, useLoaderData } from "react-router";

export const AdminPodcastDetails = (): ReactElement => {
  const { collection } = useLoaderData<CollectionLoader>();

  return (
    <>
      <h2>Podcasts</h2>
      <Await resolve={collection}>
        {(resolvedCollection: PodcastDetailResponse) => {
          return <h1>{resolvedCollection.show.name}</h1>;
        }}
      </Await>
    </>
  );
};
