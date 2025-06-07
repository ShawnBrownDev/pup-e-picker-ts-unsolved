// Add your own custom types in here

import React, { ReactNode } from 'react';

export type TDog = {
  id: number;
  name: string;
  image: string;
  description: string;
  isFavorite: boolean;
};

export type TTab = 'none' | 'favorited' | 'unfavorited' | 'createDog';

//Prop Interfaces

//Curious if there was a way to make one section prop interface for both class and functional definitions
//I know I could have defined it like this - making both setters optional:

// export interface ISectionProps {
//   children?: ReactNode;
//   dogs: TDog[];
//   activeTab: TTab;
//   setActiveTab?: React.Dispatch<React.SetStateAction<TTab>>;
//   handleActiveTab?: (activeTab: TTab) => void;
// }

//but it feels like it goes against type safety

export interface IFunctionalSectionProps {
  children?: ReactNode;
  dogs: TDog[];
  activeTab: TTab;
  setActiveTab: React.Dispatch<React.SetStateAction<TTab>>;
}

export interface IClassSectionProps {
  children?: ReactNode;
  dogs: TDog[];
  activeTab: TTab;
  handleActiveTab: (activeTab: TTab) => void;
}

export interface IFormProps {
  addDog: (dog: Omit<TDog, 'id'>) => void;
  isLoading: boolean;
}

export interface IDisplayDogs {
  dogs: TDog[];
  deleteDog: (id: number) => void;
  updateDog: (id: number, isFavorite: boolean) => void;
  activeTab: TTab;
  isLoading: boolean;
}
