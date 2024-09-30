import React, { useState } from 'react';
import './tailwind.css';
import axios from 'axios';
import FilmList from './FilmList';

function CharacterList({ characters }) {
  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg mt-6">
      <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Karakterler</h2>
      <ul>
        {characters.map((character, index) => (
          <li key={index} className="text-gray-300 mb-2">
            {character.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FilmDetails({ selectedFilm, characters, onBack }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-4 text-yellow-400">{selectedFilm.title}</h2>
        <p className="mb-2 text-gray-300"><strong>Açıklama:</strong> {selectedFilm.opening_crawl}</p>
        <p className="mb-2 text-gray-300"><strong>Yönetmen:</strong> {selectedFilm.director}</p>
        <p className="mb-2 text-gray-300"><strong>Yapımcı:</strong> {selectedFilm.producer}</p>
        <p className="mb-2 text-gray-300"><strong>Yayın Tarihi:</strong> {selectedFilm.release_date}</p>
        <button
          className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300"
          onClick={onBack}
        >
          Geri Dön
        </button>
      </div>
      {/* Character List */}
      <CharacterList characters={characters} />
    </div>
  );
}

function App() {
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false); // Manage loading state
  const [currentPage, setCurrentPage] = useState('home');

  const handleFilmSelect = async (film) => {
    setLoading(true); // Start loading when film is selected
    setSelectedFilm(film);
    setCurrentPage('details');

    // Fetch characters related to the selected film
    try {
      const characterPromises = film.characters.map((url) => axios.get(url).then(res => res.data));
      const fetchedCharacters = await Promise.all(characterPromises);
      setCharacters(fetchedCharacters);
    } catch (error) {
      console.error('Karakter verisi alınamadı:', error);
    } finally {
      setLoading(false); // Stop loading when characters are fetched
    }
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedFilm(null);
    setCharacters([]);
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Loading Spinner */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-500"></div>
        </div>
      )}

      {/* Home Page */}
      {currentPage === 'home' && (
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Filmler ve Karakterler</h1>
          </div>
          <div className="mt-8">
            <FilmList setLoading={setLoading} onSelectFilm={handleFilmSelect} />
          </div>
        </div>
      )}

      {/* Film Details Page */}
      {currentPage === 'details' && selectedFilm && (
        <FilmDetails selectedFilm={selectedFilm} characters={characters} onBack={handleBackToHome} />
      )}
    </div>
  );
}

export default App;
