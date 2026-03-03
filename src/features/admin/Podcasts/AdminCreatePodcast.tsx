import type { ReactElement } from "react";
import { useNavigate } from "react-router";
import { createCollection } from "../../../api/podcast-service";
import { PodcastForm } from "./PodcastForm";
import type { CreateShowRequest } from "../../../types";

export const AdminCreatePodcast = (): ReactElement => {
  const navigate = useNavigate();

  const handleOnSubmit = async (data: CreateShowRequest) => {
    await createCollection(data);
    navigate("/admin/podcasts");
  };

  return (
    <>
      <h2>Create Podcasts</h2>
      <PodcastForm onSubmit={handleOnSubmit} />
    </>
  );
};
