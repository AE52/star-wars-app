import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion'; // Import Framer Motion

function FilmList({ onSelectFilm, setLoading }) {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    async function fetchFilms() {
      setLoading(true); // Start loading
      try {
        const response = await axios.get('https://swapi.dev/api/films/');
        setFilms(response.data.results);
      } catch (error) {
        console.error('Film verisi alınamadı:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    }

    fetchFilms();
  }, [setLoading]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold text-yellow-400 mb-6">Film Listesi</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {films.map((film, index) => (
          <motion.li
            key={index}
            className="bg-gray-900 p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-800 transition duration-300"
            onClick={() => onSelectFilm(film)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h3 className="text-xl font-semibold text-yellow-400">{film.title}</h3>
            <p className="text-sm text-gray-400">Yayın Tarihi: {film.release_date}</p>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export default FilmList;
