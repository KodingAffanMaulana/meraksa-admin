import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-2xl text-gray-600 mb-8">Page Not Found</p>
      <Link
        to="/"
        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
