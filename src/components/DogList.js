import React from "react";
import DogCard from "./DogCard";
import { styled } from "@mui/system";

const GridContainer = styled("div")(({ theme }) => ({
  display: "grid",
  gap: "16px",
  margin: "10px",
  padding:"0 15%",
  gridTemplateColumns: "repeat(1, 1fr)",

  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },

  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
    margin: "16px 0",
    padding:"0"
  },
}));

const DogList = ({ dogs, onFavorite, favoriteFlag }) => {
  return (
    <GridContainer>
      {dogs.map((dog) => (
        <DogCard
          key={dog.id}
          dog={dog}
          onFavorite={onFavorite}
          favoriteFlag={favoriteFlag}
        />
      ))}
    </GridContainer>
  );
};

export default DogList;
