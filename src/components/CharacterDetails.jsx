import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';

const CharacterDetails = () => {
  const { id } = useParams();
  const [characterData, setCharacterData] = useState(null);
  const [homeworld, setHomeworld] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCharacterData = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/people/${id}/`);
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setCharacterData(data);

      } catch (error) {
        setError(true);
      }
    };

    fetchCharacterData();
  }, [id]);

  if (error) {
    return <ErrorMessage />;
  }


  return (
    <div>
      {characterData && (
        <div>
          <h2>{characterData.name}</h2>
          <p>{characterData.height}</p>
          {homeworld && (
            <div>
              <p>{`Homeworld: ${homeworld.name}`}</p>
              <a href={`/planets/${extractIdFromUrl(homeworld.url)}`}>Homeworld</a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CharacterDetails;