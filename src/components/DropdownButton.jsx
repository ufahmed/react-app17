import React from 'react';

const DropdownButton = ({ selectedResource, handleSelectResource, inputValue, handleInputChange, handleClick }) => {
  const resourceOptions = ['people', 'planets', 'otherResources']; 

  return (
    <div>
      <select value={selectedResource} onChange={(e) => handleSelectResource(e.target.value)}>
        {resourceOptions.map((resource) => (
          <option key={resource} value={resource}>
            {resource}
          </option>
        ))}
      </select>
      <input type="number" value={inputValue} onChange={(e) => handleInputChange(e.target.value)} />
      <button onClick={handleClick}>Search</button>
    </div>
  );
};

export default DropdownButton;