import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from './Spinner';

function FilmDetail() {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Yükleme başlıyor
    setLoading(true);

    // Filmin detaylarını al
    fetch(`https://swapi.dev/api/films/${id}/`)
      .then((response) => response.json())
      .then(async (data) => {
        setFilm(data);

        // Karakterleri al
        const characterPromises = data.characters.map((url) =>
          fetch(url).then((res) => res.json())
        );
        const charactersData = await Promise.all(characterPromises);
        setCharacters(charactersData);

        // Yükleme tamamlandı
        setLoading(false);
      })
      .catch((error) => {
        console.error('Veriler alınırken hata oluştu:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="py-10 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{film.title}</h2>
      <p className="text-gray-400 mb-2">
        <span className="font-bold text-white">Yönetmen:</span> {film.director}
      </p>
      <p className="text-gray-400 mb-2">
        <span className="font-bold text-white">Yapımcı:</span> {film.producer}
      </p>
      <p className="text-gray-400 mb-4">
        <span className="font-bold text-white">Yayın Tarihi:</span> {film.release_date}
      </p>
      <p className="text-gray-300 mb-6">{film.opening_crawl}</p>

      <h3 className="text-2xl font-semibold mb-4">Karakterler</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {characters.map((character, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-3 text-center">
            <p className="font-semibold">{character.name}</p>
            <p className="text-sm text-gray-400">Cinsiyet: {character.gender}</p>
            <p className="text-sm text-gray-400">Doğum Yılı: {character.birth_year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilmDetail;
