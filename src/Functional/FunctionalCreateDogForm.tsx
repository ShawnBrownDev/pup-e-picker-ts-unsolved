import { useState } from "react";
import { defaultSelectedImage, dogPictures } from "../dog-pictures";
import { IFormProps } from "../types";

export const FunctionalCreateDogForm = ({ addDog, isLoading }: IFormProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(defaultSelectedImage);

  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        addDog({
          name: name,
          image: image,
          description: description,
          isFavorite: false,
        });
        setName("");
        setDescription("");
        setImage(defaultSelectedImage);
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        disabled={isLoading}
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name="dog-description"
        id="dog-description"
        cols={80}
        rows={10}
        disabled={isLoading}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        id="dog-picture"
        value={image}
        disabled={isLoading}
        onChange={(event) => setImage(event.target.value)}
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
