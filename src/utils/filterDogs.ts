import { TDog, TTab } from '../types';

export const filterDogs = (dogs: TDog[], activeTab: TTab): TDog[] => {
  switch (activeTab) {
    case 'favorited':
      return dogs.filter(dog => dog.isFavorite);
    case 'unfavorited':
      return dogs.filter(dog => !dog.isFavorite);
    case 'createDog':
      return [];
    case 'none':
    default:
      return dogs;
  }
}; 