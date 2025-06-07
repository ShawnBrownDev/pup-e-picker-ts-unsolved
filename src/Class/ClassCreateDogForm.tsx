import { Component } from "react";
import { defaultSelectedImage, dogPictures } from "../dog-pictures";
import { IFormProps } from "../types";

export class ClassCreateDogForm extends Component<IFormProps> {
  state = {
    name: "",
    description: "",
    image: defaultSelectedImage,
  };

  render() {
    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(event) => {
          event.preventDefault();
          this.props.addDog({
            name: this.state.name,
            image: this.state.image,
            description: this.state.description,
            isFavorite: false,
          });
          this.setState({
            name: "",
            description: "",
            image: defaultSelectedImage,
          });
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          value={this.state.name}
          onChange={(event) => {
            this.setState({ name: event.target.value });
          }}
          disabled={this.props.isLoading}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name="dog-description"
          id="dog-description"
          cols={80}
          rows={10}
          value={this.state.description}
          onChange={(event) => {
            this.setState({ description: event.target.value });
          }}
          disabled={this.props.isLoading}
        />
        <label htmlFor="picture">Select an Image</label>
        <select
          onChange={(event) => {
            this.setState({ image: event.target.value });
          }}
          disabled={this.props.isLoading}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" value="submit" disabled={this.props.isLoading} />
      </form>
    );
  }
}
