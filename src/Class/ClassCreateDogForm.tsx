import { Component } from "react";
import { dogPictures } from "../dog-pictures";
import { Requests } from "../api";
import toast from "react-hot-toast";

type ClassCreateDogProps = {
  refreshDogs: () => void;
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
};

export class ClassCreateDogForm extends Component<ClassCreateDogProps> {
  state = {
    name: "",
    description: "",
    picture: dogPictures.BlueHeeler,
  };

  handleInputChange = (name: string, value: string) => {
    this.setState((prev) => ({ ...prev, [name]: value }));
  };

  handleSubmit = () => {
    const { name, description, picture } = this.state;
    const { refreshDogs, setLoading } = this.props;
    const newDog = {
      name,
      description,
      image: picture,
      isFavorite: false,
    };
    setLoading(true);
    Requests.postDog(newDog)
      .then(() => {
        refreshDogs();
        this.setState({
          name: "",
          description: "",
          picture: dogPictures.BlueHeeler,
        });
      })
      .then(() => {
        toast.success(`Dog Created: ${name}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  render() {
    const { name, description, picture } = this.state;
    const { isLoading } = this.props;
    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
          this.handleSubmit();
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => this.handleInputChange("name", e.target.value)}
          disabled={isLoading}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          id="description"
          cols={80}
          rows={10}
          value={description}
          onChange={(e) =>
            this.handleInputChange("description", e.target.value)
          }
          disabled={isLoading}
        />
        <label htmlFor="picture">Select an Image</label>
        <select
          id="picture"
          onChange={(e) => this.handleInputChange("picture", e.target.value)}
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
        <input type="submit" value="submit" disabled={isLoading} />
      </form>
    );
  }
}
