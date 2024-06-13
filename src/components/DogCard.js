import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)({
  marginBottom: '20px',
  width: '100%',
  maxWidth: '345px',
  boxShadow:'10px 10px 10px lightgrey',
  transition: 'transform 0.3s ease',  
  transform: 'scale(1)',  

  '&:hover': {
    transform: 'scale(0.98)',  
  },

});

const DogCard = ({ dog, onFavorite, favoriteFlag}) => {
  return (
    <StyledCard>
      <CardMedia component="img" alt={dog.name} height="300" image={dog.img} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {dog.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Age: {dog.age}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Breed: {dog.breed}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Zip Code: {dog.zip_code}
        </Typography>
        {favoriteFlag &&<Button onClick={() => onFavorite(dog.id)}>Favorite</Button>}
      </CardContent>
    </StyledCard>
  );
};

export default DogCard;
