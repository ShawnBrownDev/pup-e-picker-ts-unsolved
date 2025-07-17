import { useState, useEffect } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Requests } from "../api";
import { Dog, DogView } from "../types";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState([] as Dog[]);
  const [view, setView] = useState("allDogs" as DogView);
  const [isLoading, setIsLoading] = useState(false as boolean);

  const { getAllDogs } = Requests;

  const filteredDogs = allDogs.filter((dog) => {
    if (view === "favoriteDogs") return dog.isFavorite;
    else if (view === "unfavoriteDogs") return !dog.isFavorite;
    else return true;
  });

  const fetchAllDogs = () => {
    setIsLoading(true);
    getAllDogs()
      .then(setAllDogs)
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchAllDogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection allDogs={allDogs} view={view} setView={setView}>
        {view !== "createDog" ? (
          <FunctionalDogs
            dogs={filteredDogs}
            refreshDogs={fetchAllDogs}
            isLoading={isLoading}
            setLoading={setIsLoading}
          />
        ) : (
          <FunctionalCreateDogForm
            refreshDogs={fetchAllDogs}
            isLoading={isLoading}
            setLoading={setIsLoading}
          />
        )}
      </FunctionalSection>
    </div>
  );
}
