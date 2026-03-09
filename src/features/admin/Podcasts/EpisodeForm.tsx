import { useState, type ReactElement } from "react";
import { Input } from "../../../components/Input";
import { Textarea } from "../../../components/Textarea";
import type { CreateEpisodeRequest } from "../../../types";
import { uploadAudio } from "../../../api/podcast-service";

interface EpisodeFormProps {
  onSubmit: (data: CreateEpisodeRequest) => Promise<void>;
  initialValues?: { name: string; description: string };
  isEdit?: boolean;
}

export const EpisodeForm = ({
  onSubmit,
  initialValues,
  isEdit = false,
  collectionId, // Pass this in from the parent component (the current show)
}: EpisodeFormProps & { collectionId: number }): ReactElement => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const [values, setValues] = useState({
    title: initialValues?.name ?? "",
    description: initialValues?.description ?? "",
    category: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleOnSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!values.title || (!file && !isEdit)) {
      setError("Please provide a title and an audio file");
      return;
    }

    setIsLoading(true);
    try {
      let filePath = "";
      if (file) {
        const uploadRes = await uploadAudio(file);
        filePath = uploadRes.file_path;
      }

      await onSubmit({
        title: values.title,
        description: values.description,
        collection_id: collectionId,
        file_path: filePath,
        category: values.category,
      });

      if (!isEdit) {
        setValues({ title: "", description: "", category: "" });
        setFile(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="episode-form-wrapper">
      <form className="episode-form" onSubmit={handleOnSubmit}>
        <Input
          type="text"
          label="Episode Title"
          name="title"
          value={values.title}
          onChange={handleChange}
        />

        <Textarea
          label="Description"
          name="description"
          value={values.description}
          onChange={handleChange}
        />

        {!isEdit && (
          <div className="file-input-group">
            <label>Audio File (mp3, wav, m4a, ogg)</label>
            <input type="file" accept="audio/*" onChange={handleFileChange} />
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        <button type="submit" disabled={isLoading}>
          {isLoading
            ? "Uploading..."
            : isEdit
              ? "Update Episode"
              : "Publish Episode"}
        </button>
      </form>
    </div>
  );
};
