import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div>
      <h2 className="text-2xl font-bold text-yellow-400 mb-6">Film Listesi</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {films.map((film, index) => (
          <li 
            key={index} 
            className="bg-gray-900 p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-800 transition duration-300"
            onClick={() => onSelectFilm(film)}
          >
            <h3 className="text-xl font-semibold text-yellow-400">{film.title}</h3>
            <p className="text-sm text-gray-400">Yayın Tarihi: {film.release_date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FilmList;
