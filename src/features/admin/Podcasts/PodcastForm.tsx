import { useState, type ReactElement } from "react";
import { Input } from "../../../components/Input";
import { Textarea } from "../../../components/Textarea";
import type { CreateShowRequest } from "../../../types";

interface PodcastFormProps {
  onSubmit: (data: CreateShowRequest) => Promise<void>;
  initialValues?: { name: string; description: string };
  isEdit?: boolean;
}

export const PodcastForm = ({
  onSubmit,
  initialValues,
  isEdit = false,
}: PodcastFormProps): ReactElement => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    name: initialValues?.name ?? "",
    description: initialValues?.description ?? "",
  });

  const isFormEmpty = Object.values(values).some((v) => v.trim() === "");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  const handleOnSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (isFormEmpty) {
      setError("Please fill out all fields");
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit({
        name: values.name,
        description: values.description,
        creator_name: "Tobias",
      });
      if (!isEdit) {
        setValues({ name: "", description: "" });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="podcast-form-wrapper">
      <form className="podcast-form" onSubmit={handleOnSubmit}>
        <Input
          label="Name"
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          autoFocus={true}
          autoComplete="none"
        />

        <Textarea
          label="Description"
          name="description"
          value={values.description}
          onChange={handleChange}
        />

        {error && <div className="error-message">{error}</div>}

        <button type="submit" disabled={isFormEmpty || isLoading}>
          {isLoading
            ? isEdit
              ? "Saving..."
              : "Creating..."
            : isEdit
              ? "Update Podcast"
              : "Create Podcast"}
        </button>
      </form>
    </div>
  );
};
