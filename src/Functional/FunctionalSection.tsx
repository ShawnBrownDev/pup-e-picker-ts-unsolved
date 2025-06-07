import { Link } from 'react-router-dom';
import { IFunctionalSectionProps } from '../types';

export const FunctionalSection = ({
  children,
  dogs,
  activeTab,
  setActiveTab,
}: IFunctionalSectionProps) => {
  return (
    <section id='main-section'>
      <div className='container-header'>
        <div className='container-label'>Dogs: </div>
        <Link
          to={'/class'}
          className='btn'
        >
          Change to Class
        </Link>
        <div className='selectors'>
          {/* This should display the favorited count */}
          <div
            className={`selector ${activeTab === 'favorited' ? 'active' : ''}`}
            onClick={() => {
              activeTab !== 'favorited'
                ? setActiveTab('favorited')
                : setActiveTab('none');
            }}
          >
            favorited ( {dogs.filter((dog) => dog.isFavorite).length} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${
              activeTab === 'unfavorited' ? 'active' : ''
            }`}
            onClick={() => {
              activeTab !== 'unfavorited'
                ? setActiveTab('unfavorited')
                : setActiveTab('none');
            }}
          >
            unfavorited ( {dogs.filter((dog) => !dog.isFavorite).length} )
          </div>
          <div
            className={`selector ${activeTab === 'createDog' ? 'active' : ''}`}
            onClick={() => {
              activeTab !== 'createDog'
                ? setActiveTab('createDog')
                : setActiveTab('none');
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className='content-container'>{children}</div>
    </section>
  );
};
