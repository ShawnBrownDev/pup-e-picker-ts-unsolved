import { useState } from 'react';
import { Requests, APIError } from '../api';
import { TDog } from '../types';
import toast from 'react-hot-toast';

export const useDogOperations = () => {
  const [dogs, setDogs] = useState<TDog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  const refetchData = async () => {
    try {
      setIsLoading(true);
      const fetchedDogs = await Requests.getAllDogs();
      setDogs(fetchedDogs);
      setIsConnected(true);
    } catch (error) {
      if (error instanceof APIError) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error('Failed to connect to the server');
      }
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  const addDog = async (dog: Omit<TDog, 'id'>) => {
    try {
      setIsLoading(true);
      await Requests.postDog(dog);
      await refetchData();
      toast.success('Dog Created');
    } catch (error) {
      if (error instanceof APIError) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error('Failed to create dog');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const deleteDog = async (id: number) => {
    try {
      setIsLoading(true);
      await Requests.deleteDog(id);
      await refetchData();
      toast.success('Dog Deleted');
    } catch (error) {
      if (error instanceof APIError) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error('Failed to delete dog');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updateDog = async (id: number, isFavorite: boolean) => {
    try {
      setIsLoading(true);
      await Requests.updateDog(id, isFavorite);
      await refetchData();
      toast.success(`Dog ${isFavorite ? 'favorited' : 'unfavorited'}`);
    } catch (error) {
      if (error instanceof APIError) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error('Failed to update dog');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    dogs,
    isLoading,
    isConnected,
    refetchData,
    addDog,
    deleteDog,
    updateDog,
  };
}; 