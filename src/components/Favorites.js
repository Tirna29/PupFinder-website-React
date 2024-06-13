import React from 'react';
import { Button } from '@mui/material';
import DogList from './DogList';

const Favorites = ({ dogs, onGenerateMatch }) => {
  return (
    <div>
      <DogList dogs={dogs} onFavorite={() => {}} />
      <Button onClick={onGenerateMatch}>Generate Match</Button>
    </div>
  );
};

export default Favorites;
