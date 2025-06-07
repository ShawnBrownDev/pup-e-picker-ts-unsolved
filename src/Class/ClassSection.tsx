import { Component } from 'react';
import { Link } from 'react-router-dom';
import { IClassSectionProps } from '../types';

export class ClassSection extends Component<IClassSectionProps> {
  render() {
    return (
      <section id='main-section'>
        <div className='container-header'>
          <div className='container-label'>Dogs: </div>

          <Link
            to={'/functional'}
            className='btn'
          >
            Change to Functional
          </Link>

          <div className='selectors'>
            {/* This should display the favorited count */}
            <div
              className={`selector ${
                this.props.activeTab === 'favorited' ? 'active' : ''
              }`}
              onClick={() => {
                this.props.activeTab !== 'favorited'
                  ? this.props.handleActiveTab('favorited')
                  : this.props.handleActiveTab('none');
              }}
            >
              favorited ({' '}
              {this.props.dogs.filter((dog) => dog.isFavorite).length} )
            </div>

            {/* This should display the unfavorited count */}
            <div
              className={`selector ${
                this.props.activeTab === 'unfavorited' ? 'active' : ''
              }`}
              onClick={() => {
                this.props.activeTab !== 'unfavorited'
                  ? this.props.handleActiveTab('unfavorited')
                  : this.props.handleActiveTab('none');
              }}
            >
              unfavorited ({' '}
              {this.props.dogs.filter((dog) => !dog.isFavorite).length} )
            </div>
            <div
              className={`selector ${
                this.props.activeTab === 'createDog' ? 'active' : ''
              }`}
              onClick={() => {
                this.props.activeTab !== 'createDog'
                  ? this.props.handleActiveTab('createDog')
                  : this.props.handleActiveTab('none');
              }}
            >
              create dog
            </div>
          </div>
        </div>
        <div className='content-container'>{this.props.children}</div>
      </section>
    );
  }
}
