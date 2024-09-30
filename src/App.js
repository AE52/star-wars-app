import React, { useState } from 'react';
import './tailwind.css';
import FilmList from './FilmList';
import { motion } from 'framer-motion'; // For smooth animations
import Particles from "react-tsparticles"; // For particle background
import { loadFull } from "tsparticles";
import axios from 'axios';

function CharacterList({ characters }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 p-4 rounded-lg shadow-lg mt-6"
    >
      <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Karakterler</h2>
      <ul>
        {characters.map((character, index) => (
          <li key={index} className="text-gray-300 mb-2">
            {character.name}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function FilmDetails({ selectedFilm, characters, onBack }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
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
      <CharacterList characters={characters} />
    </motion.div>
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

    try {
      const characterPromises = film.characters.map((url) => axios.get(url).then(res => res.data));
      const fetchedCharacters = await Promise.all(characterPromises);
      setCharacters(fetchedCharacters); // Set characters correctly
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

  const particlesInit = async (main) => {
    await loadFull(main); // Load full tsparticles engine
  };

  return (
    <div className="relative min-h-screen">
      {/* Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "#000000",
            },
          },
          fpsLimit: 60,
          particles: {
            number: {
              value: 80, // Number of particles
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: "#ffffff", // White particles
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: 0.2, // Make particles slightly transparent
              random: true, // Randomize opacity for different particles
            },
            size: {
              value: 5, // Base size of particles
              random: true, // Randomize particle size for variety
            },
            links: {
              enable: true, // Show lines between particles
              distance: 150,
              color: "#ffffff",
              opacity: 0.1,
              width: 1,
            },
            move: {
              enable: true,
              speed: 1, // Slow particle movement
              direction: "none",
              random: true, // Random directions
              straight: false,
              outMode: "out", // Let particles leave and re-enter the screen
            },
          },
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "grab", // Particles connect when hovered
              },
              onClick: {
                enable: true,
                mode: "repulse", // Push particles away when clicked
              },
            },
          },
          retina_detect: true,
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen relative z-10 bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white"
      >
        {/* Loading Spinner */}
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-500"></div>
          </div>
        )}

        {/* Home Page */}
        {currentPage === 'home' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="container mx-auto px-4 py-8"
          >
            <div className="text-center">
              <h1 className="text-3xl font-bold">Filmler ve Karakterler</h1>
            </div>
            <div className="mt-8">
              <FilmList setLoading={setLoading} onSelectFilm={handleFilmSelect} />
            </div>
          </motion.div>
        )}

        {/* Film Details Page */}
        {currentPage === 'details' && selectedFilm && (
          <FilmDetails selectedFilm={selectedFilm} characters={characters} onBack={handleBackToHome} />
        )}
      </motion.div>
    </div>
  );
}

export default App;
