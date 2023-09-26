import React, { useState, useEffect } from 'react';

import Filters from './Filters';
import PetBrowser from './PetBrowser';

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: 'all' });

  const onChangeType = (event) => {
    setFilters({ ...filters, type: event.target.value });
  };
  console.log(filters);
  const onFindPetsClick = async () => {
    try {
      // const resp = await fetch('http://localhost:3001/pets');
      // const data = await resp.json();
      // setPets(
      //   filters.type === 'all'
      //     ? data
      //     : data.filter((obj) => obj.type === filters.type)
      // );
      const resp =
        filters.type === 'all'
          ? await fetch('http://localhost:3001/pets')
          : await fetch(
              `http://localhost:3001/pets?type=${filters.type}`
            );
      const data = await resp.json();
      setPets([...data]);
    } catch (error) {
      console.error(`Error : ${error}`);
    }
  };

  const onAdoptPet = (id) => {
    setPets((prevState) =>
      prevState.map((pet) =>
        pet.id === id ? { ...pet, isAdopted: true } : pet
      )
    );
  };

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters
              onChangeType={onChangeType}
              onFindPetsClick={onFindPetsClick}
            />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={onAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
