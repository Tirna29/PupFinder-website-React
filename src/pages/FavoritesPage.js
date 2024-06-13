import React, { useEffect, useState, useMemo } from "react";
import { fetchDogs, matchDogs } from "../api";
import DogList from "../components/DogList";
import DogCard from "../components/DogCard";
import { Container, Typography, Button, Box, Paper } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const FavoritesPage = () => {
  const [favoriteDogs, setFavoriteDogs] = useState([]);
  const [matchedDog, setMatchedDog] = useState(null);
  const locationState = useLocation().state;

  const favorites = useMemo(() => locationState.favorites || [], [locationState]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadFavoriteDogs = async () => {
      if (favorites.length > 0) {
        const response = await fetchDogs(favorites);
        setFavoriteDogs(response.data);
      }
    };
    loadFavoriteDogs();
  }, [favorites]);

  const handleGetMatch = async () => {
    if (favorites.length > 0) {
      const response = await matchDogs(favorites);
      const matchedDogId = response.data.match;
      const matchedDogResponse = await fetchDogs([matchedDogId]);
      const dog = matchedDogResponse.data[0];
      setMatchedDog(dog);
    }
  };

  const navigateToHome = () => {
    navigate("/search");
  };

  return (
    <Container>
      <Typography variant="h2" gutterBottom align="center" sx={{ color: "darkblue" }}>
        Your Favorite Dogs
      </Typography>
      {favorites.length === 0 ? (
        <Typography variant="body1" align="center">
          No favorite dogs selected.
        </Typography>
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center">
          <DogList dogs={favoriteDogs} />
          <Box marginTop={2}>
            <Button variant="contained" color="primary" onClick={handleGetMatch}>
              Get Match
            </Button>
          </Box>
          {matchedDog && (
            <Paper elevation={3} sx={{ padding: 4, marginTop: 4, maxWidth: 600 }}>
              <Typography variant="h4" gutterBottom align="center" sx={{ color: "darkblue" }}>
                Matched Dog
              </Typography>
              <DogCard dog={matchedDog} />
            </Paper>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={navigateToHome}
            sx={{ margin: "1.5em 0" }}
          >
            Return To Home
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default FavoritesPage;
