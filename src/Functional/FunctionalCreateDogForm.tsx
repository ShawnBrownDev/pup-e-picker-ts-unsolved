import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { Requests } from "../api";
import toast from "react-hot-toast";

type FunctionalCreateDogProps = {
  refreshDogs: () => void;
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
};

// use this as your default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

export const FunctionalCreateDogForm = (props: FunctionalCreateDogProps) => {
  const { postDog } = Requests;
  const { refreshDogs, isLoading, setLoading } = props;
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    picture: defaultSelectedImage,
  });
  const { name, description, picture } = formValues;

  const handleInputChange = (name: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const newDog = {
      name,
      description,
      image: picture,
      isFavorite: false,
    };
    setLoading(true);
    postDog(newDog)
      .then(() => {
        refreshDogs();
        setFormValues({
          name: "",
          description: "",
          picture: defaultSelectedImage,
        });
      })
      .then(() => {
        toast.success(`Dog Created: ${name}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <h4>Create a New Dog</h4>

      <label htmlFor="name">Dog Name</label>
      <input
        id="name"
        type="text"
        disabled={isLoading}
        value={name}
        onChange={(e) => handleInputChange("name", e.target.value)}
      />

      <label htmlFor="description">Dog Description</label>
      <textarea
        id="description"
        cols={80}
        rows={10}
        disabled={isLoading}
        value={description}
        onChange={(e) => handleInputChange("description", e.target.value)}
      ></textarea>

      <label htmlFor="picture">Select an Image</label>
      <select
        id="picture"
        onChange={(e) => handleInputChange("picture", e.target.value)}
        value={picture}
        disabled={isLoading}
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" disabled={isLoading} />
    </form>
  );
};
