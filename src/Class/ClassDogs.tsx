import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Requests } from "../api";
import { Dog } from "../types";

type ClassDogsProps = {
  dogs: Dog[];
  refreshDogs: () => void;
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
};

export class ClassDogs extends Component<ClassDogsProps> {
  handleDeleteClick = (id: number) => {
    const { setLoading, refreshDogs } = this.props;
    setLoading(true);
    Requests.deleteDog(id)
      .then(() => {
        refreshDogs();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  handleFavoriteClick = (id: number, isFavorite: boolean) => {
    const { setLoading, refreshDogs } = this.props;
    setLoading(true);
    Requests.updateDog(id, !isFavorite)
      .then(() => {
        refreshDogs();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  render() {
    const { dogs, isLoading } = this.props;

    return (
      <>
        {dogs.map((dog) => {
          const { isFavorite } = dog;
          const id = dog.id || 0;

          return (
            <DogCard
              dog={dog}
              key={id}
              onTrashIconClick={() => this.handleDeleteClick(id)}
              onHeartClick={() => this.handleFavoriteClick(id, isFavorite)}
              onEmptyHeartClick={() => this.handleFavoriteClick(id, isFavorite)}
              isLoading={isLoading}
            />
          );
        })}
      </>
    );
  }
}
