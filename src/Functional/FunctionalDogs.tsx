import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";
import { Requests } from "../api";

type FunctionalDogsProps = {
  dogs: Dog[];
  refreshDogs: () => void;
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
};

export const FunctionalDogs = (props: FunctionalDogsProps) => {
  const { dogs, refreshDogs, isLoading, setLoading } = props;
  const { deleteDog, updateDog } = Requests;

  const handleDeleteClick = (id: number) => {
    setLoading(true);
    deleteDog(id)
      .then(() => {
        refreshDogs();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleFavoriteClick = (id: number, isFavorite: boolean) => {
    setLoading(true);
    updateDog(id, !isFavorite)
      .then(() => {
        refreshDogs();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {dogs.map((dog) => {
        const { isFavorite } = dog;
        const id = dog.id || 0;

        return (
          <DogCard
            dog={dog}
            key={id}
            onTrashIconClick={() => handleDeleteClick(id)}
            onHeartClick={() => handleFavoriteClick(id, isFavorite)}
            onEmptyHeartClick={() => handleFavoriteClick(id, isFavorite)}
            isLoading={isLoading}
          />
        );
      })}
      ;
    </>
  );
};
