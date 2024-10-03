import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner'; // Spinner bileşenini içe aktarın

function CharacterList() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true); // Yüklenme durumunu takip etmek için
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    // Filmleri al
    fetch('https://swapi.dev/api/films/')
      .then((response) => response.json())
      .then((data) => {
        const sortedFilms = data.results.sort(
          (a, b) => new Date(a.release_date) - new Date(b.release_date)
        );
        setFilms(sortedFilms);
        setLoading(false); // Yüklenme tamamlandı
      })
      .catch((error) => {
        console.error('Veriler alınırken hata oluştu:', error);
        setLoading(false);
      });
  }, []);

  const handleFilmClick = (url) => {
    // Filmin ID'sini URL'den çıkar
    const id = url.split('/').filter(Boolean).pop();
    navigate(`/characters/${id}`);
  };

  if (loading) {
    return <Spinner />; // Spinner bileşenini göster
  }

  return (
    <div className="py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Karakterler</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {films.map((film) => (
          <div
            key={film.episode_id}
            className="bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-700"
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default CharacterList;
