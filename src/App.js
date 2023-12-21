import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DropdownButton from './components/DropdownButton';
import CharacterDetails from './components/CharacterDetails';
import ErrorMessage from './components/ErrorMessage';

const App = () => {
  const [selectedResource, setSelectedResource] = useState('people');
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState(null);
  const [homeworld, setHomeworld] = useState(null);
  const [error, setError] = useState(false);

  const handleSelectResource = (resource) => {
    setSelectedResource(resource);
  };

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`https://swapi.dev/api/${selectedResource}/${inputValue}/`);
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await response.json();
      setData(data);
      setError(false);

      if (selectedResource === 'people') {
        const homeworldResponse = await fetch(data.homeworld);
        if (!homeworldResponse.ok) {
          throw new Error('Failed to fetch homeworld');
        }
        const homeworldData = await homeworldResponse.json();
        setHomeworld(homeworldData);
      }
    } catch (error) {
      setError(true);
    }
  };

  const handleClick = () => {
    fetchData();
  };

  return (
    <BrowserRouter>
    <Routes>
      <div>
        <DropdownButton
          selectedResource={selectedResource}
          handleSelectResource={handleSelectResource}
          inputValue={inputValue}
          handleInputChange={handleInputChange}
          handleClick={handleClick}
        />
          <Route path="/">
            <h1>Welcome to Star Wars API</h1>
          </Route>
          <Route path="/characters/:id" element={<CharacterDetails/>}>
            {error ? <ErrorMessage /> : <CharacterDetails data={data} homeworld={homeworld} />}
          </Route>
      </div>
    </Routes>
    </BrowserRouter>
  );
};

export default App;