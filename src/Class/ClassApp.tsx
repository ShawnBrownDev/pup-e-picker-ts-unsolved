import { Component } from 'react';
import { ClassSection } from './ClassSection';
import { ClassDogs } from './ClassDogs';
import { ClassCreateDogForm } from './ClassCreateDogForm';
import { Requests } from '../api';
import { TDog, TTab } from '../types';
import toast from 'react-hot-toast';

export interface ClassAppState {
  dogs: TDog[];
  activeTab: TTab;
  isLoading: boolean;
}

export class ClassApp extends Component {
  state: ClassAppState = {
    dogs: [],
    activeTab: 'none',
    isLoading: false,
  };

  componentDidMount(): void {
    this.refetchData();
  }

  refetchData = () => {
    return Requests.getAllDogs().then((dogs) => this.setState({ dogs: dogs }));
  };

  addDog = (dog: Omit<TDog, 'id'>) => {
    this.setState({ isLoading: true });
    Requests.postDog(dog)
      .then(this.refetchData)
      .then(() => toast.success('Dog Created'))
      .finally(() => this.setState({ isLoading: false }));
  };

  deleteDog = (id: number) => {
    this.setState({ isLoading: true });
    Requests.deleteDog(id)
      .then(this.refetchData)
      .finally(() => this.setState({ isLoading: false }));
  };

  updateDog = (id: number, isFavorite: boolean) => {
    this.setState({ isLoading: true });
    Requests.updateDog(id, isFavorite)
      .then(this.refetchData)
      .finally(() => this.setState({ isLoading: false }));
  };

  handleActiveTab = (activeTab: TTab) => {
    this.setState({ activeTab: activeTab });
  };

  render() {
    return (
      <div
        className='App'
        style={{ backgroundColor: 'goldenrod' }}
      >
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          dogs={this.state.dogs}
          activeTab={this.state.activeTab}
          handleActiveTab={this.handleActiveTab}
        >
          <ClassDogs
            dogs={this.state.dogs}
            deleteDog={this.deleteDog}
            updateDog={this.updateDog}
            activeTab={this.state.activeTab}
            isLoading={this.state.isLoading}
          />
          {this.state.activeTab === 'createDog' && (
            <ClassCreateDogForm
              addDog={this.addDog}
              isLoading={this.state.isLoading}
            />
          )}
        </ClassSection>
      </div>
    );
  }
}
