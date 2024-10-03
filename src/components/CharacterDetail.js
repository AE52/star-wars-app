import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from './Spinner';

function CharacterDetail() {
  const { id } = useParams();
  const [characters, setCharacters] = useState([]);
  const [filmTitle, setFilmTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Filmin detaylarını al
    fetch(`https://swapi.dev/api/films/${id}/`)
      .then((response) => response.json())
      .then(async (data) => {
        setFilmTitle(data.title);

        // Karakterleri al
        const characterPromises = data.characters.map((url) =>
          fetch(url).then((res) => res.json())
        );
        const charactersData = await Promise.all(characterPromises);
        setCharacters(charactersData);
        setLoading(false);
      })
      .catch((error) => console.error('Veriler alınırken hata oluştu:', error));
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="py-10 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">"{filmTitle}" Karakterleri</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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

export default CharacterDetail;
