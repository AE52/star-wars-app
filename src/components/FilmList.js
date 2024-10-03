import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';

function FilmList() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch('https://swapi.dev/api/films/')
      .then((response) => response.json())
      .then((data) => {
        const sortedFilms = data.results.sort(
          (a, b) => new Date(a.release_date) - new Date(b.release_date)
        );
        setFilms(sortedFilms);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Film verileri alınırken hata oluştu:', error);
        setLoading(false);
      });
  }, []);

  const handleFilmClick = (url) => {
    const id = url.split('/').filter(Boolean).pop();
    navigate(`/films/${id}`);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Filmler</h2>
      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {films.map((film) => (
          <motion.div
            key={film.episode_id}
            className="bg-gray-800 rounded-lg p-4 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => handleFilmClick(film.url)}
          >
            <h3 className="text-xl font-semibold mb-2">{film.title}</h3>
            <p className="text-sm text-gray-400 mb-1">
              <span className="font-bold text-white">Yayın Tarihi:</span> {film.release_date}
            </p>
            <p className="text-sm text-gray-400 mb-1">
              <span className="font-bold text-white">Yönetmen:</span> {film.director}
            </p>
            <p className="text-sm text-gray-400">
              <span className="font-bold text-white">Bölüm:</span> {film.episode_id}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default FilmList;
