import type { ReactElement } from "react";
import { createCollection } from "../../../api/podcast-service";
import { PodcastForm } from "./PodcastForm";
import type { CreateShowRequest } from "../../../types";

export const AdminCreatePodcast = (): ReactElement => {
  const handleOnSubmit = async (data: CreateShowRequest) => {
    await createCollection(data);
  };

  return (
    <>
      <h2>Create Podcasts</h2>
      <PodcastForm onSubmit={handleOnSubmit} />
    </>
  );
};
