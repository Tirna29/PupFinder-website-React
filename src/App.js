import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';
import FavoritesPage from './pages/FavoritesPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<LoginPage/>} />
        <Route path="/search" element={<SearchPage/>} />
        <Route path="/favorites" element={<FavoritesPage/>} />
      </Routes>
    </div>
  );
}

export default App;