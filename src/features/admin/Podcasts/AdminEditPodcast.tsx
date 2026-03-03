import type { ReactElement } from "react";
import type { CreateShowRequest, PodcastDetailResponse } from "../../../types";
import { createCollection } from "../../../api/podcast-service";
import { PodcastForm } from "./PodcastForm";
import type { CollectionLoader } from "../../../loaders";
import { Await, useLoaderData } from "react-router";

export const AdminEditPodcast = (): ReactElement => {
  const { collection } = useLoaderData<CollectionLoader>();

  const handleOnSubmit = async (data: CreateShowRequest) => {
    await createCollection(data);
  };

  return (
    <>
      <h2>Edit Podcasts</h2>
      <Await resolve={collection}>
        {(resolvedCollection: PodcastDetailResponse) => {
          const handleOnSubmit = async (data: CreateShowRequest) => {
            console.log("Updating podcast:", resolvedCollection.show.id, data);
          };

          return (
            <PodcastForm
              key={resolvedCollection.show.id}
              onSubmit={handleOnSubmit}
              initialValues={resolvedCollection.show}
              isEdit={true}
            />
          );
        }}
      </Await>
    </>
  );
};
