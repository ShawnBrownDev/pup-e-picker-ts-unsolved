import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Requests } from "../api";
import { Dog, DogView } from "../types";

export class ClassApp extends Component {
  state = {
    view: "allDogs" as DogView,
    isLoading: false as boolean,
    allDogs: [] as Dog[],
  };

  updateLoading = (isLoading: boolean) => {
    this.setState({ isLoading });
  };

  changeView = (newView: DogView) => {
    const nextView = newView === this.state.view ? "allDogs" : newView;
    this.setState({ nextView });
  };

  fetchAllDogs = () => {
    const { getAllDogs } = Requests;
    this.updateLoading(true);
    getAllDogs()
      .then((allDogData) => {
        this.setState({ allDogs: allDogData });
      })
      .finally(() => {
        this.updateLoading(false);
      });
  };

  componentDidMount() {
    this.fetchAllDogs();
  }

  render() {
    const { view, isLoading, allDogs } = this.state;
    const filteredDogs = allDogs.filter((dog) => {
      if (view === "favoriteDogs") return dog.isFavorite;
      else if (view === "unfavoriteDogs") return !dog.isFavorite;
      else return true;
    });

    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          view={view}
          changeView={this.changeView}
          allDogs={allDogs}
        >
          {view !== "createDog" ? (
            <ClassDogs
              dogs={filteredDogs}
              isLoading={isLoading}
              refreshDogs={this.fetchAllDogs}
              setLoading={this.updateLoading}
            />
          ) : (
            <ClassCreateDogForm
              isLoading={isLoading}
              refreshDogs={this.fetchAllDogs}
              setLoading={this.updateLoading}
            />
          )}
        </ClassSection>
      </div>
    );
  }
}
