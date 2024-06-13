import React, { useState, useEffect } from 'react';
import { fetchBreeds, searchDogs, fetchDogs } from '../api';
import DogList from '../components/DogList';
import Pagination from '../components/Pagination';
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Box,
  Button,
  Paper,
} from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const FormWrapper = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  gap: '1em',
  padding: '16px',
  marginBottom: '16px',
});

const SearchPage = () => {
  const [breeds, setBreeds] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [filters, setFilters] = useState({
    breeds: [],
    zipCodes: [],
    ageMin: '',
    ageMax: '',
    sort: 'breed:asc',
  });
  const [pagination, setPagination] = useState({
    total: 0,
    currentPage: 1,
    resultsPerPage: 24,
  });
  const [formState, setFormState] = useState({
    breeds: [],
    zipCodes: [],
    ageMin: '',
    ageMax: '',
    sort: 'breed:asc',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const loadBreeds = async () => {
      const response = await fetchBreeds();
      setBreeds(response.data);
    };
    loadBreeds();
  }, []);

  useEffect(() => {
    const fetchDogResults = async () => {
      const params = {
        ...filters,
        size: pagination.resultsPerPage,
        from: (pagination.currentPage - 1) * pagination.resultsPerPage,
      };
      const response = await searchDogs(params);
      const dogIds = response.data.resultIds;
      const dogsResponse = await fetchDogs(dogIds);
      setDogs(dogsResponse.data);
      setPagination((prev) => ({
        ...prev,
        total: response.data.total,
      }));
    };
    fetchDogResults();
  }, [filters, pagination.currentPage, pagination.resultsPerPage]);

  const handleFavorite = (dogId) => {
    setFavorites((prev) => [...prev, dogId]);
    console.log(favorites);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleZipCodeChange = (e) => {
    const zipCodes = e.target.value.split(',');
    setFormState((prev) => ({ ...prev, zipCodes }));
  };

  const handleBreedChange = (e) => {
    const { value } = e.target;
    setFormState((prev) => ({ ...prev, breeds: value }));
  };

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilters(formState);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handleViewFavorites = () => {
    navigate('/favorites', { state: { favorites } });
  };

  return (
    <Container>
      <Typography variant="h2" gutterBottom align="center" sx={{ color: 'darkblue' }}>
        Search Dogs
      </Typography>
      <FormWrapper component="form" onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <InputLabel>Breed</InputLabel>
          <Select
            multiple
            value={formState.breeds}
            onChange={handleBreedChange}
            renderValue={(selected) => selected.join(', ')}
          >
            {breeds.map((breed) => (
              <MenuItem key={breed} value={breed}>
                {breed}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label="Zip Codes"
            type="text"
            name="zipCodes"
            value={formState.zipCodes}
            onChange={handleZipCodeChange}
            placeholder="Enter comma-separated zip codes"
          />
        </FormControl>
        <Box display="flex" gap="1em" width="100%">
          <FormControl fullWidth>
            <TextField
              label="Age Min"
              type="number"
              name="ageMin"
              value={formState.ageMin}
              onChange={handleFormChange}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label="Age Max"
              type="number"
              name="ageMax"
              value={formState.ageMax}
              onChange={handleFormChange}
            />
          </FormControl>
        </Box>
        <FormControl fullWidth>
          <InputLabel>Sort By</InputLabel>
          <Select
            name="sort"
            value={formState.sort}
            onChange={handleFormChange}
          >
            <MenuItem value="breed:asc">Breed Ascending</MenuItem>
            <MenuItem value="breed:desc">Breed Descending</MenuItem>
            <MenuItem value="name:asc">Name Ascending</MenuItem>
            <MenuItem value="name:desc">Name Descending</MenuItem>
            <MenuItem value="age:asc">Age Ascending</MenuItem>
            <MenuItem value="age:desc">Age Descending</MenuItem>
          </Select>
        </FormControl>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Search
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleViewFavorites}
            fullWidth
            sx={{ marginLeft: '1em' }}
          >
            View Favorites
          </Button>
        </Box>
      </FormWrapper>
      <DogList dogs={dogs} onFavorite={handleFavorite} favoriteFlag={true}/>
      <Pagination
        totalResults={pagination.total}
        resultsPerPage={pagination.resultsPerPage}
        currentPage={pagination.currentPage}
        onPageChange={handlePageChange}
      />
    </Container>
  );
};

export default SearchPage;
