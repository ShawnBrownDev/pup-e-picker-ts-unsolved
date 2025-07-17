// Add your own custom types in here
export type Dog = {
  id?: number;
  name: string;
  description: string;
  image: string;
  isFavorite: boolean;
};

export type DogView = "allDogs" | "favoriteDogs" | "unfavoriteDogs" | "createDog";


