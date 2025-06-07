import { DogCard } from '../Shared/DogCard';
import { IDisplayDogs } from '../types';

export const FunctionalDogs = ({
  dogs,
  deleteDog,
  updateDog,
  activeTab,
  isLoading,
}: IDisplayDogs) => {
  return (
    <>
      {dogs
        .filter((dog) => {
          switch (activeTab) {
            case 'favorited':
              return dog.isFavorite;
            case 'unfavorited':
              return !dog.isFavorite;
            case 'createDog':
              return false;
            case 'none':
              return dog;
          }
        })
        .map((dog) => (
          <DogCard
            key={dog.id}
            dog={dog}
            onEmptyHeartClick={() => {
              updateDog(dog.id, true);
            }}
            onHeartClick={() => {
              updateDog(dog.id, false);
            }}
            onTrashIconClick={() => {
              deleteDog(dog.id);
            }}
            isLoading={isLoading}
          />
        ))}
    </>
  );
};
