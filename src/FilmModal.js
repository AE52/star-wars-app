import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FilmModal({ filmId, onClose, onBack }) {
  const [film, setFilm] = useState(null);

  useEffect(() => {
    async function fetchFilm() {
      try {
        const response = await axios.get(`https://swapi.dev/api/films/${filmId}/`);
        setFilm(response.data);
      } catch (error) {
        console.error('Film detayı alınamadı:', error);
      }
    }
    fetchFilm();
  }, [filmId]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-11/12 md:w-1/2">
        {film ? (
          <div>
            <h2 className="text-3xl font-semibold mb-4 text-yellow-400">{film.title}</h2>
            <p className="mb-2 text-gray-300"><strong>Açıklama:</strong> {film.opening_crawl}</p>
            <p className="mb-2 text-gray-300"><strong>Yönetmen:</strong> {film.director}</p>
            <p className="mb-2 text-gray-300"><strong>Yapımcı:</strong> {film.producer}</p>
            <p className="mb-2 text-gray-300"><strong>Yayın Tarihi:</strong> {film.release_date}</p>
            <div className="flex justify-between mt-6">
              <button
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300"
                onClick={onBack}
              >
                Geri Dön
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                onClick={onClose}
              >
                Kapat
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500"><i>Yükleniyor...</i></p>
        )}
      </div>

      {/* Adjusted overlay */}
      <div className="fixed inset-0 bg-black opacity-25" onClick={onClose}></div>
    </div>
  );
}

export default FilmModal;
