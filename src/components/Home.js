import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Home() {
  return (
    <div className="text-center py-20">
      <h1 className="text-5xl font-bold mb-10">Star Wars Evrenine Hoş Geldiniz</h1>
      <div className="space-x-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="bg-yellow-500 text-black px-6 py-3 rounded-md font-semibold"
        >
          <Link to="/films">Film</Link>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="bg-yellow-500 text-black px-6 py-3 rounded-md font-semibold"
        >
          <Link to="/characters">Karakter</Link>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="bg-yellow-500 text-black px-6 py-3 rounded-md font-semibold"
        >
          <Link to="/second-page">İkinci Sayfa</Link>
        </motion.button>
      </div>
    </div>
  );
}

export default Home;
