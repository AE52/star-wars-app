import React from 'react';
import { PuffLoader } from 'react-spinners';

function Spinner() {
  return (
    <div className="flex items-center justify-center h-64">
      <PuffLoader color="#FBBF24" size={60} />
    </div>
  );
}

export default Spinner;
