import { TDog } from './types';

export const baseUrl = 'http://localhost:3000';

export const Requests = {
  // should return a promise with all dogs in the database
  getAllDogs: async (): Promise<TDog[]> => {
    const allDogs = await fetch(`${baseUrl}/dogs`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return allDogs.json();
  },
  // should create a dog in the database from a partial dog object
  // and return a promise with the result
  postDog: async (dog: Omit<TDog, 'id'>) => {
    return await fetch(`${baseUrl}/dogs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dog),
    });
  },

  // should delete a dog from the database
  deleteDog: async (id: number) => {
    await fetch(`${baseUrl}/dogs/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
  },

  updateDog: async (id: number, isFavorite: boolean) => {
    await fetch(`${baseUrl}/dogs/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isFavorite: isFavorite }),
    });
  },

  // Just a dummy function for use in the playground
  dummyFunction: () => {
    console.log('dummy stuff');
  },
};
