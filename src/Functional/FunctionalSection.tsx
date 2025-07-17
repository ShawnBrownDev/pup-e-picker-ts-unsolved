import { Dispatch, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Dog, DogView } from "../types";

type FunctionalSectionProps = {
  children: ReactNode;
  allDogs: Dog[];
  view: DogView;
  setView: Dispatch<DogView>;
};

export const FunctionalSection = (props: FunctionalSectionProps) => {
  const { children, allDogs, view, setView } = props;

  const favoriteCount = allDogs.filter((dog) => dog.isFavorite).length;
  const unfavoriteCount = allDogs.filter((dog) => !dog.isFavorite).length;

  const changeView = (newView: DogView) => {
    const nextView = newView === view ? "allDogs" : newView;
    setView(nextView);
  }

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          <div
            className={`selector ${view === "favoriteDogs" && "active"}`}
            onClick={() => {
              changeView("favoriteDogs");
            }}
          >
            favorited ( {favoriteCount} )
          </div>

          <div
            className={`selector ${view === "unfavoriteDogs" && "active"}`}
            onClick={() => {
              changeView("unfavoriteDogs");
            }}
          >
            unfavorited ( {unfavoriteCount} )
          </div>
          <div
            className={`selector ${view === "createDog" && "active"}`}
            onClick={() => {
              changeView("createDog");
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
