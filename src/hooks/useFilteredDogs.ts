import { useMemo } from 'react';
import { TDog, TTab } from '../types';

export const useFilteredDogs = (dogs: TDog[], activeTab: TTab) => {
  return useMemo(() => {
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
  }, [dogs, activeTab]);
}; 