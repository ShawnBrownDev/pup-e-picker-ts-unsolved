import { DogCard } from '../Shared/DogCard';
import { Component } from 'react';
import { IDisplayDogs } from '../types';

export class ClassDogs extends Component<IDisplayDogs> {
  render() {
    return (
      <>
        {this.props.dogs
          .filter((dog) => {
            switch (this.props.activeTab) {
              case 'favorited':
                return dog.isFavorite;
              case 'unfavorited':
                return !dog.isFavorite;
              case 'createDog':
                return false;
              case 'none':
                return dog;
            }
          })
          .map((dog) => (
            <DogCard
              key={dog.id}
              dog={dog}
              onEmptyHeartClick={() => {
                this.props.updateDog(dog.id, true);
              }}
              onHeartClick={() => {
                this.props.updateDog(dog.id, false);
              }}
              //insert delete method here
              onTrashIconClick={() => {
                this.props.deleteDog(dog.id);
              }}
              isLoading={this.props.isLoading}
            />
          ))}
      </>
    );
  }
}
