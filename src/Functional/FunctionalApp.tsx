import { useEffect, useState } from 'react';
import { FunctionalCreateDogForm } from './FunctionalCreateDogForm';
import { FunctionalDogs } from './FunctionalDogs';
import { FunctionalSection } from './FunctionalSection';
import { Requests } from '../api';
import { TDog, TTab } from '../types';
import toast from 'react-hot-toast';

export function FunctionalApp() {
  const [dogs, setDogs] = useState<TDog[]>([]);
  const [activeTab, setActiveTab] = useState<TTab>('none');
  // const [isFavoriteActive, setIsFavoriteActive] = useState(false);
  // const [isNotFavoriteActive, setIsNotFavoriteActive] = useState(false);
  // const [isCreateDogActive, setIsCreateDogActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    refetchData();
  }, []);

  const refetchData = async () => {
    setDogs(await Requests.getAllDogs());
  };

  const addDog = async (dog: Omit<TDog, 'id'>) => {
    setIsLoading(true);
    await Requests.postDog(dog);
    refetchData();
    toast.success('Dog Created');
    setIsLoading(false);
  };

  const deleteDog = async (id: number) => {
    setIsLoading(true);
    await Requests.deleteDog(id);
    refetchData();
    setIsLoading(false);
  };

  const updateDog = async (id: number, isFavorite: boolean) => {
    setIsLoading(true);
    await Requests.updateDog(id, isFavorite);
    refetchData();
    setIsLoading(false);
  };

  return (
    <div
      className='App'
      style={{ backgroundColor: 'skyblue' }}
    >
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        dogs={dogs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      >
        <FunctionalDogs
          dogs={dogs}
          deleteDog={deleteDog}
          updateDog={updateDog}
          activeTab={activeTab}
          isLoading={isLoading}
        />
        {activeTab === 'createDog' && (
          <FunctionalCreateDogForm
            addDog={addDog}
            isLoading={isLoading}
          />
        )}
      </FunctionalSection>
    </div>
  );
}
