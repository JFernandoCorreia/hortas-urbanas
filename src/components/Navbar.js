import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const showNavbar = ['/login', '/mapa-hortas', '/inscricao', '/dicas', '/sobre'].includes(location.pathname);

  return (
    showNavbar &&
    <nav className="bg-recifeBlue text-recifeWhite p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-bold">HomePage</Link>
      </div>
    </nav>
  );
}

export default Navbar;
