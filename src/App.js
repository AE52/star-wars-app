import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import FilmList from './components/FilmList';
import FilmDetail from './components/FilmDetail';
import CharacterList from './components/CharacterList';
import CharacterDetail from './components/CharacterDetail';
import SecondPage from './components/SecondPage';
import Home from './components/Home';
import { FiMenu } from 'react-icons/fi';
import { AiOutlineArrowLeft, AiOutlineClose } from 'react-icons/ai';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Bir önceki sayfaya gider
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans">
      {/* Üst Menü */}
      <nav className="bg-gray-800 p-4 flex items-center justify-between relative">
        {/* Sol İkon - Geri Dön */}
        <div className="md:hidden">
          <button onClick={handleBack}>
            <AiOutlineArrowLeft size={24} />
          </button>
        </div>
        {/* Başlık */}
        <div className="text-3xl font-extrabold flex-grow text-center md:text-left tracking-wider">
          <span className="text-yellow-500">Filmler</span> ve{' '}
          <span className="text-blue-500">Karakterler</span>
        </div>
        {/* Menü İkonu */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(true)}>
            <FiMenu size={24} />
          </button>
        </div>
        {/* Menü (Masaüstünde görüntülenir) */}
        <div className="hidden md:flex space-x-4 font-bold">
          <Link to="/" className="hover:text-yellow-500">
            Ana Sayfa
          </Link>
          <Link to="/films" className="hover:text-yellow-500">
            Filmler
          </Link>
          <Link to="/characters" className="hover:text-yellow-500">
            Karakterler
          </Link>
          <Link to="/second-page" className="hover:text-yellow-500">
            İkinci Sayfa
          </Link>
        </div>
      </nav>

      {/* Mobil Menü */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-gray-900 z-50"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3 }}
          >
            {/* Menü Başlığı */}
            <div className="flex items-center justify-between p-4 bg-gray-800">
              {/* Kapatma Butonu */}
              <button onClick={() => setIsMenuOpen(false)}>
                <AiOutlineClose size={24} />
              </button>
              {/* Site Başlığı veya Logo */}
              
              <div className="text-2xl font-extrabold">
                <span className="text-yellow-500">Filmler</span> ve{' '}
                <span className="text-blue-500">Karakterler</span>
              </div>
              {/* Arama İkonu Kaldırıldı */}
              <div></div>
            </div>
            {/* Menü Öğeleri */}
            <nav className="flex flex-col items-center space-y-4 mt-4 px-4 font-bold">
              <Link
                to="/"
                className="text-xl hover:text-yellow-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Ana Sayfa
              </Link>
              <Link
                to="/films"
                className="text-xl hover:text-yellow-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Filmler
              </Link>
              <Link
                to="/characters"
                className="text-xl hover:text-yellow-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Karakterler
              </Link>
              <Link
                to="/second-page"
                className="text-xl hover:text-yellow-500"
                onClick={() => setIsMenuOpen(false)}
              >
                İkinci Sayfa
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sayfa İçeriği */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/films" element={<FilmList />} />
        <Route path="/films/:id" element={<FilmDetail />} />
        <Route path="/characters" element={<CharacterList />} />
        <Route path="/characters/:id" element={<CharacterDetail />} />
        <Route path="/second-page" element={<SecondPage />} />
      </Routes>
    </div>
  );
}

export default App;
